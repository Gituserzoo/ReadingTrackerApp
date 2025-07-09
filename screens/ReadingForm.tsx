import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function ReadingForm() {
  const [user, setUser] = useState('');
  const [book, setBook] = useState('');
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');

  const handleSubmit = async () => {
    if (!user || !book || !startPage || !endPage) {
      Alert.alert('Missing Field', 'Please fill in all fields.');
      return;
    }

    const start = parseInt(startPage);
    const end = parseInt(endPage);

    if (isNaN(start) || isNaN(end) || end < start) {
      Alert.alert('Invalid Page Numbers', 'Make sure page numbers are valid.');
      return;
    }

    const pagesRead = end - start;

    // Auto-fill current date as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase.from('reading_logs').insert([
      {
        user,
        book,
        start_page: start,
        end_page: end,
        pages_read: pagesRead,
        date: today,
      },
    ]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Reading log submitted!');
      setUser('');
      setBook('');
      setStartPage('');
      setEndPage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User</Text>
      <TextInput style={styles.input} value={user} onChangeText={setUser} />

      <Text style={styles.label}>Book Title</Text>
      <TextInput style={styles.input} value={book} onChangeText={setBook} />

      <Text style={styles.label}>Start Page</Text>
      <TextInput
        style={styles.input}
        value={startPage}
        onChangeText={setStartPage}
        keyboardType="numeric"
      />

      <Text style={styles.label}>End Page</Text>
      <TextInput
        style={styles.input}
        value={endPage}
        onChangeText={setEndPage}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginTop: 4,
    marginBottom: 10,
  },
});

 import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qzqxlgjnrgetzufseagz.supabase.co';  // ← Replace this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6cXhsZ2pucmdldHp1ZnNlYWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNzM4NDIsImV4cCI6MjA2NzY0OTg0Mn0.w-kw2EYuexAE3txkPWVr9LFunY6YeO8QkOtR5BYoKx4';                    // ← Replace this

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient } from "@supabase/supabase-js"
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = "https://cjpffrmyafbesnptyfdj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODE3ODU1OSwiZXhwIjoxOTUzNzU0NTU5fQ.POaMQPFZdcjRpLsmZFgwZ4-Iiw3i5hN9EtTG6yzu21I"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage,
  });




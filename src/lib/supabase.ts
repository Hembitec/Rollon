import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qtvjysthczfcixoocceu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dmp5c3RoY3pmY2l4b29jY2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyOTY4NDcsImV4cCI6MjA1Njg3Mjg0N30.t2FzFkoeOu3eRzleHBsRwfwAdb3qPVVSjbfarmbkhos";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

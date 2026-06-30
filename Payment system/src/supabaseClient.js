import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qesfpoiudmbydivhbraq.supabase.co/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlc2Zwb2l1ZG1ieWRpdmhicmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyODc1ODgsImV4cCI6MjA5Nzg2MzU4OH0.siYwF0Zu03EEo-B25Ar5a-SOcerbn5Qid-UZgXofAkg"

export const supabase = createClient(supabaseUrl, supabaseKey)
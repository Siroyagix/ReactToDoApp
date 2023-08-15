import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "ここにsupabaseのURL";
const supabaseKey = "ここにsupabaseのAPIKey";

export const supabase = createClient(supabaseUrl, supabaseKey);

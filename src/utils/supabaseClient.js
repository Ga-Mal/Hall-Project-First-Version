import {createClient} from "@supabase/supabase-js";

const supabaseURL = "https://fwzzposmdexvbsqycolu.supabase.co";
const supabaseKey = "sb_publishable_AHbB3OJ1CSM-i9JIz2cEfQ_pV7nkOjI";

export const supabase = createClient(supabaseURL , supabaseKey);

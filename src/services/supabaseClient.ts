import { isProd } from '@/shared/constants';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = isProd
	? process.env.NEXT_PUBLIC_SUPABASE_URL
	: process.env.NEXT_PUBLIC_SUPABASE_API_URL;

const supabaseAnonKey = isProd
	? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

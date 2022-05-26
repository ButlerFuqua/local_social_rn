import { apiHost, apiKey } from '../../secrets';
import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(apiHost, apiKey);

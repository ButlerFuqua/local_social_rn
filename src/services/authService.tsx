import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { apiHost, apiKey } from '../../secrets';
import { SignInResponse } from '../@types/responses';

export class AuthService {

    private readonly client: SupabaseClient;

    constructor() {
        this.client = createClient(apiHost,apiKey);
    }

    async signInUser(email: string, password: string): Promise<SignInResponse> {
        try {
            const { user, session, error } = await this.client.auth.signIn({
                email,
                password,
            });
            return { user, session, error }
        } catch (error: any) {
            console.error(error);
            return {
                user: null,
                session: null,
                error
            }
        }
    }
    
    async signUpUser(email: string, password: string): Promise<SignInResponse>{
        try {
            const { user, session, error } = await this.client.auth.signUp({
                email,
                password,
            });
            return { user, session, error }
        } catch (error: any) {
            console.error(error);
            return {
                user: null,
                session: null,
                error
            }
        }

    }


}
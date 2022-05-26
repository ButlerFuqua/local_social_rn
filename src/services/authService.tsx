import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { apiHost, apiKey } from '../../secrets';
import { SignInResponse } from '../@types/responses';

import { userService } from '.';

export class AuthService {

    private readonly client: SupabaseClient;

    constructor() {
        this.client = createClient(apiHost, apiKey);
    }

    async signInUser(email: string, password: string): Promise<SignInResponse> {
        try {
            const { user, session, error } = await this.client.auth.signIn({
                email,
                password,
            });
            if(session?.access_token){
                await userService.setAuth(session.access_token);
            }
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

    async signUpUser(email: string, password: string): Promise<SignInResponse> {
        try {

            // Create Auth user
            const { user, session, error } = await this.client.auth.signUp({
                email,
                password,
            });

            if (session?.access_token) {
                // Create profile for user
                userService.createProfile(session.access_token);
            }else{
                console.error(`No user was returned`);
            }
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

    async getUserDataFromToken(token: string): Promise<SignInResponse> {
        try {
            const { user, error } = await this.client.auth.api.getUser(token)
            return { user, error, session: null }
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
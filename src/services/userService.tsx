import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import { authService } from '.';
import { apiHost, apiKey } from '../../secrets';
import { SignInResponse } from '../@types/responses';

export class UserService {

    private readonly client: SupabaseClient;

    constructor() {
        this.client = createClient(apiHost, apiKey);
    }

    async getProfileData(userId: string): Promise<any> {
        try {
            let { data, error, status } = await this.client
                .from('profiles')
                .select()
                .eq('id', userId)
                .single()

            return { data, error, status }
        } catch (error) {
            return error
        }
    }

    async setAuth(token: string){
        this.client.auth.setAuth(token);
    }

    async createProfile(token: string): Promise<any> {

        const { user } = await authService.getUserDataFromToken(token);
        if(!user){
            throw new Error('No user found');
        }

        await this.setAuth(token);

        try {
            const { data, error } = await this.client
                .from('profiles')
                .insert([
                    {
                        id: user.id,
                        username: user.email,
                    }
                ])
            return { data, error }
        } catch (error) {
            return error
        }
    }

}
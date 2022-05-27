import { authService } from '.';

import { supabaseClient } from '../clients';
export class UserService {


    constructor() {

    }

    async getProfileData(userId: string): Promise<any> {
        try {
            let { data, error, status } = await supabaseClient
                .from('profiles')
                .select()
                .eq('id', userId)
                .single()

            return { data, error, status }
        } catch (error) {
            return error
        }
    }

    async createProfile(token: string): Promise<any> {

        const { user } = await authService.getUserDataFromToken(token);
        if(!user){
            throw new Error('No user found');
        }

        try {
            const { data, error } = await supabaseClient
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

    async getUsername(userId: string): Promise<any>{
        try {

            const { data, error } = await supabaseClient
                .from('profiles')
                .select('username')
                .eq('id', userId)
                .single()
            return { data, error }
        } catch (error) {
            return error
        }
    }

}
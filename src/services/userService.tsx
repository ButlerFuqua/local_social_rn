import { authService } from '.';
import { SearchOptions } from '../@types/util';

import { supabaseClient } from '../clients';

export type ProfileResponse = {
    username: string
}

export type AllProfilesResponse = {
    data: ProfileResponse[]
    error: any
}
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

    async getAllProfiles(options?: SearchOptions): Promise<AllProfilesResponse>{
        const limit = options?.limit || 10;
        const from = options?.from || 0;
        const to =  options?.to || 10;
        try {
            let { data, error } = await supabaseClient
                .from('profiles')
                .select()
                .range(from, to)
                .limit(limit)
            return { data: data || [], error }
        } catch (error) {
            return {
                data: [],
                error,
            }
        }
    }

}
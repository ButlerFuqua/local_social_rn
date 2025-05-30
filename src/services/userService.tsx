import { authService } from '.';
import { SearchOptions } from '../@types/util';

import { supabaseClient } from '../clients';

export type ProfileResponse = {
    username: string
    id: string
    disabled: boolean
}

export type AllProfilesResponse = {
    data: ProfileResponse[]
    error: any
}

export type ProfileDataResponse = {
    data?: ProfileResponse
    error: any
}

export type UpdateProfileRequest = {
    username?: string
    disabled?: boolean
}

export class UserService {

    constructor() {

    }

    async getProfileData(userId: string): Promise<ProfileDataResponse> {
        try {
            let { data, error } = await supabaseClient
                .from('profiles')
                .select()
                .eq('id', userId)
                .single()
            return { data, error }
        } catch (error) {
            return {
                error,
            }
        }
    }

    async createProfile(token: string): Promise<any> {

        const { user } = await authService.getUserDataFromToken(token);
        if (!user) {
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

    async getUsername(userId: string): Promise<any> {
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

    async getAllProfiles(options?: SearchOptions): Promise<AllProfilesResponse> {
        const limit = options?.limit || 10;
        const from = options?.from || 0;
        const to = options?.to || 10;
        try {
            let { data, error } = await supabaseClient
                .from('profiles')
                .select()
                .range(from, to)
                .order('username', { ascending: true })
                .eq('disabled', false)
                .limit(limit)
            return { data: data || [], error }
        } catch (error) {
            return {
                data: [],
                error,
            }
        }
    }

    async updateProfile(token: string, updateData: UpdateProfileRequest): Promise<any> {
        const { user } = await authService.getUserDataFromToken(token);
        if (!user) {
            throw new Error('No user found');
        }

        try {
            const { data, error } = await supabaseClient
                .from('profiles')
                .update([updateData])
                .match({ id: user.id });
            return { data, error }
        } catch (error) {
            return { data: null, error }
        }
    }

    // TODO add method to actually delete an account
    async disableProfile(token: string): Promise<any> {

        try {
            return this.updateProfile(token, {
                disabled: true
            });
        } catch (error) {
            return error
        }

    }

}
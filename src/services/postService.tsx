import {  User } from '@supabase/supabase-js'
import { authService } from '.';
import { SignInResponse } from '../@types/responses';

import { supabaseClient } from '../clients';

export class PostService {

    constructor() {
    }

    async createPost(token: string, body: string){

        const { user } = await authService.getUserDataFromToken(token);
        if(!user){
            throw new Error('No user found');
        }
        try {
            const { data, error } = await supabaseClient
                .from('posts')
                .insert([{
                    body,
                    user_id: user.id,
                }])
            return { data, error }
        } catch (error) {
            return error
        }
    }

}
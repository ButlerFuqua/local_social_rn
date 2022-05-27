import {  User } from '@supabase/supabase-js'
import { authService } from '.';
import { SignInResponse } from '../@types/responses';

import { supabaseClient } from '../clients';

export type PostResponse = {
    body: string
    user_id: string
    created_at: string
}

export type AllPostsResponse = {
    data: PostResponse[]
    error: any
}

export type CreatePostResponse = {
    data: any
    error: any
}

export type Range = {
    from: number
    to: number
}
export class PostService {

    constructor() {
    }

    async createPost(token: string, body: string): Promise<CreatePostResponse>{
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
            return {data: null, error}
        }
    }

    async getAllPosts(limit = 10, range?: Range): Promise<AllPostsResponse>{
        const from = range?.from || 0;
        const to =  range?.to || 10;
        try {
            let { data, error } = await supabaseClient
                .from('posts')
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
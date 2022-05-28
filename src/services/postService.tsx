import {  User } from '@supabase/supabase-js'
import { authService } from '.';
import { SignInResponse } from '../@types/responses';
import { SearchOptions } from '../@types/util';

import { supabaseClient } from '../clients';

export type PostResponse = {
    id: string | number
    body: string
    user_id: string
    created_at: string
    edited: boolean | null
}

export type SinglePostResponse = {
    data: PostResponse | null
    error: any
}

export type AllPostsResponse = {
    data: PostResponse[]
    error: any
}

export type CreatePostResponse = {
    data: any
    error: any
}

export type CommentCountResponse = {
    data: any
    error: any
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
    
    async getAllPosts(options?: SearchOptions): Promise<AllPostsResponse>{
        const limit = options?.limit || 10;
        const from = options?.from || 0;
        const to =  options?.to || 10;
        try {
            let { data, error } = await supabaseClient
            .from('posts')
            .select()
            .range(from, to)
            .order('created_at', { ascending: false })
            .limit(limit)
            return { data: data || [], error }
        } catch (error) {
            return {
                data: [],
                error,
            }
        }
    }
    
    async getPostById(id: string | number): Promise<SinglePostResponse>{
        try {
            let { data, error } = await supabaseClient
            .from('posts')
            .select()
            .eq('id',id)
            .single()
            return { data, error }
        } catch (error) {
            return {
                data: null,
                error,
            }
        }
    }
    
    async updatePost(token: string, postId: string | number, body: string): Promise<CreatePostResponse>{
        const { user } = await authService.getUserDataFromToken(token);
        if(!user){
            throw new Error('No user found');
        }
        try {
            const { data, error } = await supabaseClient
                .from('posts')
                .update([{
                    body,
                    edited: true,
                }])
                .match({ id: postId });
            return { data, error }
        } catch (error) {
            return {data: null, error}
        }
    }
    
    async deletePost(postId: string | number): Promise<any>{
        try {
            const { error } = await supabaseClient
            .from('posts')
            .delete()
            .match({ id: postId })
            return error
        } catch (error) {
            return error
        }

    }

    async getCommentCount(postId: string | number): Promise<CommentCountResponse>{
        try {
            const {data, error} = await supabaseClient
            .from('comments')
            .select('id', { count: 'exact' })
            .eq('post_id', postId)
            return {data, error};
        } catch (error) {
            return {
                data: null,
                error,
            };
        }
    }
}
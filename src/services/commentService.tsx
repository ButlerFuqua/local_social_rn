import { authService } from '.';

import { supabaseClient } from '../clients';

export type CreateCommentResponse = {
    data: any
    error: any
}

export type CommentResponse = {
    id: string
    body: string
    post_id: string
    user_id: string
    edited: boolean | null
    created_at: any
}

export type SingleCommentResponse = {
    data: CommentResponse | null
    error: any
}

export type AllCommentsResponse = {
    data: CommentResponse[]
    error: any
}

export class CommentService {

    constructor() {
    }

    async createComment(token: string, postId: string | number, body: string): Promise<CreateCommentResponse>{
        const { user } = await authService.getUserDataFromToken(token);
        if(!user){
            throw new Error('No user found');
        }
        try {
            const { data, error } = await supabaseClient
                .from('comments')
                .insert([{
                    body,
                    post_id: postId,
                    user_id: user.id,
                }])
            return { data, error }
        } catch (error) {
            return {data: null, error}
        }
    }

    async getCommentById(id: string | number): Promise<SingleCommentResponse>{
        try {
            let { data, error } = await supabaseClient
            .from('comments')
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
    
    async getCommentsByPostId(postId: string | number): Promise<AllCommentsResponse>{
        try {
            const { data, error } = await supabaseClient
            .from('comments')
            .select()
            .order('created_at', { ascending: true })
            .eq('post_id', postId)
            return { data: data || [], error }
        } catch (error) {
            return {
                data: [],
                error,
            }
        }
    }

    async updateComment(token: string, commentId: string, body: string): Promise<CreateCommentResponse>{
        const { user } = await authService.getUserDataFromToken(token);
        if(!user){
            throw new Error('No user found');
        }
        try {
            const { data, error } = await supabaseClient
                .from('comments')
                .update([{
                    body,
                    edited: true,
                }])
                .match({ id: commentId });
            return { data, error }
        } catch (error) {
            return {data: null, error}
        }
    }

    async deleteComment(commentId: string): Promise<any>{
        try {
            const { error } = await supabaseClient
            .from('comment')
            .delete()
            .match({ id: commentId })
            return error
        } catch (error) {
            return error
        }

    }
    
    
}
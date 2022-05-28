import { authService } from '.';

import { supabaseClient } from '../clients';

export type CreateCommentResponse = {
    data: any
    error: any
}

export type CommentResponse = {
    body: string
    post_id: string
    user_id: string
    edited: boolean | null
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
    
    async getCommentsByPostId(postId: string | number): Promise<AllCommentsResponse>{
        try {
            const { data, error } = await supabaseClient
            .from('comments')
            .select()
            .order('created_at', { ascending: false })
            .eq('post_id', postId)
            return { data: data || [], error }
        } catch (error) {
            return {
                data: [],
                error,
            }
        }
    }
    
    
}
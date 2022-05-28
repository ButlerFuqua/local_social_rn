import { authService } from '.';

import { supabaseClient } from '../clients';

export type CreateCommentResponse = {
    data: any
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
    
    // TODO create response type
    async getPostAndComments(postId: string | number): Promise<any>{
        try {
            let { data, error } = await supabaseClient
            .from('posts')
            .select(`
                body,
                user_id,
                created_at
                comments (
                    body,
                    author,
                    user_id,
                    created_at
                )
            `)
            .order('created_at', { ascending: false })
            .eq('post_id', postId)
            .single()
            return { data: data || [], error }
        } catch (error) {
            return {
                data: [],
                error,
            }
        }
    }
    
    
}
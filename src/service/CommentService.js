import HttpService from './HttpService';

class CommentService extends HttpService {

    addComment = async(comment, galleryId) => {
        try{
            const {data} = await this.client.post(`/galleries/${galleryId}/comments`, comment);
            return data;
        }catch(error){
            throw new Error("The Comment has not been created!");
        }
    }

    deleteComment = async(id) => {
        try{
            const {data} = await this.client.delete(`/comments/${id}`);
            return data;
        }catch(error){
            throw new Error("The Comment has not been deleted!");
        }
    }
}
export default new CommentService();
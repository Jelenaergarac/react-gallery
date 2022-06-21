import HttpService from './HttpService';

class GalleryService extends HttpService {

    getGalleries = async(number=1, title='')=> {
        let endpoint = `/galleries/?page=${number}`;
        if(title){
            endpoint+=`&title${title}`;
        }
        const {data} = await this.client.get(endpoint);
        return data;
    }
    getGallery = async(id) => {
        const {data} = await this.client.get(`/galleries/${id}`);
        return data;
    }
    createNewGallery = async(newGallery) => {
        try{
            const {data} = await this.client.post('/create-gallery', newGallery);
            return data;
        }catch(error){
            throw new Error('The Gallery has not been created!',error);
        }
    }
    deleteGallery = async(id) => {
     try {
         const {data} = await this.client.delete(`/galleries/${id}`);
         return data
     }catch(error){
         throw new Error("Something went wrong with deleting gallery");
     }
    }
    editGallery = async(id, gallery) => {
        try{
            const {data} = await this.client.put(`/galleries/${id}`, gallery);
            return data;
        }catch(error){
            throw new Error("Something went wrong with editing");
        }
    }
    getMyGalleries = async(id) => {
        const {data} = await this.client.get(`/my-galleries/${id}`);
        return data;
    }
}
export default new GalleryService();
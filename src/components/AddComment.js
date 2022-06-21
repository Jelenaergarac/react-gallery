import React, { useState } from 'react'
import { selectIsAuthenticated } from '../store/user'
import { useSelector } from 'react-redux/es/exports'
import GalleryService from '../service/GalleryService';
import CommentService from '../service/CommentService';

const AddComment = ({galleryId, addComment}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const[newComment, setNewComment] = useState({
        textarea:''
    });
    const addNewComment = async(e)=>{
        e.preventDefault();
        const data = await CommentService.addComment(newComment, galleryId);
        if(data){
            addComment(data);
        }
        setNewComment({textarea:''})
    }
  return (
    <section>
        {isAuthenticated && (
            <form className='add-container' onSubmit={addNewComment}>
<textarea
className='add-input'
type='text'
value={newComment.textarea}
onChange={({target})=> setNewComment({...newComment, textarea:target.value})}
placeholder="Insert Your Comment Here..."
/>
<button>Add Comment</button>
            </form>
        )}
    </section>
  )
}

export default AddComment
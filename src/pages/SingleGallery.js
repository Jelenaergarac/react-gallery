import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import GalleryService from '../service/GalleryService';
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import AddComment from '../components/AddComment';
import {useSelector} from 'react-redux'
import { selectGalleries } from '../store/gallery/selectors';
import { selectActiveUser } from '../store/user';
import CommentService from '../service/CommentService';
const SingleGallery = () => {
    const[gallery, setGallery] = useState([]);
    const activeUser = useSelector(selectActiveUser);
    const[galleriesList, setGalleries] = useState([])
    const galleries = useSelector(selectGalleries)
    const{id} = useParams();
    const navigate = useNavigate();
    const fetchSingleGallery = async() =>{
        const data = await GalleryService.getGallery(id);
        setGallery(data)
    }

    const addNewComment = async(comment)=>{
      setGallery({...gallery, comments:[...gallery.comments, comment]})
    }
    const deleteComment = async(id)=>{
      const response = prompt(
        "Are you sure yoy wanna delete this comment?"
      );
      if(response !== 'yes') return;
      await CommentService.deleteComment(id);
      setGallery({...gallery, comments:gallery.comments.filter((comment)=>comment.id !==id)})
    }
    const handleDelete = async(id)=>{
        const isDeleted = await GalleryService.deleteGallery(id);
        if(isDeleted){
         setGalleries(galleries.filter((gallery) => gallery.id !== id));
      navigate('/galleries');
    }
    }
    
   
    useEffect(()=>{
        if(id){
            fetchSingleGallery()
        }
    },[id])
  return (
        <div>
            {gallery && 
            <>
         <div className='carousel'>
            <Carousel>
                {gallery.images && gallery.images.length
          ? gallery.images.map((image, index) => (

  <Carousel.Item key={index}>
    <img
    className="d-inline-block size"
      src={image.image_url}
      alt="First slide"
    />
    <Carousel.Caption>
<>{gallery.user ? (<p><i>
                {gallery.user.firstName} {gallery.user.lastName}</i></p> ): 'Unknown'}</>
    </Carousel.Caption>
  </Carousel.Item>
   ))
          : ""}
</Carousel>
            </div>
             <div className='gallery-content'>
            <p className='gall-title'>{gallery.title}</p>
            
        <div key={gallery.id}>
           <p className='gallery-desc'> {gallery.description}</p> 
        </div>  
        {activeUser && gallery.user ?
        <p>{activeUser.id === gallery.user.id ? <> 
        <Link className='nav-edit' to={`/edit/${gallery.id}`}>Edit Gallery</Link> <button className='nav-delete' type='button' onClick={() => handleDelete(gallery.id)}>Delete</button></> : ''}</p> : ''}
        </div>
        
</>}
 
   <hr/>   
    <span className='comments'><strong>Comments:</strong> </span>
      {gallery.comments ? 
      <ul>
        {gallery.comments.map((comment) => (
          <li className='user' key={comment.id}>
          <span>User: {comment.user.firstname}</span>
          <p>{comment.textarea}</p>
        {activeUser && gallery.user ?
        <p>{(activeUser.id === comment.user.id || gallery.user.id === gallery.id ) ?  <button className='delete-com' onClick={() => deleteComment(comment.id)}>Delete Comment</button> : ''}</p> : ''}
        </li>
        ))}
      </ul> : <h3>No comments yet</h3>}
      <AddComment
            galleryId={id}
            addComment = {addNewComment}/> :''
      
            


           {!gallery && 
           <>
           <h2>Page Not Found</h2>
           <p>
               <Link to="/galleries">Visit Our Home Page</Link>
           </p>
           </>
           } 
        </div>
        
  )
}

export default SingleGallery
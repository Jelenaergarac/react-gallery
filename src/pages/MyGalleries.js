import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import GalleryService from '../service/GalleryService';
import { selectActiveUser } from '../store/user/selectors';
import '../pages/css/Style.css';
import { Link } from 'react-router-dom';

const MyGalleries = () => {
  const[myGalleries, setMyGalleries] = useState([]);
  const activeUser = useSelector(selectActiveUser);

const fetchMyGalleries = async()=>{
  if(!activeUser)return;
  const data = await GalleryService.getMyGalleries(activeUser.id)
  setMyGalleries(data.data)
}
  useEffect(()=>{
  fetchMyGalleries()
  },[activeUser])
  return (
           <article>
      <h3>Hi, {activeUser.firstName}, Your Galleries are Here!</h3>
      
<section className='galleries'>
  {myGalleries.length ? (
<>

  {myGalleries.map((gallery) => (
          <div className='gallery' key={gallery.id}>
            <div className='gallery-image'>
{gallery.images.length ? <img
                        alt='img'
                        style={{ width:'500px' }}
                        src={gallery.images.length ? gallery.images[0].image_url : ''}
                        />: 'No photos yet'}
                        </div>
                <div className='gallery-content'>
                  <div className='gallery-title'>{gallery.title}</div>
                  
                <div className='gallery-text'>
            {(gallery.description).length <=25 ? gallery.description : `${(gallery.description).slice(0,25)}...`}
            
                </div>
                <Link
                className='gallery-readmore'
                to={`/galleries/${gallery.id}`}> Read More</Link>
                  </div>
                
            </div>))}
            </>) : <h1>No Galleries Yet, create one <Link to="/create-galleries">Add Gallery</Link></h1>}
          </section>
    </article>
  )
}

export default MyGalleries
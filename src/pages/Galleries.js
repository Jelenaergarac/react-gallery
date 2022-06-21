import React, { useEffect, useState } from 'react'
import GalleryService from '../service/GalleryService'
import { Link } from 'react-router-dom';
import '../pages/css/Galleries.css'

const Galleries = () => {
  
  const[galleries, setGalleries] = useState([]);
const[totalPages, setTotalPages] = useState(1);
  const[page, setPage] = useState(1);
  const[loading, setLoading] = useState(false);
 

  const fetchGalleries = async()=>{
    setLoading(true);
    const data = await GalleryService.getGalleries(page);
    setGalleries(data.data)
    setTotalPages(data.last_page);
  }
 
  useEffect(()=>{
   
   fetchGalleries();
  },[])
  return (
            <article>
          {galleries.length ? ( 
          <section className='galleries'>
            {galleries.map((gallery, id) =>(
                  <div
                  key={gallery.id}
                  className='gallery'>
                <div className='gallery-image'>
{gallery.images.length ? <img
                        alt='img'
                        style={{ width:'500px' }}
                        src={gallery.images.length ? gallery.images[0].image_url : ''}
                        />: 'No photos yet'}
                        </div>
                <div 
                className='gallery-content'>
                <div className='gallery-title'>
               {gallery.title}
                </div>
                <Link to={`/author/${gallery.user.id}`}><small className='author'><i>Author: {gallery.user.firstName} {gallery.user.lastName}</i></small></Link>
                
                <div className='gallery-text'>
            {(gallery.description).length <=25 ? gallery.description : `${(gallery.description).slice(0,25)}...`}
            
                </div>
                <Link
                className='gallery-readmore'
                to={`/galleries/${gallery.id}`}> Read More</Link>
                </div>
            </div> ))}
<div> {totalPages !== page && <button  className='button' onClick={() => setPage(page + 1)}>{loading ? 'Loading...': 'Load More'}</button>}</div>
   
  </section>) : <h2>No Galleries, be first to create one!</h2>}


    </article>   
  )
}

export default Galleries
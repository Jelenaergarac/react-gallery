import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GalleryService from '../service/GalleryService';
import { selectActiveUser, selectIsAuthenticated } from '../store/user';
import { useSelector } from 'react-redux/es/exports';

const AuthorPage = () => {
    const[authors, setAuthors] = useState([])
    const {id} = useParams();
    const activeUser = useSelector(selectIsAuthenticated)

    const fetchAuthor=async()=>{
        const data = await GalleryService.getMyGalleries(id);
        setAuthors(data.data)
        console.log(data)
    }
    useEffect(()=>{
    fetchAuthor()
    },[id])
  return (
        <article>

<section className='galleries'>
  {authors.length ? (
<>
  {authors.map((gallery) => (
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
            </>) : "no galleries"}
          </section>
    </article>
  )
}

export default AuthorPage
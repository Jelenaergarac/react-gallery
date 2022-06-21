import React, { useEffect, useState } from 'react'
import { selectActiveUser } from '../store/user';
import { useSelector } from 'react-redux/es/exports';
import GalleryService from '../service/GalleryService';
import { useNavigate, useParams } from 'react-router-dom';


const EditGallery = () => {
    const{id} = useParams();
    const navigate = useNavigate();
    const[edGallery, setEditGallery] = useState({
        title:'',
        description:'',
        image_url:''
    });
    const[imageList, setImageList] = useState([{}]);
    const activeUser = useSelector(selectActiveUser);
    const fetchGallery = async() =>{
        const{id:_, ...restData} = await GalleryService.getGallery(id);
        setEditGallery(restData)

    }

    useEffect(()=>{
        if(id){
            fetchGallery()
        }
    },[id])
  
    const handleSubmit = async(e)=>{
        e.preventDefault();
    if(!activeUser) return;
    edGallery.images = imageList.map((image)=> image.image_url);
     await GalleryService.editGallery(id, edGallery);
     navigate('/galleries')
    }
    const handleInput = (e, index)=>{
        const {name, value}=e.target
        const list = [...imageList];
        list[index][name] = value;
        setImageList(list)
    }
    const handleCancel = ()=>{
        navigate('/galleries')
    }
    const removeOnClick = (index)=>{
        const list =[...imageList];
        list.splice(index, 1);
        setImageList([list])
    }
    const addOnClick = () =>{
    setImageList([...imageList, {image_url:''}])
    }
    return (
    <article>
        <div className='imgBox'>
        <img
        src={require("../images/img7.jpg")}
        alt='defaultimage'
          style={{ height:"500px",
    width: "50%", width:"500px"}}
         />
        </div>
        <div className='content-box'>
            <div className='form-box'>
                <h2>Add New Gallery</h2>
    <form onSubmit={handleSubmit}>
<div className='input-box'>
<span>Title:</span>
    <input
    className='form-control'
    required
    minLength={2}
    value={edGallery.title}
    id="title"
    onChange={({target})=> setEditGallery({...edGallery, title: target.value})}
    /> 
    </div>
    <div className='input-box'>
<span>Description:</span>
    <input
    className='form-control'
    required
    minLength={2}
    value={edGallery.description}
    id="description"
    onChange={({target})=> setEditGallery({...edGallery, description: target.value})}
    /> 
    </div>
    {imageList.map((image, index)=>(
        <div key={index} className="input-box">
       <span>Insert Images: </span>
       <input
       required
       className='form-control'
       type='url'
       id='image_url'
       name="image_url"
       value={image.image_url}
       onChange={e => handleInput(e, index)}
       />
       <div>
        {imageList.length !== 1 && <button className='btn btn-success' onClick={()=>removeOnClick(index)}>Remove</button>}
        {imageList.length-1 === index && <button className='add-gall' onClick={addOnClick}>Add</button>}
       </div>
        </div>))}
        <button className='btn btn-success'>Add Gallery</button>
        <button className='btn btn-success' onClick={handleCancel}>Cancel</button>
</form>
            </div>
        </div>
    </article>
  )
    }

export default EditGallery
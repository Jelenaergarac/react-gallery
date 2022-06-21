import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import GalleryService from '../service/GalleryService'

const CreateGallery = () => {
    const navigate = useNavigate();
    const{id} = useParams();

    const [newGallery, setNewGallery] = useState({
        title:'',
        description:'',
        image_url:''
    });
    const[imageList, setImageList] = useState([{}]);
const handleSubmit = async(e)=>{
    e.preventDefault();
    newGallery.images = imageList.map((image)=>image.image_url);
    await GalleryService.createNewGallery(newGallery);
    navigate('/galleries')

}
const handleInput = (e, index)=>{
    const{name, value} = e.target;
    const list = [...imageList];
    list[index][name] = value;
    setImageList(list)
}
const addOnClick = () =>{
    setImageList([...imageList, {image_url:''}])
}
const removeOnClick = (index) =>{
    const list = [...imageList];
    list.splice(index, 1);
    setImageList(list);
}
const handleCancel = () =>{
    navigate('/galleries')
}

  return (
    <section>
        <div className='imgBox'>
        <img
        src={require("../images/img7.jpg")}
        alt='defaultimage'
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
    value={newGallery.title}
    id="title"
    onChange={({target})=> setNewGallery({...newGallery, title: target.value})}
    /> 
    </div>
    <div className='input-box'>
<span>Description:</span>
    <input
    className='form-control'
    required
    minLength={2}
    value={newGallery.description}
    id="description"
    onChange={({target})=> setNewGallery({...newGallery, description: target.value})}
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
    </section>
  )
}

export default CreateGallery
import React from 'react'
import { useState } from 'react'

export default function NewPost() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState({
    title: 'null',
    description: 'null',
    price: '0',
    address: 'null',
    email: 'null',
    pincode: 'null',
    isvalid: 'false'
  });
  
  const [error, setErrors] = useState({});
  
  const [preview, setPreview] = useState(false);

  const uploadfile = async () => {
    // console.log('clicked');
    // console.log(content);
    if(Object.values(error).length>0) {alert('Fill form correctly'); return;}

    if(!preview) {
      alert('image required');
      return;
    }//image 

    const form_data = new FormData();
    form_data.append('image', file);  // Ensure `file` is defined
    form_data.append('json', JSON.stringify(content));

    try {
      const response = await fetch('http://localhost:5000/image', {
        method: 'POST',
        body: form_data,
      });

      if (!response.ok) {
        console.log('Image upload failed');
      }

      const result = await response.json();
      console.log('Image uploaded:', result);
      alert('Ad Posted successfully');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const errorHandle = (e) =>{
    const {name, value} = e.target;

    const patnum = /^[789]\d{9}$/;
    const patprice = /^\d+$/;
    const patemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    switch(name){
      case 'Phone Number':
        if(patnum.test(value)===false) {
          // console.log(value);
          setErrors({...error, 'patnum': value});
        }
        else{
          delete error.patnum;
        }
        break;
      case 'Price':
        if(patprice.test(value)===false) {
          // console.log(value);
          setErrors({...error, 'patprice': value});
        }
        else{
          delete error.patprice;
        }
        break;
      case 'Email':
        if(patemail.test(value)===false) {
          // console.log(value);
          setErrors({...error, 'patemail': value});
        }
        else{
          delete error.patemail;
        }
        break;
    }

  }

  const handleChange = (e) => {
    const  {name, value} = e.target;
    
    setContent((prev)=>({...prev, [name]:value}));
    errorHandle(e);
  };
  

  return (
    <div className="mx-auto" margin= "50%">

      <div style={{ height: "50px", width: "250px", margin: "10px", padding: "10px" }}>
        {preview && <img id='newpostimage' src={preview} style={{maxWidth: '200px', maxHeight: '500'}}/>}
        <input type="file" id='newpostimageinput' onChange={(e) => { setFile(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }} />
        <div className="card-body">
          <input type="text" className="card-title" placeholder='Title' name='Title' onChange={(e)=>{handleChange(e)}}/>
          <input type="text" className="card-title" placeholder='Description' name='Description' onChange={(e)=>{handleChange(e)}}/>
          
          <input type="text" className="card-title" placeholder='Price' name='Price' onChange={(e)=>{handleChange(e)}}/>
          {error.patprice && <p style={{color:'red'}}>Price invalid format</p>}

          <input type="text" className="card-title" placeholder='Address' name='Address' onChange={(e)=>{handleChange(e)}}/>
          
          <input type="text" className="card-title" placeholder='Email' name='Email' onChange={(e)=>{handleChange(e)}}/>
          {error.patemail && <p style={{color:'red'}}>Email invalid format</p>}
          
          <input type="text" className="card-title" placeholder='Phone Number' name='PhoneNumber' onChange={(e)=>{handleChange(e)}}/>
          {error.patnum && <p style={{color:'red'}}>Phone number invalid format</p>}
        
        </div>
        <button id='newpostimagesubmit' onClick={() => { uploadfile() }} style={{ margin: '10px', paddingLeft: '50px', paddingRight: '50px' }}>Upload</button>
      </div>

    </div>
  )
}
import React, { useEffect, useState } from 'react'
import Ads from './AdsCard';
import Navbar from './Navbar';

function Discovery() {
    const [contentlist, setContentlist] = useState({
        imagePath: 'null',
        Title: 'nahi hai',
        Description: 'nahi hai',
        Price: '0',
        Address: 'nahi hai',
        PhoneNumber: 'nahi hai'
    });

    
    const endpage = async () =>{
        const response = await fetch('http://localhost:5000/data'); //sending fetch request
        const data = await response.json(); //parsing json response
        setContentlist(data);
    }
    
    useEffect(()=>{
        endpage();
    }, []);

    return (
    <div style={{display: 'flex', flexWrap:'wrap'}}>   
        {contentlist.length>0    ? (
            contentlist.map((content, index)=>{
                console.log(content?.title);
                return <div style={{margin:'25px', padding: '15px', borderStyle: 'solid', minHeight:'300px', overflow:'scroll'}}>

                <Ads
                    key={index} // Unique key for each Ads component
                    title={content?.Title || "No Title Available"} 
                    description={content?.Description || "No Description Available"} 
                    price={content?.Price || "Price Not Specified"} 
                    address={content?.Address || "Address Not Provided"} 
                    phonenum={content?.PhoneNumber || "Pincode Not Available"} 
                    imglink={content?.imagePath || "Pincode Not Available"} 
                    email={content?.Email || "Email Not available"} 
                />

                    </div>
            })):(
                <p style={{margin:'250px', fontSize: '30px'}}>No more posts, please post an Ad to view...</p>
            )
            
        }
    </div>
  )
}

export default Discovery
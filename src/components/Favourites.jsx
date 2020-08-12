import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Favourites() {

    const[listImage, setListImage] = useState([]);
    useEffect(()=>{
        var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }        
        setListImage(values)
    },[])

    function unLike(id) {               
        localStorage.removeItem(localStorage.key(id));                    
        listImage.splice(id,1)
        alert('Bạn muốn bỏ like?')
    }

    return (
      <div>
        <p style={{marginLeft:'20px'}}>Click tim để unlike</p>
        <div className="grid-container" >
                {listImage.map((item, id)=>{
                    let img = item.replace('giphy.gif','480w_s.jpg');
                    return (
                        <div className="grid-item" key={id} id={"grid " + id}>
                            <img className={"img " + id} src={img} alt="" width="350px" height="300px"/>
                            <img className="heart" onClick={(e) => {
                                unLike(id)
                            }}></img>
                        </div>
                    );
                })}
            </div>
      </div>              
    );
}

export default Favourites;
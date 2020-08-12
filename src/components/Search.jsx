import React, {useState,useEffect} from "react";
import axios from "axios";
import LazyBackground from "./LazyLoad";

function Search() {
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    let imgItem = document.getElementsByClassName("img");
    for (let i=0; i<imgItem.length; i++){
        imgItem[i].addEventListener("mouseover", mouseOver);
        imgItem[i].addEventListener("mouseout", mouseOut);
    }
    function mouseOver(event) {
        let srcImg = document.getElementsByClassName("img")[event.path[0].classList[1]].src;
        let newGif = srcImg.replace('480w_s.jpg', 'giphy.gif');
        document.getElementsByClassName("img")[event.path[0].classList[1]].src = newGif;
    }
    function mouseOut(event) {
        let srcImg = document.getElementsByClassName("img")[event.path[0].classList[1]].src;
        let newGif = srcImg.replace('giphy.gif', '480w_s.jpg');
        document.getElementsByClassName("img")[event.path[0].classList[1]].src = newGif;
    }


    function handleInputChange(event) {
        setValue(event.target.value)
    }

    function handleInputKeyPress(e) {
        if (e.key === 'Enter' && value.length > 0) {
            let url = "http://api.giphy.com/v1/gifs/search?api_key=mzjgbqngJSoQEocxV5lHlTbv1XgUUpb4&q="+value+"&limit=8&offset="+offSet
            axios.get(`${url}`)
                .then(res => {
                    let data = res.data.data;
                    setData(data);
                    setIsLoaded(true);
                    setOffSet(offSet+8);
                })
                .catch(error => {
                    setIsLoaded(true);
                });
        }else if (e.key === 'Enter' && value.length == 0){
            alert('Vui lòng nhập từ khóa tìm kiếm')
        }
    }
    
    function likeImg(id) {       
        let srcImg = document.getElementsByClassName("img")[id].src;
        localStorage.setItem('id-'+value+'-'+id, srcImg);
        
        let gridItem = "grid " + id;
        let body = document.getElementById(gridItem);
        let heart = document.createElement('span');
        heart.className = 'fly-heart';
        heart.style.top = '10px';
        body.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 4000);
        
        alert('Like ảnh thành công');
    }

    function loadMore() { 
       let url = "http://api.giphy.com/v1/gifs/search?api_key=mzjgbqngJSoQEocxV5lHlTbv1XgUUpb4&q="+value+"&limit=8&offset="+offSet
            axios.get(`${url}`)
                .then(res => {
                    let response = res.data.data;
                    setOffSet(offSet+8)
                    setData(data.concat(response));
                    setIsLoaded(true);
                })
                .catch(error => {
                    setIsLoaded(true);
                });        
    }
    return (
        <div>
            <div style={{width:'100%', textAlign:'center'}}>
                <p>Start searching for images</p>
                <input placeholder="Find text..." className=""
                    id="search_query" type="text" name="q" autoComplete="off"
                    autoFocus
                    value={value}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleInputKeyPress(e)}/>
            </div>
            {isLoaded ?
                <div className="grid-container" >
                    {data.map((item, id)=>{
                        let img = item.images.original.url.replace('giphy.gif','480w_s.jpg');
                        return (
                            <div className="grid-item" key={id} id={"grid " + id} onClick={(e) => {
                                likeImg(id)
                            }}>
                                <LazyBackground className={"img " + id} src={img} placeholder='https://i.pinimg.com/236x/a8/7c/d8/a87cd819fd24432743b114719ba0fa52.jpg' />    
                            </div>
                        );
                    })}
                </div>
                :
                ''
            }
            {data.length > 0 ? <div style={{width:'100%', textAlign:'center'}}>
                <button className="button" onClick={loadMore}>Load More</button>
            </div> : '' }                         
        </div>
    );
}
export default Search;
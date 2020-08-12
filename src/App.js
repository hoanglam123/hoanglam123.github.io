import React, {useState, useEffect} from 'react';
import './App.css';
import Search from "./components/Search";
import Favourites from "./components/Favourites";

function App() {
    const [selected, setSelected] = useState(true);
    const [numImageFavourites, setNumImageFavourites] = useState(0);

    setInterval(() => {
        var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        } 
        setNumImageFavourites(values.length)       
    }, 1000);
    

    function changeSelected(check) {
        if(check == 1){
            setSelected(false)
        }else{
            setSelected(true);
        }        
    }
    const styleSearch = {
        marginRight:'40px',
        color: selected ? 'blue' : '',
        borderBottom: selected ? '1px solid' : ''
    }
    const styleFavourites = {
        color: !selected ? 'blue' : '',
        borderBottom: !selected ? '1px solid' : ''
    }
    return (
    <div className="App">
        <div className="header">
             <div style={{padding:'20px'}}>
                <span onClick={(e) => {changeSelected(0)}} style={styleSearch}>Search</span>
                <span onClick={(e) => {changeSelected(1)}} style={styleFavourites}>Favourites({numImageFavourites})</span>  
             </div>      
        </div>
        {selected ? <Search></Search> : <Favourites/>}
    </div>
  );
}

export default App;

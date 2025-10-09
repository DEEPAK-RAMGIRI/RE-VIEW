import React,{useState,useEffect} from "react";
import * as api from '../api/api';
import Model from './Model';

export default function Gallery() {

    const [data,setData] =  useState([]);
    const [selimage,setImage] = useState(null);
    const [currIndex, setCurrIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
     const [filteredData, setFilteredData] = useState([]);

    useEffect(()=> { const fetchData =  async () => {
      try{
        const getResponse = await api.getData();
      setData(getResponse.data);
      }catch(err){
        console.error(err.message);
      }
    };  fetchData()},[]);

     useEffect(() => {
       const results = data.filter(shot => {
        const titleMatch = shot.title.toLowerCase().includes(searchTerm.toLowerCase());
        const descriptionMatch = shot.description.toLowerCase().includes(searchTerm.toLowerCase());
        const ratingMatch = String(shot.rating) === searchTerm.trim();
        const categoryMatch = shot.category.toLowerCase().includes(searchTerm.toLowerCase());

        return titleMatch|| ratingMatch || descriptionMatch || categoryMatch ;
    });
        setFilteredData(results);
    }, [searchTerm, data]);

    const handleSelect = (data ,  index) => {
      setImage(data);
      setCurrIndex(index);
    };  

    const close = () => {
      setImage(null);
    };

    const showNext = (e) => {
      e.stopPropagation();
      const nextIndex = (currIndex + 1)% data.length;
      setImage(filteredData[nextIndex]);
      setCurrIndex(nextIndex);
    };

    const showPrev = (e) => {
      e.stopPropagation();
      const prevIndex = (currIndex - 1 + data.length)% data.length;
      setImage(filteredData[prevIndex]);
      setCurrIndex(prevIndex);
    };

    return (
     <div>
       <div className="search-container">
                <input
                    type="search"
                    placeholder="Search by title or description..."
                    className="search-input"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <p className="search-count">
                    {filteredData.length} of {data.length} screenshots found.
                </p>
        </div>
      <div className="gallery-grid">
               {filteredData.map((shot, index) => (
                    <div key={shot._id} className={`gallery-item ${searchTerm ? 'highlight' : ''}`} onClick={() => handleSelect(shot, index)}>
                        <img src={shot.imageURL} alt={shot.title} />
                        <p>⭐{shot.rating} {shot.title}</p>
                    </div>
                ))}
            </div>

      {selimage && (
        <Model 
          selimage={selimage}
          closeModel={close}
          showNext={showNext}
          showPrev ={showPrev}
        />
      )}
    </div>
  )
}

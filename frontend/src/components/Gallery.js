import React,{useState,useEffect} from "react";
import * as api from '../api/api';
import Model from './Model';

export default function Gallery() {

    const [data,setData] =  useState([]);
    const [selimage,setImage] = useState(null);
    const [currIndex, setCurrIndex] = useState(null);

    useEffect(()=> { const fetchData =  async () => {
      const getResponse = await api.getData();
      setData(getResponse.data);
    };  fetchData()},[]);

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
      setImage(data[nextIndex]);
      setCurrIndex(nextIndex);
    };

    const showPrev = (e) => {
      e.stopPropagation();
      const prevIndex = (currIndex - 1 + data.length)% data.length;
      setImage(data[prevIndex]);
      setCurrIndex(prevIndex);
    };

    return (
     <div>
      <div className="gallery-grid">
        {data.map((shot, index) => (
          <div key={shot._id} className="gallery-item" onClick={() => handleSelect(shot, index)}>
            <img src={shot.imageURL} alt={shot.title} />
            <p >⭐{shot.rating}, {shot.title}</p>
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

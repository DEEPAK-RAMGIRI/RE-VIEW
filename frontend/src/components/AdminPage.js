import React,{useEffect,useState} from 'react'
import {getData, postData, deleteData} from '../api/api';  

export default function AdminPage() {
    const [forms,setForm] = useState({title:'', description :'',rating:8,imageURL:'',category:'Anime'});
    const [key,setKey] = useState('');
    const [mess,setMess] = useState('');
    const [data,setData] = useState([]);

    useEffect(()=> {
        const fetchData = async () =>{
            try{
            const inputs = await getData();
            setData(inputs.data);
            }catch(err){
                console.error(err.message);
            }
        };fetchData()
    },[]);

    const onChange = e => setForm({ ...forms, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMess('submitting...');
        try{
            const response = await postData(forms,key);
            setData([response.data, ...data]);
            setForm({title:'', description :'',rating:8,imageURL:'',category:'Anime'});
            console.log(response.data);
        }catch(err){
            setMess(err.response?.data?.message);
        }
    }

    const handleDelete = async (id) => {
        if(!key) return alert('enter Password');
        if(!window.confirm('Are you Sure')) return 
        try{
            await deleteData(id,key);
            setData(data.filter(s=>s._id !== id));
            alert('Deleted Boss😊👍');
        }catch(err){
            alert(err.response?.data?.message);
        }
    };
  return (
    <div className="admin-page-container">
      <div className="admin-form">
        <h2> New Collection 🥳</h2>      <form onSubmit = {onSubmit}>
            <input type="text" placeholder="Title" name="title" value={forms.title} onChange={onChange} required />
            <input type="text" placeholder="https://raw.githubusercontent.com/DEEPAK-RAMGIRI/RE-VIEW/main/frontend/src/images/FILENAME.png
" name="imageURL" value={forms.imageURL} onChange={onChange} required />
            <textarea placeholder="Description" name="description" value={forms.description} onChange={onChange}></textarea>
            <input type="number" placeholder="Rating (1-10)" name="rating" value={forms.rating} min="1" max="10" onChange={onChange} required />
            <select name="category" value={forms.category} onChange={onChange}>
              <option value="Anime">Anime</option>
              <option value="Movie">Movie</option>
              <option value="Series">Series</option>
              <option value="Manga">Manga</option>
              <option value="Manhwa">Manhwa</option>
              <option value="Dialogue">Dialogue</option>
            </select>
            <input type="password" placeholder="Your Secret Admin Key" value={key} onChange={e => setKey(e.target.value)} required />
            <button type="submit">Add to Collections</button>
            https://raw.githubusercontent.com/DEEPAK-RAMGIRI/RE-VIEW/main/frontend/src/images/
        </form>
        {mess && <p className="form-message">{mess}</p>}
      </div>
      <div className="manage-screenshots">
        <h2>Manage Existing</h2>
        <div className="screenshots-list">
          {data.map(shot => (
            <div key={shot._id} className="screenshot-item">
              <img src={shot.imageURL} alt={shot.title} width="100" />
              <span>{shot.title}</span>
              <button onClick={() => handleDelete(shot._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

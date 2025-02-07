import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({title:"", description:"", tag:""});

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title:"", description:"", tag:""})
  }

  const onChange = (e)=>{
    setnote({...note, [e.target.name]:e.target.value});
  }
  return (
    <div>
        <div className='container'>
        <h2 className='container my-4'>Add your Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} minLength={5} required onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} required onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

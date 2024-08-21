import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Noteitem(props) {
    const { note, editNotes } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
            <div className='col-md-3 my-3'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <div className='d-flex align-items-center'>
                            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{editNotes(note)}}></i>
                        </div>
                    </div>
                </div>
            </div>
    )
}

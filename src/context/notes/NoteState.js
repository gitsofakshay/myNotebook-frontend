import NoteContext from "./noteContext";
import { useState, useContext } from "react";
import alertContext from './alertContext';

const NoteState = (props) => {
    const context = useContext(alertContext);
    const { showAlert } = context;

    const API_URL = process.env.REACT_APP_API_URL;
    const initialNotes = [];

    //state that contains all notes
    const [notes, setNotes] = useState(initialNotes)
    const [loading, setLoading] = useState(false);

    //Get all notes
    const getNote = async () => {
        //API CALL
        setLoading(true);
        const response = await fetch(`${API_URL}/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setLoading(false);
        setNotes(json);            
    }

    //Add a Notes
    const addNote = async (title, description, tag) => {
        // API CALL
        setLoading(true);
        const response = await fetch(`${API_URL}/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: title,
                description: description,
                tag: tag,
            }),
        });

        const note = await response.json();
        setLoading(false);
        if (note.success) {
            setNotes(notes.concat(note.savedNote));
            showAlert('Note is added successfully', 'success');
        } else {
            showAlert(note.error, 'danger');
        }
    };

    //Delete a Notes
    const deleteNote = async (id) => {
        //API CALL
        setLoading(true);
        const response = await fetch(`${API_URL}/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        if (json.success) {
            const newNotes = notes.filter((note) => { return note._id !== id });
            setLoading(false);
            setNotes(newNotes);
            showAlert('Note is deleted successfully', 'success');
        } else {
            showAlert(json.error, 'danger');
        }
    }
    //Update a Notes
    const updateNote = async (id, title, description, tag) => {
        //API CALL
        setLoading(true);
        const response = await fetch(`${API_URL}/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        if (json.success) {
            const newNotes = JSON.parse(JSON.stringify(notes));
            //Edit functionality of a note
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }
            setLoading(false);
            setNotes(newNotes);
            showAlert('Note is updated successfully', 'success');
        } else {
            showAlert(json.error, 'danger');
        }
    }

    return (
        <NoteContext.Provider value={{ notes, loading, setLoading, addNote, deleteNote, updateNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
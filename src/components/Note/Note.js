import React, { useEffect, useState } from 'react';
import "./Note.css"




export const Note = ({ initialTitle, initialContent ,initialId , updateNotes , initialPinned = false }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [id ,setId] =useState(initialId)
  const [pinned,setpinned] = useState(initialPinned)


  const saveNoteToBackend = async () => {
    try {
        await fetch(`/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                title: title, 
                content: content, 
                date: new Date()
            })
            
        });
        console.log('Saved successfully to backend');
    } catch (error) {
        console.error('Error saving note to backend:', error);
    }
}

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    saveNoteToBackend()
    updateNotes(initialId,event.target.value,initialContent)
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
    saveNoteToBackend()
    updateNotes(initialId,initialTitle , event.target.value)
  };

  useEffect(()=>{
    setTitle(initialTitle)
    setContent(initialContent)

  },[initialTitle,initialContent])

  return (
    <div>
    <form className='Form'>
      <input className='Note-editable Note-title'  
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter title"
      />
      <textarea className='Note-editable Note-content'
        value={content}
        onChange={handleContentChange}
        placeholder="Enter content"
      ></textarea>
    </form>
    </div>
  );
};

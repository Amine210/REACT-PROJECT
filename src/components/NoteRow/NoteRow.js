import React, { useEffect } from 'react'; // Import React if not already imported
import { MdPushPin } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { ImCheckboxChecked } from "react-icons/im";
import { TiInputChecked } from "react-icons/ti";
import "./NoteRow.css"

export const NoteRow = ({ note, selectedNoteId, setSelectedNoteId, pinNote, deleteNote ,  markDone}) => {
  return (
    <div className="noteWrapper">
      {note.pinned === false ? (
        <MdPushPin onClick={() => pinNote(note.id)} className="pinIcon" />
      ) : (
        <MdPushPin id="pinned" onClick={() => pinNote(note.id)} className="pinIcon" />
      )}
      <button
        className={`Note-button ${selectedNoteId === note.id ? "Note-button-selected" : ""}`}
        key={note.id}
        onClick={() => {
          setSelectedNoteId(note.id);
        }}
      >
        {note.title}
      </button>

      <TiDelete
        onClick={() => {
          if (window.confirm("Do you want to delete it?")) {
            deleteNote(note.id);
          }
        }}
        className="deleteIcon"
      />
      {
        note.done ?  <TiInputChecked  onClick={()=>markDone(note.id)} style={{color : " var(--primary)"}} className='ImCheckboxChecked'/> :  <TiInputChecked  onClick={()=>markDone(note.id)}   className='ImCheckboxChecked'/>
      }
     
    </div>
  );
};


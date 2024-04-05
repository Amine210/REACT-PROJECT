import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Button } from "./components/Button/Button";
import { Note } from "./components/Note/Note";
import  {NoteRow}  from "./components/NoteRow/NoteRow";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const myRef = useRef(null);

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const data = await response.json();
    setNotes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nouvelle note",
        content: "",
        lastUpdatedAt: new Date(),
        pinned: false,
        done : false ,
      }),
    });
    const newNote = await response.json();
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };


  const markDone = async (id) => {
    let tmpNotes = [...notes];
    const index = tmpNotes.findIndex((node) => node.id === id);
    if (index !== -1) {
      tmpNotes[index].done = !tmpNotes[index].done;
    }
    setNotes(tmpNotes);
    await fetch(`/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: tmpNotes[index].pinned,
      }),
    });
  }

  const pinNote = async (id) => {
    let tmpNotes = [...notes];
    const index = tmpNotes.findIndex((node) => node.id === id);
    if (index !== -1) {
      tmpNotes[index].pinned = !tmpNotes[index].pinned;
    }
    setNotes(tmpNotes);
    await fetch(`/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pinned: tmpNotes[index].pinned,
      }),
    });
  };

  const deleteNote = async (id) => {
    await fetch(`/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((n) => n.id !== id));
  };

  const updateNotes = (id, title, content) => {
    let tmpNotes = [...notes];
    const index = tmpNotes.findIndex((node) => node.id === id);
    if (index !== -1) {
      tmpNotes[index].title = title;
      tmpNotes[index].content = content;
    }
    setNotes(tmpNotes);
  };

  function orderByPinned(notes) {
    const pinnedNotes = notes.filter((note) => note.pinned === true);
    const unpinnedNotes = notes.filter((note) => note.pinned !== true);
    return [...pinnedNotes, ...unpinnedNotes];
  }

  const sortedNotes = notes ? orderByPinned(notes) : [];

  const selectedNote = notes && notes.find((note) => note.id == selectedNoteId);

  return (
    <>
      <aside className="Side">
        <div className="header"> 
        <GiHamburgerMenu className="GiHamburgerMenu"/>
        <h3>All Notes</h3>
        <MdOutlineArrowBackIosNew className="MdOutlineArrowBackIosNew" />
        </div>
        <div className="Create-note-wrapper">
          <Button onClick={createNote}>+ Create new note</Button>
       

<div class="form__group field">
  <input type="input" class="form__field" placeholder="Filter" name="Filter" id='name' required  onChange={(e) => {
              setSearchQuery(e.target.value.toLocaleLowerCase());
            }} />
  <label for="name" class="form__label">Filter</label>
</div>

        </div>
        {isLoading ? ("Chargement…") : !searchQuery ? (
          sortedNotes?.map((note) => (
            
            <NoteRow key={note.id}
            note={{ id: note.id, title: note.title, pinned: note.pinned , done : note.done }} // Replace with your actual note object
            selectedNoteId={selectedNoteId} // Pass your selectedNoteId value
            setSelectedNoteId={setSelectedNoteId} // Pass your setSelectedNoteId function
            pinNote={pinNote} // Pass your pinNote function
            deleteNote={deleteNote} // Pass your deleteNote function
            markDone = {markDone}

          />          
          ))
        ) : (
          sortedNotes?.map((note) =>
            note.title.toLocaleLowerCase().includes(searchQuery) ||
            note.content.toLocaleLowerCase().includes(searchQuery) ? (
              <NoteRow key={note.id}
            note={{ id: note.id, title: note.title, pinned: note.pinned }} // Replace with your actual note object
            selectedNoteId={selectedNoteId} // Pass your selectedNoteId value
            setSelectedNoteId={setSelectedNoteId} // Pass your setSelectedNoteId function
            pinNote={pinNote} // Pass your pinNote function
            deleteNote={deleteNote} // Pass your deleteNote function
            markDone = {markDone}
          /> 
            ) : (
              ""
            )
          )
        )}
      </aside>
      <main className="Main">
        {selectedNote ? (
          <Note
            updateNotes={updateNotes}
            initialTitle={selectedNote.title}
            initialContent={selectedNote.content}
            initialId={selectedNote.id}
          />
        ) : (
          ""
        )}
      </main>
    </>
  );
}

export default App;

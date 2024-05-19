import { useState, useEffect } from "react";

const Note = () => {
  const [notes, setNotes] = useState([]);

  const colors = [
    "bg-red-100",
    "bg-red-300",
    "bg-red-500",

    "bg-red-600",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-teal-100",
    "bg-orange-100",
    "bg-indigo-100",
    "bg-gray-100",
    "bg-lime-100",
    "bg-cyan-100",
    "bg-amber-100",
    "bg-fuchsia-100",
    "bg-rose-100",
    "bg-violet-100",
    "bg-green-300",
    "bg-violet-300",
    "bg-blue-300",
    "bg-orange-300",
    "bg-yellow-300",
  ];

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setNotes([...notes, { id: Date.now(), text: "", color: randomColor }]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleShareNote = (text) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Sticky Note",
          text: text,
        })
        .then(() => {
          console.log("Note shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing note:", error);
        });
    } else {
      alert("API Pe Kam chal rha hai");
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="p-5 bg-amber-50 flex flex-col mt-7 w-full max-w-4xl mx-5 rounded-md">
        <div className="bg-blue-300 hover:bg-blue-100 shadow-xl transition duration-300 p-6  rounded-full flex justify-center mb-4 py-3">
          <h1 className="text-4xl md:text-3xl font-extrabold text-gray-700 ">
            Sticky Notes
          </h1>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAddNote}
            className="mb-8 px-6 py-2 bg-yellow-400 hover:bg-gray-200 text-gray-700 font-bold rounded-full shadow-lg transition duration-300"
          >
            Add Note
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`relative ${note.color} p-4 text-gray-700 rounded-md shadow-xl w-full sm:w-60 h-60 transform hover:scale-105 transition duration-300`}
            >
              <textarea
                className="w-full h-full bg-transparent resize-none focus:outline-none border-none text-gray-700 p-2 rounded-lg"
                value={note.text}
                placeholder="Write your note here"
                onChange={(e) => {
                  const newNotes = notes.map((n) =>
                    n.id === note.id ? { ...n, text: e.target.value } : n
                  );
                  setNotes(newNotes);
                }}
              />
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="absolute top-2 right-2 bg-gray-700 py-0 hover:bg-blue-100 text-white hover:text-gray-700 font-semibold rounded-full p-2 shadow-md transition duration-300"
              >
                DEL
              </button>
              <button
                onClick={() => handleShareNote(note.text)}
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full p-2 py-1 shadow-md transition duration-300"
              >
                Share
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Note;

import apiService from "./apiService";

const createNote = async (noteData) => {
    return await apiService.post("/notes/create-notes", noteData);

}

const getAllNotes = async () =>{
    return await apiService.get("/notes/get-all-notes");
}

const getNoteById = async (id) =>{
    return await apiService.get(`/notes/get-note/${id}`);
}

const updateNote = async (id, noteData) => {
    return await apiService.put(`/notes/update-note/${id}`, noteData);

}

const deleteNote = async (id) => {
    return await apiService.delete(`/notes/delete-note/${id}`);

}

export {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
}

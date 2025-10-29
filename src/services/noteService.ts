import { Note, INote } from "../models/Note";
import mongoose from "mongoose";

export const createNote = async (userId: string, data: Partial<INote>) => {
    const note = new Note({ ...data, user: new mongoose.Types.ObjectId(userId) });
    await note.save();
    return note.toObject();
};

export const listNotes = async (userId: string, filters: any = {}) => {
    const query: any = { user: userId };

  // Aplique filtros simples, por exemplo ?title=foo, ?tag=bar, ?pinned=true
    if (filters.title) query.title = { $regex: filters.title, $options: "i" };
    if (filters.tag) query.tags = filters.tag;
    if (filters.pinned !== undefined) query.pinned = filters.pinned === "true" || filters.pinned === true;

    return Note.find(query).sort({ updatedAt: -1 }).lean();
};

export const getNoteById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Note.findById(id).lean();
};

export const replaceNote = async (id: string, data: Partial<INote>) => {
    const updated = await Note.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    return updated;
};

export const patchNote = async (id: string, data: Partial<INote>) => {
    const updated = await Note.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
    return updated;
};

export const deleteNoteById = async (id: string) => {
    await Note.findByIdAndDelete(id);
    return;
};
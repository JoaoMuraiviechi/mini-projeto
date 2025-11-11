import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
    title: string;
    content?: string;
    tags?: string[];
    user: mongoose.Types.ObjectId;
    pinned?: boolean;
}

const noteSchema = new Schema<INote>({
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pinned: { type: Boolean, default: false }
}, { timestamps: true });

export const Note = mongoose.model<INote>("Note", noteSchema);
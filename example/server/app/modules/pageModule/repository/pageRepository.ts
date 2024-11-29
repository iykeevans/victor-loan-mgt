import mongoose, { Schema, Document } from 'mongoose';
import { Workspace } from '../../../../models/workSpaceModel'; // Assuming Workspace is defined elsewhere

// Interface for the Page document
export interface IPage extends Document {
  name: string;
  content: string;  // The page content, could be HTML or markdown
  url: string;  // Unique URL for the page
  parentMenuId: mongoose.Schema.Types.ObjectId | null; // Menu or Submenu reference
  workspaceId: mongoose.Schema.Types.ObjectId; // Reference to the workspace
  createdAt: Date;
  updatedAt: Date;
}

// Define the Page schema
const pageSchema = new Schema<IPage>(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    parentMenuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: false },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  },
  { timestamps: true }
);

// Create the Page model
const PageModel = mongoose.model<IPage>('Page', pageSchema);

export default PageModel;

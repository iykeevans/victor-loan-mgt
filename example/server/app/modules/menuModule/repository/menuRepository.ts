// modules/menu/models/menuModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Workspace } from '../../../../models/workSpaceModel'; // Assuming you have a Workspace model

interface IMenu extends Document {
  name: string;
  workspaceId: Workspace['_id'];  // Reference to Workspace
  parentMenuId: IMenu['_id'] | null; // Parent menu for nested submenus
  url: string; // Link associated with the menu or submenu
  order: number; // Menu order for sorting
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
    parentMenuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null },
    url: { type: String, required: true },
    order: { type: Number, default: 0 }, // Helps in sorting menus
  },
  { timestamps: true }
);

// Define Menu Model
const MenuModel = mongoose.model<IMenu>('Menu', menuSchema);

export default MenuModel;

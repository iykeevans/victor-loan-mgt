// src/plugins/settingsPlugin/settingsPluginModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISettingsPlugin extends Document {
  name: string;
  description: string;
  isPurchasable: boolean;
  price: number;
  installed: boolean;
}

const settingsPluginSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPurchasable: { type: Boolean, default: false },
    price: { type: Number, required: function () { return this.isPurchasable; } },
    installed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SettingsPlugin = mongoose.model<ISettingsPlugin>('SettingsPlugin', settingsPluginSchema);

export default SettingsPlugin;


// src/plugins/pluginModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPlugin extends Document {
  name: string;
  description: string;
  isPurchasable: boolean;
  price: number;
  installed: boolean;
  purchased: boolean;  // Whether the plugin has been purchased
}

const pluginSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPurchasable: { type: Boolean, default: false },
    price: { type: Number, required: function () { return this.isPurchasable; } },
    installed: { type: Boolean, default: false },
    purchased: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Plugin = mongoose.model<IPlugin>('Plugin', pluginSchema);

export default Plugin;






// modules/exampleModule/repositories/exampleRepository.ts
import mongoose, { Schema, Document } from 'mongoose';

// Example schema
interface IExample extends Document {
  name: string;
  description: string;
}

const exampleSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const ExampleModel = mongoose.model<IExample>('Example', exampleSchema);

export default ExampleModel;

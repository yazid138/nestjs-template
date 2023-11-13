import * as mongoose from 'mongoose';

export const GreetingSchema = new mongoose.Schema({
  value: String,
});

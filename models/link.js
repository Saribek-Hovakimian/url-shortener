import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  customPath: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  originalLink: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const Link = mongoose.models['Link'] || mongoose.model('Link', linkSchema);

export default Link;
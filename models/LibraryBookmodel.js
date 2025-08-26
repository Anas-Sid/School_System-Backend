import mongoose from 'mongoose';

const libraryBookSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publishedYear: {
    type: number,
    required: true
  },
  bookCode: {
    type: String,
    required: true
  },
  availabilityStatus: {
    type: String,
    enum: ['available', 'checked out'], 
    required: true
  },
  borrowedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  }]
}, {timestamps: true});

module.exports = mongoose.model("LibraryBook", libraryBookSchema);
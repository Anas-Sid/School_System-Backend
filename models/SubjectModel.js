import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
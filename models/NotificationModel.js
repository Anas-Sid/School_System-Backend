import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel'
  },
  userModel: {
    type: String,
    required: true,
    enum: ['Student', 'Teacher']
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Assignment', 'Event', 'Fee Payment']
  },
  status: {
    type: String,
    required: true,
    enum: ['unread', 'read']
  }

}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);

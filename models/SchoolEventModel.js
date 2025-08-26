import mongoose from "mongoose";

const schoolEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  participants: {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'participantsModel'
    }],
    participantsModel: [{
      type: String,
      required: true,
      enum: ['Student', 'Teacher']
    }],
  },
  eventdescription: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("SchoolEvent", schoolEventSchema);

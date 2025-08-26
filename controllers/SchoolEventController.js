import Schoolevent from '../models/SchoolEventModel.js';
import Student from "../models/StudentModel.js";
import Teacher from "../models/TeacherModel.js";

const addevent = async (req, res) => {
  const {eventName, eventDate, location, eventdescription} = req.body;
  try{
    const newEvent = new Schoolevent({
      eventName,
      eventDate,
      location,
      eventdescription
    });
    await newEvent.save();
    res.status(201).json({message: "Event added successfully", event: newEvent});
  } catch (error) {
    res.status(500).json({message: "Error adding event", error: error.message});
  }
}

const getallevent = async (req, res) => {
  try {
    const events = await Schoolevent.find();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

const getevent = async (req, res) => {
  const { eventName } = req.params;
  try {
    const event = await Schoolevent.findOne({ eventName });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error: error.message });
  }
};

const updateevent = async (req, res) => {
  const { eventName } = req.params;
  const updates = req.body;
  try {
    const updatedEvent = await Schoolevent.findOneAndUpdate(
      { eventName },
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

const deleteevent = async (req, res) => {
  const { eventName } = req.params;
  try {
    const deletedEvent = await Schoolevent.findOneAndDelete({ eventName });
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};



const addStudentToEvent = async (req, res) => {
  const { eventId } = req.params;  
  const { studentId } = req.body;  
  try {
    const event = await Schoolevent.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    event.participants.participants.push(student._id);  
    event.participants.participantsModel.push("Student"); 
    await event.save();
    res.status(200).json({ message: "Student added to event", event });
  } catch (error) {
    res.status(500).json({ message: "Error adding student to event", error: error.message });
  }
};

const addTeacherToEvent = async (req, res) => {
  const { eventId } = req.params;  
  const { teacherId } = req.body;  
  try {
    const event = await Schoolevent.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    event.participants.participants.push(teacher._id);
    event.participants.participantsModel.push("Teacher");
    await event.save();
    res.status(200).json({ message: "Teacher added to event", event });
  } 
  catch (error) 
    {
      res.status(500).json({ message: "Error adding teacher to event", error: error.message });
    }
};

const removeStudentFromEvent = async (req, res) => {
  const { eventId } = req.params;  
  const { studentId } = req.body;  

  try {
    
    const event = await Schoolevent.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

   
    const studentIndex = event.participants.participants.indexOf(studentId);

    if (studentIndex === -1) {
      return res.status(404).json({ message: "Student not a participant in this event" });
    }

    event.participants.participants.splice(studentIndex, 1);  
    event.participants.participantsModel.splice(studentIndex, 1); 

    
    await event.save();

    res.status(200).json({ message: "Student removed from event", event });
  } catch (error) {
    res.status(500).json({ message: "Error removing student from event", error: error.message });
  }
};

const removeTeacherFromEvent = async (req, res) => {
  const { eventId } = req.params;
  const { teacherId } = req.body;

  try {
    const event = await Schoolevent.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const teacherIndex = event.participants.participants.indexOf(teacherId);

    if (teacherIndex === -1) {
      return res.status(404).json({ message: "Teacher not a participant in this event" });
    }

    event.participants.participants.splice(teacherIndex, 1);
    event.participants.participantsModel.splice(teacherIndex, 1);

    await event.save();

    res.status(200).json({ message: "Teacher removed from event", event });
  } catch (error) {
    res.status(500).json({ message: "Error removing teacher from event", error: error.message });
  }
};

export { addevent, getallevent, getevent, updateevent, deleteevent, addStudentToEvent, addTeacherToEvent, removeStudentFromEvent, removeTeacherFromEvent };
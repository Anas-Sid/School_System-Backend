import express from "express";
import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(()=> console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("School Management Api is Running...")
})

import studentRoutes from './routes/StudentRoutes.js';
app.use('/api/students', studentRoutes);

import teacherRoutes from './routes/TeacherRoutes.js';
app.use('/api/teachers', teacherRoutes);

import courseRoutes from './routes/CourseRoutes.js';
app.use('/api/courses',courseRoutes);

import parentRoutes from './routes/ParentRoutes.js';
app.use('/api/parents', parentRoutes);

import SchoolEventRoutes from './routes/SchoolEventRoutes.js';
app.use('/api/schoolEvents', SchoolEventRoutes);

import  classroomRoutes from './routes/ClassroomRoutes.js';
app.use('/api/classrooms', classroomRoutes);

app.listen(process.env.PORT , () => {
  console.log(`Server is Running on ${process.env.PORT}`)
})
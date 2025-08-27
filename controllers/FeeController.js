import Fee from '../models/FeeModel.js'; 
import Student from '../models/StudentModel.js'; 
const addFee = async (req, res) => {
  const { studentId, amount, paymentStatus, dueDate, paidDate } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const fee = new Fee({
      studentId,
      amount,
      paymentStatus,
      dueDate,
      paidDate
    });
    const savedFee = await fee.save();
    res.status(201).json({
      message: 'Fee added successfully',
      fee: savedFee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find({}, { _id: 0 }).populate('studentId', 'firstName lastName email -_id');
    res.status(200).json(fees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export { addFee, getAllFees };
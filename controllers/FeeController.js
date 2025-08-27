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

const getFeesByStudentId = async (req, res) => {
  const { studentId } = req.params;
  try {
    const fees = await Fee.find({ studentId }, { _id: 0 }).populate('studentId', 'firstName lastName email -_id');
    if (!fees || fees.length === 0) {
      return res.status(404).json({ message: 'No fees found for this student' });
    }
    res.status(200).json(fees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateFees = async (req, res) => {
  const { studentId } = req.params;
  const { amount, paymentStatus, dueDate, paidDate } = req.body;
  try {
    const updatedFee = await Fee.findOneAndUpdate(
      { studentId },
      { amount, paymentStatus, dueDate, paidDate },
      { new: true }
    );
    if (!updatedFee) {
      return res.status(404).json({ message: 'Fee not found' });
    }
    res.status(200).json({
      message: 'Fee updated successfully',
      fee: updatedFee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteFees = async (req, res) => {
  const { studentId } = req.params;
  try {
    const deletedFee = await Fee.findOneAndDelete({ studentId });
    if (!deletedFee) {
      return res.status(404).json({ message: 'Fee not found' });
    }
    res.status(200).json({
      message: 'Fee deleted successfully',
      fee: deletedFee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getallPendingFees = async (req, res) => {
  try {
    const pendingFees = await Fee.find({ paymentStatus: 'Pending' });
    if (!pendingFees || pendingFees.length === 0) {
      return res.status(404).json({ message: 'No pending fees found' });
    }
    res.status(200).json(pendingFees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getallPaidFees = async (req, res) => {
  try {
    const paidFees = await Fee.find({ paymentStatus: 'Paid' });
    if (!paidFees || paidFees.length === 0) {
      return res.status(404).json({ message: 'No Paid fees found' });
    }
    res.status(200).json(paidFees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export { addFee, getAllFees, getFeesByStudentId, updateFees, deleteFees, getallPendingFees, getallPaidFees };
const Student = require('../models/studentModel')

const studentRegister = async(req,res) =>{
    const { name, studentID, email, trimester } = req.body;
    if (!name || !studentID || !email || !trimester) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const userToRegister = new Student({
            name: name,
            studentID: studentID,
            email: email,
            trimester: trimester,
        });

        const savedStudent = await userToRegister.save();
        console.log(savedStudent)
        res.status(200).json({ message: "Student registered successfully", student: savedStudent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register student." });
    }
}

const showData = async(req,res) =>{
    try{
        const students = await Student.find({});
        if (students.length>0){
            res.render('student', { students });
        }
        else {
            res.status(200).json({msg:"No Students Found"})
        }
      }
      catch(error){
        console.log(error)
      }
}

module.exports = { studentRegister, showData };
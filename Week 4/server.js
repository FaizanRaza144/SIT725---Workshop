var express = require("express");
const { Db } = require("mongodb");
var app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const database_string = "mongodb+srv://faizanraza:faizan786@cluster0.3u2cu.mongodb.net"; 

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(database_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database is connected to host: " + conn.connection.host);
    } catch (error) {
        console.log("Error: " + error);
        process.exit(1); 
    }
};

dbConnect();

const studentSchema = new Schema({
    name: { type: String, required: true },
    student_id: { type: String, required: true },
    email: { type: String, required: true },
    trimester: { type: Number, required: true },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

router.post('/register', async (req, res) => {
    const { name, student_id, email, trimester } = req.body;
    if (!name || !student_id || !email || !trimester) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const userToRegister = new Student({
            name: name,
            student_id: student_id,
            email: email,
            trimester: trimester,
        });

        const savedStudent = await userToRegister.save();
        console.log(savedStudent)
        res.status(200).json({ message: "User registered successfully", student: savedStudent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register user." });
    }
});

router.get('/students', async(req,res)=>{
  try{
    const students = await Student.find({});
    if (students.length>0){
        res.status(200).json({msg:"Students Record",students:students})
    }
    else {
        res.status(200).json({msg:"No Students Found"})
    }
  }
  catch(error){
    console.log(error)
  }
});

app.use('/api', router);

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port);
});

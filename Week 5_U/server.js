var express = require("express");
const { Db } = require("mongodb");
const bodyParser = require('body-parser');
const path = require('path');
var app = express();
const mongoose = require('mongoose');
const router = express.Router();
const studentRegister = require('./controllers/studentRegisterController')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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


router.post('/register',studentRegister.studentRegister);
router.get('/allData',studentRegister.showData)



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api', router);

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port);
});
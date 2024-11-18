const express = require('express')
const app = express()
const path = require('path');
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const addingNumbers=(num1,num2)=>{
    return num1+num2
}

app.get('/addition',(req,res)=>{
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = addingNumbers(num1,num2);
    res.json({
        statuscode:200,
        data:result
    });
});
app.listen(port,()=>{
    console.log("The server is running at PORT: "+port)
})
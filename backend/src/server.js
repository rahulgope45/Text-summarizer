import express from 'express';


const app = express();
const PORT = 3002;

app.use(express.json());

app.get('/',(req,res) =>{
    res.send(
       ` <h1>
        Hello
    </h1>`
    )
});






app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`)
});
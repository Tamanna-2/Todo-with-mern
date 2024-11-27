const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController= require('./authController');
const taskController= require('./taskController');
const auth=require('./authMiddleware')

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tamannaprajapat2003:D3waJ2aW8gVVP8QQ@tamanna.uz93ixr.mongodb.net/todoAppDB?retryWrites=true&w=majority&appName=Tamanna', 
     {useNewUrlParser: true, useUnifiedTopology:true}
)
.then(()=>console.log('connected!'))
.catch(err=>console.log(err)); 

app.post('/login', authController.login); 
app.post('/register', authController.register); 
app.post('/tasks', auth.auth, taskController.createTask); // For creating tasks
app.get('/tasks', auth.auth, taskController.getTasks); // For fetching tasks
app.put('/tasks/:taskId', auth.auth, taskController.updateTaskStatus);


const PORT = process.env.PORT ||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`) );
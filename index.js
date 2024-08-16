import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { deleteUser, getUser, getUserI, postUser, updateUser, userLogin } from './controllers/user.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    if(conn){
        console.log("✅MongoDB connected Successfully...!")
    }
}
connectDB();

app.post('/newUser', postUser)
app.get('/allUser',getUser)
app.get('/getUserI/:id', getUserI)
app.put('/updateUser/:id', updateUser)
app.delete('/deleteUser/:id',deleteUser)
app.get('/login', userLogin)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})
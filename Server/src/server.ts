import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/user';
import bcrypt from 'bcrypt';
import checkUsername from './utils/username';

const app = express();
const PORT = process.env.PORT;


app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database.
const db = mongoose.connect(process.env.MONGO_URL_CONNECTION!);
db.then(data => {
    console.log("Database connected!");
})
.catch(err => {
    console.log("can't connect to the database");

})

// Routes
// Register User
app.post("/users", async (req: Request, res: Response) => {
    // Get the body.
    const user = req.body;

    // Check for existing username.
    const existingUsername = await checkUsername(user.username.toLowerCase())
    if (existingUsername) {
        // Username already exists, send a 409 (Conflict) response
        return res.status(409).json({ message: 'Username already exists!'});
    }

    // Hashed password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        
    console.log(`hp: ${hashedPassword}`);
    console.log({...user, password: hashedPassword});

    const newUser = new UserModel({...user, password: hashedPassword})    
    const result = await newUser.save();
    console.log('res:')
    console.log(result)    
    res.status(200).json({message: "User registered successfully!"})
})

// Login
app.post('/users/login', async (req: Request, res: Response) => {
    // Get the body.
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await UserModel.findOne({ username });
        console.log(user);
        if (!user) {
        return res.status(401).json({message: "Invalid username or password!"});
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password!);
        console.log(passwordMatch)
        if (!passwordMatch) {
        return res.status(401).json({message: "Invalid username or password!"});
        }

        res.json({status: 'success'})
    } catch (error) {
        console.log(error)
        res.status(401).json({message: "Invalid username or password!"});
    }
    
})



app.listen(PORT, () => {
    console.log(`Listening on port${PORT}`);
})
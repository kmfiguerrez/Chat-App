import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel from './models/user';

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
app.post("/users", async (req: Request, res: Response) => {
    const user = req.body
    const newUser = new UserModel(user)
    console.log(user)
    const result = await newUser.save();    
    res.json({res: "ok"})
})

app.post('/', (req: Request, res: Response) => {
    const { db, color } = req.body;
    console.log(db, color)
    res.send('<p>ay yo!</p>');
})



app.listen(PORT, () => {
    console.log(`Listening on port${PORT}`);
})
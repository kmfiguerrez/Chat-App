import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import DeckModel from './models/deck';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;


app.use(express.urlencoded({extended: true}));
app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }));
// const db = mongoose.connect(process.env.MONGO_URL_CONNECTION!);
// db.then(data => {
//     console.log("Database connected!");
// })
// .catch(err => {
//     console.log("can't connect to the database");

// })

// Parse data coming from HTML form.

// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/data", (req: Request, res: Response) => {
    const data = { items: ["pen", "notebook", "ruler", "eraser"]};
    console.log(req.body)
    res.json(data);
})

app.post('/', (req: Request, res: Response) => {
    const { db, color } = req.body;
    console.log(db, color)
    res.send('<p>ay yo!</p>');
})



app.listen(PORT, () => {
    console.log(`Listening on port${PORT}`);
})
import mongoose from 'mongoose';

const DeckSchema = new mongoose.Schema({
    title: String
})

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;
import mongoose, { mongo } from "mongoose";

const petsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    breed:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    petID:{
        type: String,
        
    },
    phone:{
        type: String,
    },
    usrID:{
        type: String,
    },
    

},{
    timestamps: true,
});

const Pet = mongoose.model('Pet', petsSchema);
export default Pet;
import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
    rank: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    duty: { type: String, required: true },
    bigDuty: { type: String, required: true }
}, {
    versionKey: false
});
export default postSchema
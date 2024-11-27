const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    userId: { type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    description: { type:String, required: true},
    status: { type:String, enum:['pending','completed'], default:'pending'}
});

const Task= mongoose.model('tasks', TaskSchema);

module.exports= Task;
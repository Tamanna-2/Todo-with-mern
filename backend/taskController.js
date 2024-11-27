const Task= require('./Task');

exports.createTask = async (req, res) => {
    try {
      const { description } = req.body;
      const userId = req.user.id;
      const newTask = new Task({ description, userId });
      await newTask.save();
      res.status(201).json(newTask);
      res.status(201).json({ message: 'Task created successfully' });
      
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
};

// exports.getTasks = async(req,res)=>{
//     try{
//         const tasks = await Task.find({userId:req.user.id});
//         res.status(200).json(tasks);
//         }catch(err){
//             res.status(500).json({message:err.message});
//             }
// };

exports.getTasks = async(req,res)=>{
  console.log('Fetching tasks for user:', req.user.id);
  try {
    console.log('User ID:', req.user.id); 
      const tasks = await Task.find({userId:req.user.id});
      console.log('Tasks fetched:', tasks);
      res.status(200).json(tasks);
  } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({message:err.message});
  }
};

exports.updateTaskStatus = async (req, res) => {
    try {
      const taskId = req.params.taskId;
      // const taskId = req.params.id;
      const task = await Task.findById(taskId);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      task.status = 'completed';
      await task.save();
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
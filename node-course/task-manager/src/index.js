const express = require('express');
require('./db/mongoose.js');

const UserRouter = require('./routers/user-routes');
const TaskRouter = require('./routers/task-routes');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);
app.listen(port, () => console.log(`Server started in port ${port}`));

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    const task = await Task.findById('5eeb162f772c267a64407e8b');
    await task.populate('owner').execPopulate();
    console.log(task);

    const user = await User.findById('5eeb1619772c267a64407e89');
    await user.populate('tasks').execPopulate();
    console.log(user);
}

main();
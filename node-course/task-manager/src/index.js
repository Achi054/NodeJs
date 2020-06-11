const express = require('express');
require('./db/mongoose.js');

const User = require('./models/user.js');
const Task = require('./models/task.js');
const UserRouter = require('./routers/user-routes');
const TaskRouter = require('./routers/task-routes');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);
app.listen(port, () => console.log(`Server started in port ${port}`));

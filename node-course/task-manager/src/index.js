const express = require('express');
require('./db/mongoose.js');

const User = require('./models/user.js');
const Task = require('./models/task.js');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.listen(port, () => console.log(`Server started in port ${port}`));

// User API(s)
app.post('/users', (req, res) => {
    var user = new User(req.body);

    user.save()
    .then(() => { res.send(user); })
    .catch((error) => { res.status(400).send(error); })
});


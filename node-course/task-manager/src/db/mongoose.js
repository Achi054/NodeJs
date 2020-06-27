var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Achi054:fabregas054!@data-store-oea25.azure.mongodb.net/TaskManager?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var mongoose = require('mongoose');
var validate = require('validator');

mongoose.connect('mongodb+srv://Achi054:fabregas054!@data-store-oea25.azure.mongodb.net/TaskManager?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true
});

var User = new mongoose.model('users', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validate.isEmail(value))
                throw new Error('Invalid email.');
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0)
                throw new Error('Age should be a positive number.');
        }
    }
});

var data = new User({
    name: "Sunith",
    email: "Sunith@Acharya.com",
    age: 20
});

data.save()
.then(() => console.log(data))
.catch((error) => console.log(error))

var Tasks = new mongoose.model('tasks', {
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

var data = new Tasks({
    description: 'Do Chores'
});

data.save()
.then(() => console.log(data))
.catch((error) => console.log(error));
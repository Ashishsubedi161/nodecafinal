const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashishsubedi600:Subedi700@cluster0.8urre8y.mongodb.net/jobfinder?retryWrites=true&w=majority', { useNewUrlParser: true }).then(()=>
{
    console.log('MongoDB Connection Succeeded.')
}
).catch(err=>{
    console.log('Error in DB connection : ' + err)
})


require('./user.model');
require('./job.model')
const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://kabishbrt:epark@cluster0.j7qlgov.mongodb.net/epark?retryWrites=true&w=majority';

mongoose.connect(dbURL).then(() => {
  console.log('DB connected!');
}).catch((err) => {
  console.error('Db connection failed- ', err);
}); 
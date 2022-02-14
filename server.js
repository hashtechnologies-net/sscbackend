const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION ! Shutting Down....');
  console.log(err.name, err.message);
  process.exit(1);
});

let DB = process.env.DATABASE_LOCAL;
if (process.env.NODE_ENV === 'production') {
  DB = process.env.DATABASE;
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex:true,
  })
  .then(() => {
    console.log(`DB connected...`);

    const port = process.env.PORT || 5000;

    const server = app.listen(port, () => {
      console.log(`Server running at PORT : ${port}/`);
    });

    process.on('unhandledRejection', (err) => {
      console.log(err.name, err.message);
      console.log('UNHANDLED REJECTION ! Shutting Down...');
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

// -----------------------------------------------------------------------

// const axios = require('axios');
// setInterval(() => {
//   axios.get('http://localhost:5000/');
// }, 1500000);

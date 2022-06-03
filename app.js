const express = require('express');
const morgan = require('morgan');

const dryCleaningRouter = require('./routes/dryCleaningRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) middlewares
if(process.env.NODE_ENV ==='development'){
app.use(morgan('dev'));}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next)=>{
    console.log('Hello from the middleware');
    next();
});

app.use((req,res, next)=> {
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/dryCleanings', dryCleaningRouter) // we specify the route for which we want to use middleware
app.use('/api/v1/users', userRouter)

module.exports =app;
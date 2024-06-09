require('dotenv').config();
const express = require('express');
require('express-async-errors');
const app = express();
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const notFoundMiddeleware = require('./middleware/not-found');
const errorHandlerMiddeleware = require('./middleware/error-handler');


// middeleware
app.use(express.json());

// route
app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Product route</a>')    
})

app.use('/api/v1/products', productRouter);

// product route 



app.use(notFoundMiddeleware);
app.use(errorHandlerMiddeleware);

const port = process.env.PORT

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => 
            console.log(`Server is listing on port: ${port}`)
            );
    } catch (error) {
        console.log('error: ', error);
        // res.send(err);
    }
}

start()
const express = require('express');
const path = require('path');
const app = express();

//routes
app.use('/api/home', require('./routes/api/home'));
app.use('/api/occurrence', require('./routes/api/occurrence'));
//posting form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Serve static assest if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
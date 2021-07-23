const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//api for coockie changing ctf.
app.get('/api/hddn', (req, res) => {
    console.log(req.query)
    let secret = req.query.secret || null;
    if (secret == "einstein") {
        res.send({ "response": "evil_cookie" })
    }
    else {
        res.send({ "response": "Hello World" })
    }
})

app.get('/dino', function(req, res) {
    res.sendFile(path.join(__dirname, '/dino.html'));
  });
  
  
//ejs file for cookie changing ctf.
app.get('*', async (req, res) => {
    res.render('index', { title: 'ChepBin' })
})

app.listen(port, () => console.log(`Server is running on port ${port} likely on localhost, if not on localhost then you are in production but you already know that!`));
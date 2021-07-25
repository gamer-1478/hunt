const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var fs = require('fs');


async function basicChecks(req) {
    //takes in the whole req and gives true or error string, if true continue, or else return the error string given by this function.
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);

    let ip = req.headers["x-forwarded-for"];
    if (ip) {
        var list = ip.split(",");
        ip = list[list.length - 1];
    } else {
        ip = req.socket.remoteAddress;
    }
    //console.log("headers:", req.headers)
    console.log("query:", req.query)
    console.log("body:", req.body)
    console.log(ip)

    newIpField = { "ip_field": ip }
    data.push(newIpField)
    fs.writeFile('data.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}

//api for coockie changing ctf.
app.get('/api/hddn', (req, res) => {
    basicChecks(req)
    let secret = req.query.secret || null;
    if (secret == "newshepard") {
        res.send({
            "heading": "we really miss bhyi.tk but if you search well enough you may find an archive of it with a current ts member. it really has some well-known contributors.",
            "comment": "gYs9nS8LlZ8"
        })
    }
    else {
        res.send({ "heading": "sidney monster is your friend here", "comment": "once you figure it out, check out :the start of the hundred years war" })
    }
})

app.get('/dino', function (req, res) {
    basicChecks(req)
    res.sendFile(path.join(__dirname, '/dino.html'));
});

//ejs file for cookie changing ctf.
app.get('*', async (req, res) => {
    basicChecks(req)
    res.render('index', { title: 'ChepBin' })
})

app.listen(port, () => console.log(`Server is running on port ${port} likely on localhost on your custom domain in production`));
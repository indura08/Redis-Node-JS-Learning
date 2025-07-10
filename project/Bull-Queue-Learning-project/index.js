const express = require('express');
const emailQueue = require('./queue');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ extended: true}));

app.post('/send-email', async (req, res) => {
    const { to , subject, body } = req.body;

    await emailQueue.add({ to, subject, body });

    res.send('Email job added to queue');
})

app.listen(3000, () => {
    console.log("app listesn in port 3000");
})


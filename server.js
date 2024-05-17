const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let users = {
    'user1': 'password1',
    'user2': 'password2'
};

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        res.json({ success: false, message: 'Username already exists' });
    } else {
        users[username] = password;
        res.json({ success: true });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

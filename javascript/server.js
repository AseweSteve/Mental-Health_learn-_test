const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

const url = 'mongodb://localhost:27017';
const dbName = 'authenticationDB';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.post('/signup', async (req, res) => {
    const { signupUsername, signupEmail, signupPassword, confirmPassword } = req.body;
    if (signupPassword !== confirmPassword) {
        return res.json({ success: false, message: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(signupPassword, 10);
    const user = { username: signupUsername, email: signupEmail, password: hashedPassword };
    const existingUser = await db.collection('users').findOne({ email: signupEmail });
    if (existingUser) {
        return res.json({ success: false, message: 'Email already in use' });
    }
    await db.collection('users').insertOne(user);
    req.session.user = user;
    res.json({ success: true });
});

app.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    const user = await db.collection('users').findOne({ email: loginEmail });
    if (!user || !(await bcrypt.compare(loginPassword, user.password))) {
        return res.json({ success: false, message: 'Invalid email or password' });
    }
    req.session.user = user;
    res.json({ success: true });
});

app.get('/blog.html', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/register.html');
    }
    res.sendFile(__dirname + '/blog.html');
});

app.get('/depression.html', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/register.html');
    }
    res.sendFile(__dirname + '/depression.html');
});

app.use(express.static('public'));

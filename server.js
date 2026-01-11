// Simple Node.js/Express backend for registration and login
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('.'));

const USERS_FILE = './users.json';

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ success: false, message: 'Missing fields' });
    let users = loadUsers();
    if (users.find(u => u.username === username)) {
        return res.json({ success: false, message: 'Username exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    users.push({ username, password: hash });
    saveUsers(users);
    res.json({ success: true });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    let users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.json({ success: false });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

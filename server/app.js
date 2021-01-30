const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

// ENG: initialize app & TR: app oluşturma
const app = express();

// ENG: Middlewares & TR: Orta yazılımlar
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./config/passport')(passport);

// ENG: Require database connect & TR: Database bağlantısı 
require('./mongo-connection');

// ENG: Bring in the Users route & TR: User route getirildi
const users = require('./routes/api/users');
app.use('/api/users', users);

// ENG: Listening server & TR: Server oluşturma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');
const app = express();
const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dotenv.config();

db.sequelize.sync()
  .then(() => { console.log('DB 연결 성공!'); })
  .catch(console.error);

passportConfig();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.static('public'));
app.use(express.urlencoded( { extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3030, () => {
  console.log('3030 포트번호로 서버 실행 중..')
});
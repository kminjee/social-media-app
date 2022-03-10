const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();

const { User, Post } = require('../models');



/* 로그인 */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, desc) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (desc) {
      return res.status(401).send(desc.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'] // 전체 데이터 중에 비밀번호만 빼고 가져온다는 뜻
        },  
        include: [{
          model: Post
        }]
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});


/* 로그아웃 */
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});


/* 회원가입 */
router.post('/', async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (emailCheck) {
      return res.status(403).send('이미 사용 중인 이메일 입니다.');
    };
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    const singupUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword
    });
    res.status(201).send('회원가입 완료\n'+singupUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
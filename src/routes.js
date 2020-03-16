const { Router } = require('express');
const AuthController = require('./controllers/AuthController');
const initializePassport = require('./passport-config');
const passport = require('passport');

users = AuthController.users;

initializePassport(passport,
    nickname => users.find(user => user.nickname === nickname),
    id => users.find(user => user.id === id)
);

routes = Router();

routes.post('/register', AuthController.registerUser);
routes.post('/login', passport.authenticate('local'),  AuthController.signInUser);

module.exports = { routes, passport };

// const { Router, urlencoded } = require('express');
// const passwordHash =  require('password-hash')
// routes = Router();

// const users = [];

// routes.use(urlencoded({ extended: false }));

// routes.get('/', (req, res) => {
//     console.log('Test')
//     res.send({
//         response: "Done!"
//     })
//     .status(200);
// });

// routes.post('/login', (req, res) => {
//     passwordHash.verify()
// });

// routes.post('/register', async (req, res) => {
//     try {
//         passwordHash.verify()
//         users.push({
//             id: Date.now().toString(),
//             nickname: req.body.name,
//             email: req.boody.email,
//             password: hashedPassword
//         })
//     } catch {

//     }
//     req.body.email
// });

// module.exports = routes;
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
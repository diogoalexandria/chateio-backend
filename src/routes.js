const { Router } = require('express');

routes = Router();

routes.get('/', (req, res) => {
    console.log('Test')
    res.send({
        response: "Done!"
    })
    .status(200);
});

module.exports = routes;
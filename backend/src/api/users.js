const { Router } = require('express');

const router = Router();

router.get('/currentUserId', (req, res) => {
    const user = req.user;
    res.send(user ? user._id : '');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

})

router.post('/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
})

module.exports = router;
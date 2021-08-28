const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/health');
});

router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;
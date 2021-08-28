const express = require('express');
const catsController = require('../controllers/cats');
const router = express.Router();

router.get('/', catsController.catsList);
router.get('/:name', catsController.catsDetail);
router.get('/:id/images', catsController.catsImages);

module.exports = router;
const router = require('express').Router();
const headlineController = require('../../controllers/headlineController');

router.route('/').get(headlineController.findAll);
router.route('/:id').get(headlineController.findById);
router.route('/scrape/:id').get(headlineController.scrapeById);

module.exports = router;

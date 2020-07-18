const { Router } = require('express');
const router = Router();
const { getHealthinsurances,
     createHealthinsurance,
      deleteHealthinsurance,
       editHealthinsurance,
        getHealthinsurance } = require('../controllers/healthinsuranceController');

router.route('/')
    .get(getHealthinsurances)

router.route('/new')
    .post(createHealthinsurance)

router.route('/:id')
    .get(getHealthinsurance)
    .delete(deleteHealthinsurance)
    .put(editHealthinsurance)

module.exports = router;
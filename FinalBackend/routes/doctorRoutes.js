const { Router } = require('express');
const router = Router();
const { getDoctors,
     createDoctor,
      getDoctor,
       deleteDoctor,
        editDoctor } = require('../controllers/doctorController');

router.route('/')
    .get(getDoctors)

router.route('/new')
    .post(createDoctor)

router.route('/:id')
    .get(getDoctor)
    .delete(deleteDoctor)
    .put(editDoctor)

module.exports = router;
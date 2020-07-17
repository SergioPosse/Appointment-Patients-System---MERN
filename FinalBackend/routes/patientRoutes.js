const { Router } = require('express');
const router = Router();
const { getPatients,
     getPatient,
      createPatient,
       deletePatient,
        editPatient } = require('../controllers/patientController');

router.route('/')
    .get(getPatients)

router.route('/new')
    .post(createPatient)

router.route('/:id')
    .get(getPatient)
    .delete(deletePatient)
    .put(editPatient)

module.exports = router;
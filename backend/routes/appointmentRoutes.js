const { Router } = require('express');
const router = Router();
const { getAppointments,
     createAppointment,
      getAppointmentByDoctor,
       deleteAppointment,
        editAppointment } = require('../controllers/appointmentController');

router.route('/')
    .get(getAppointments)

router.route('/new')
    .post(createAppointment)

router.route('/:id')
    .get(getAppointmentByDoctor)
    .delete(deleteAppointment)
    .put(editAppointment)

module.exports = router;
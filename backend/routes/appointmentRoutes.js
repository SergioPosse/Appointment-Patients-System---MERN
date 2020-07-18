const { Router } = require('express');
const router = Router();
const { getAppointments,
     createAppointment,
      getAppointment,
       deleteAppointment,
        editAppointment } = require('../controllers/appointmentController');

router.route('/')
    .get(getAppointments)

router.route('/new')
    .post(createAppointment)

router.route('/:id')
    .get(getAppointment)
    .delete(deleteAppointment)
    .put(editAppointment)

module.exports = router;
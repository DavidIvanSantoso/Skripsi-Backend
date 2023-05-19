const express = require('express');
const router = express.Router();
const deviceVarController = require('../controllers/deviceVarController');

router.route('/')
    .get(deviceVarController.getDeviceVar)
    .post(deviceVarController.createNewDeviceVar)
    .put(deviceVarController.updateDeviceVar)
    .delete(deviceVarController.deleteDeviceVar);

router.route('/:devid')
    .get(deviceVarController.getDeviceVarByDevId);

router.route('/:devid/:varid')
    .get(deviceVarController.getDeviceVarByVar);

module.exports = router;

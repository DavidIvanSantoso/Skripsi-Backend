const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.route('/')
    .get(dashboardController.getDashboard)
    .post(dashboardController.createDashboard)
    .put(dashboardController.updateDashboard)
    .delete(dashboardController.deleteDashboard);

router.route('/:dashboardid')
    .get(dashboardController.getDashboardById);

module.exports = router;

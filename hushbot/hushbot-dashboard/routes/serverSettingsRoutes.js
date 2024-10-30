const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/serverSettingsController');

// Route to get server settings
router.get('/:serverId', getSettings);

// Route to update server settings
router.post('/update', updateSettings);

module.exports = router;

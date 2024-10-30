const ServerSettings = require('../models/ServerSettings');

// Get settings by server ID
exports.getSettings = async (req, res) => {
    const { serverId } = req.params;
    try {
        const settings = await ServerSettings.findOne({ serverId });
        res.json(settings || { message: "No settings found for this server." });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch server settings" });
    }
};

// Update or create server settings
exports.updateSettings = async (req, res) => {
    const { serverId } = req.body;
    const update = req.body;

    try {
        let settings = await ServerSettings.findOneAndUpdate(
            { serverId },
            update,
            { new: true, upsert: true } // upsert option will create a new entry if none exists
        );
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: "Failed to update server settings" });
    }
};

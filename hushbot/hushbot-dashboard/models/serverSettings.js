const mongoose = require('mongoose');

const serverSettingsSchema = new mongoose.Schema({
    serverId: { type: String, required: true, unique: true },  // Unique server ID
    welcomeMessage: { type: String, default: '' },
    goodbyeMessage: { type: String, default: '' },
    serverStats: {
        totalMembers: { type: Boolean, default: false },
        onlineMembers: { type: Boolean, default: false },
        botMembers: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model('ServerSettings', serverSettingsSchema);

// Replace saveSettings function in dashboard.js
async function saveSettings(section) {
    const serverId = localStorage.getItem('serverId'); // Assume serverId is stored after login

    let settings;
    if (section === 'welcome') {
        const welcomeText = document.getElementById('welcome-text').value;
        settings = { serverId, welcomeMessage: welcomeText };
    } else if (section === 'stats') {
        const totalMembers = document.getElementById('total-members').checked;
        const onlineMembers = document.getElementById('online-members').checked;
        const botMembers = document.getElementById('bot-members').checked;
        settings = {
            serverId,
            serverStats: { totalMembers, onlineMembers, botMembers }
        };
    } else if (section === 'goodbye') {
        const goodbyeText = document.getElementById('goodbye-text').value;
        settings = { serverId, goodbyeMessage: goodbyeText };
    }

    // Save to backend
    try {
        const response = await fetch('/api/server-settings/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        if (response.ok) {
            alert(`${section} settings saved!`);
        }
    } catch (error) {
        console.error("Error saving settings:", error);
    }
}

// Fetch settings when page loads
async function loadSettings() {
    const serverId = localStorage.getItem('serverId');
    if (!serverId) return;

    try {
        const response = await fetch(`/api/server-settings/${serverId}`);
        const data = await response.json();
        if (data) {
            document.getElementById('welcome-text').value = data.welcomeMessage || '';
            document.getElementById('goodbye-text').value = data.goodbyeMessage || '';
            document.getElementById('total-members').checked = data.serverStats.totalMembers || false;
            document.getElementById('online-members').checked = data.serverStats.onlineMembers || false;
            document.getElementById('bot-members').checked = data.serverStats.botMembers || false;
        }
    } catch (error) {
        console.error("Error loading settings:", error);
    }
}

// Call loadSettings when the page loads
document.addEventListener("DOMContentLoaded", loadSettings);

// Create a recurring alarm named "timeoutTimer" with a period of 1 minute (1/60 hours)
chrome.alarms.create("timeoutTimer", {
    periodInMinutes: 1 / 60
});

// Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    // Check if the alarm is named "timeoutTimer"
    if (alarm.name === "timeoutTimer") {
        // Retrieve the timer and isRunning values from local storage
        chrome.storage.local.get(["timer", "isRunning"], (res) => {
            if (res.isRunning) {
                // Increment the timer by 1 (1 second) and set isRunning to true
                let timer = res.timer + 1;
                let isRunning = true;

                // Check if the timer has reached 25 minutes (60 seconds * 25 minutes)
                if (timer === 60 * 25) {
                    // If 25 minutes have passed, create a notification
                    chrome.notifications.create('', {
                        type: 'basic',
                        iconUrl: 'icon.png', // Replace with your icon URL
                        title: 'Task complete',
                        message: '25 minutes has passed',
                    });

                    // Reset the timer to 0 and set isRunning to false
                    timer = 0;
                    isRunning = false;
                }

                // Update the timer and isRunning values in local storage
                chrome.storage.local.set({
                    timer,
                    isRunning,
                });
            }
        });
    }
});

// Retrieve timer and isRunning values from local storage and set default values if not present
chrome.storage.local.get(["timer", "isRunning"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0, // Default to 0 if timer is not in local storage
        isRunning: "isRunning" in res ? res.isRunning : false, // Default to false if isRunning is not in local storage
    });
});

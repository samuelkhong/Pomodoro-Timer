

# README: Pomodoro Timer

This README provides a high-level overview of the Chrome extension code, which serves as a timer with specific functionality:

## Overview

The code in this Chrome extension implements a timer with a focus on managing tasks. It allows users to set a timer for a specified duration (defaulted to 25 minutes) and keeps track of tasks associated with this timer.

## Features

1. **Timer Functionality**: The extension provides a timer that counts down from 25 minutes. It displays the time remaining and updates in real-time.

2. **Start/Pause Timer**: Users can start or pause the timer by clicking the "Start Timer" or "Pause Timer" button.

3. **Reset Timer**: There is an option to reset the timer to 0, which stops the timer and clears any elapsed time.

4. **Task Management**: Users can add tasks associated with their timer. These tasks are stored and can be edited or deleted.

5. **Alarms**: The extension sets up a recurring alarm named "timeoutTimer" that triggers every minute (1/60 hours). When this alarm triggers, it checks the timer's state and increments it if it's running. If the timer reaches 25 minutes, a notification is displayed, and the timer is reset.

## How to Use

1. Install the Chrome extension.
2. Open the extension popup.
3. Start the timer using the "Start Timer" button.
4. Add tasks using the "Add Task" button.
5. The timer will continue running even if you close the popup.
6. When the timer reaches 25 minutes, a notification will appear.
7. You can pause, reset, or edit tasks as needed.

## Code Structure

- The code is structured as a JavaScript Chrome extension.
- It uses Chrome's `chrome.storage` to persist timer and task data.
- The timer logic is handled by the `updateTime()` function.
- Task management is implemented through functions like `addTask()`, `deleteTask()`, and `renderTasks()`.
- Alarms are set up to check and manage the timer state.

## Default Settings

- The default timer duration is set to 25 minutes.
- The timer starts as soon as you open the extension popup.
- Tasks are saved using Chrome's local storage.

## Notifications

- When the timer reaches 25 minutes, a notification is created, indicating the task is complete.


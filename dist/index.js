"use strict";
// Timer duration in seconds (25 minutes)
const POMODORO_DURATION = 25 * 60;
let timeLeft = POMODORO_DURATION;
let timerInterval;
let isRunning = false;
// Deep work tracking
let todaySeconds = 0;
let weeklySeconds = 0;
// Get DOM elements
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const todayTimeDisplay = document.getElementById("todayTime");
const weeklyTimeDisplay = document.getElementById("weeklyTime");
// Format seconds to MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
// Update timer display
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}
// Update work summary
function updateWorkSummary() {
    todayTimeDisplay.textContent = `${(todaySeconds / 3600).toFixed(1)} hrs`;
    weeklyTimeDisplay.textContent = `${(weeklySeconds / 3600).toFixed(1)} hrs`;
}
// Start timer
function startPomodoro() {
    if (isRunning)
        return;
    isRunning = true;
    startBtn.disabled = true;
    timerInterval = window.setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        }
        else {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.disabled = false;
            todaySeconds += POMODORO_DURATION;
            weeklySeconds += POMODORO_DURATION;
            updateWorkSummary();
            timeLeft = POMODORO_DURATION;
            updateTimerDisplay();
            alert("Pomodoro session complete!");
        }
    }, 1000);
}
// Reset timer
function resetPomodoro() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = POMODORO_DURATION;
    updateTimerDisplay();
    startBtn.disabled = false;
}
// Initialize display
updateTimerDisplay();
updateWorkSummary();
// Event listeners
startBtn.addEventListener("click", startPomodoro);
resetBtn.addEventListener("click", resetPomodoro);

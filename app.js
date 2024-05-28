let timerInterval;
let timeRemaining;
let totalTime;
let progressBar;

window.addEventListener("load", () => {
    const startButton = document.getElementById("start");
    startButton.addEventListener("click", timerHandler);

    progressBar = new ProgressBar.Circle(".progress", {
        color: "#6eddff",
    });

    changeStartTime();
});

const timerHandler = () => {
    const startButton = document.getElementById("start");

    if (startButton.innerText === "RESTART") {
        restartTimer();
        return;
    }

    startButton.classList.toggle("active");

    if (startButton.classList.contains("active")) {
        startButton.innerText = "STOP";

        progressBar.animate(1, {
            duration: timeRemaining * 1000,
        });

        timerInterval = setInterval(() => {
            if (timeRemaining == 0) {
                clearInterval(timerInterval);
                finishedTimer();
            } else {
                timeRemaining--;
                remaining.innerText = formatTime(timeRemaining);
            }
        }, 1000);
    } else {
        startButton.innerText = "START";
        clearInterval(timerInterval);

        percentage = (100 - (timeRemaining * 100) / totalTime) / 100;
        progressBar.animate(percentage);
    }
};

const restartTimer = () => {
    const startButton = document.getElementById("start");
    progressBar.animate(0, {
        duration: 500,
    });
    startButton.innerText = "START";
    changeStartTime();
};

const finishedTimer = () => {
    timerHandler();
    const startButton = document.getElementById("start");
    startButton.innerText = "RESTART";
};

const formatTime = (time) => {
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) - hours * 60;
    let seconds = time - Math.floor(time / 60) * 60;

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    if (hours == 0 && minutes == 0) return `0:${seconds}`;

    if (hours == 0) return `${minutes}:${seconds}`;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}:${seconds}`;
};

const changeStartTime = () => {
    let seconds = document.getElementById("seconds");
    let minutes = document.getElementById("minutes");
    let hours = document.getElementById("hours");

    if (seconds.value >= 60) seconds.value = 59;
    else if (seconds.value < 0) seconds.value = 0;
    else if (seconds.value == "") seconds.value = 0;

    if (minutes.value >= 60) minutes.value = 59;
    else if (minutes.value < 0) minutes.value = 0;
    else if (minutes.value == "") minutes.value = 0;

    if (hours.value >= 24) hours.value = 23;
    else if (hours.value < 0) hours.value = 0;
    else if (hours.value == "") hours.value = 0;

    seconds = parseInt(seconds.value);
    minutes = parseInt(minutes.value);
    hours = parseInt(hours.value);

    minutes.value = minutes.value >= 60 ? 59 : minutes.value;
    hours.value = hours.value >= 24 ? 23 : hours.value;

    timeRemaining = seconds + minutes * 60 + hours * 60 * 60;
    totalTime = timeRemaining;

    remaining.innerText = formatTime(timeRemaining);

    percentage = (100 - (timeRemaining * 100) / totalTime) / 100;
    progressBar.animate(percentage);
};

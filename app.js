let timer;
let timeRemaining;

window.addEventListener("load", () => {
    const remaining = document.getElementById("remaining");
    const startButton = document.getElementById("start");

    startButton.addEventListener("click", timerHandler);

    let minutes = 1;
    timeRemaining = minutes * 60;

    remaining.innerText = formatTime(timeRemaining);
});

const timerHandler = () => {
    const startButton = document.getElementById("start");

    startButton.classList.toggle("active");

    if (startButton.classList.contains("active")) {
        startButton.innerText = "STOP";
        startButton.style.color = "#ec7676";
        timer = setInterval(() => {
            timeRemaining--;
            remaining.innerText = formatTime(timeRemaining);
            if (timeRemaining == 0) clearInterval(timeRemaining);
        }, 1000);
    } else {
        startButton.innerText = "START";
        startButton.style.color = "#777";
        clearInterval(timer);
    }
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

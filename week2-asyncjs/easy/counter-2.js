function showCurrentTime() {
    console.log(new Date());
    setTimeout(showCurrentTime, 1000);
}

setTimeout(showCurrentTime, 1000);

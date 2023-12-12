function showTime() {
    const currentDate = new Date();
    let currentTime =  currentDate.getHours() + 
                            ":" + currentDate.getMinutes() + 
                            ":" + currentDate.getSeconds();
    let amOrPM = currentDate.getHours() >= 12 ? "PM":"AM";  
    let currentTimeWithAMPM = (currentDate.getHours() > 12 ? currentDate.getHours() - 12 : currentDate.getHours()) + 
                                ":" + currentDate.getMinutes() + 
                                ":" + currentDate.getSeconds() + 
                                " " + amOrPM; 
    console.log(currentTime);
    console.log(currentTimeWithAMPM);
}

setInterval(showTime, 1000);
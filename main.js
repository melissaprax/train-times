$( document ).ready(function() {


var config = {
    apiKey: "AIzaSyDtONkpsekWi7yaJZlmjIawa7Sd_AATyXQ",
    authDomain: "march-24-2018.firebaseapp.com",
    databaseURL: "https://march-24-2018.firebaseio.com",
    projectId: "march-24-2018",
    storageBucket: "march-24-2018.appspot.com",
    messagingSenderId: "88829273038"
    };
      
firebase.initializeApp(config);

let trainData = firebase.database();

$("#add-train-btn").on("click", function() {
    let trainName = $("#train-name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let firstTrain = $("#first-train-input").val().trim();
    let frequency = $("#frequency-input").val().trim();

    let newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

    trainData.ref().push(newTrain);


    return false;
});

trainData.ref().on('child_added', function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
    let tName = childSnapshot.val().name;
    let tDestination = childSnapshot.val().destination; 
    let tFrequency = childSnapshot.val().frequency;
    let tFirstTrain = childSnapshot.val().firstTrain;

    let trainArr = tFirstTrain.split(":");
    let trainTime = moment().hours(trainArr[0]).minutes(timeArr[1]);
    let maxMoment = moment.max(moment(), trainTime);
    let tMinutes;
    let tArrival; 

    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else {
        //calculate minutes until arrival using math
        let differenceTimes = moment().diff(trainTime, "minutes");
        let tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        // calculate arrival time
        tArrival = moment().add(tMinutes, "m").format("mm:hh A");
    }

    $("#train-table > tbody").append("<tr><td>" + tName + "<tr><td>" + tDestination + "<tr><td>" + tFrequency + "<tr><td>" + tArrival + "<tr><td>" + tMinutes + "<tr><td>");

});



//document ready ends
});
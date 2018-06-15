//firebase link
var trainData = new Firebase("https://trainschduler.firebaseio.com/");

//button for adding trains
$('#submitButton').on('click', function(){
	//gets user input
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();

	//creates train place
	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		tfreq: frequency,
	}

	//uploads data to the database
	trainData.push(newTrains);

	//alert train added
	alert("Train successfully added!");

	//clears all of the text boxes
	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

//when a new item is added do this function
trainData.on("child_added", function(childSnapshot, prevChildKey){

	//store everything into a variable
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;

	// test train info
	// console.log(trainName);
	// console.log(destination);
	// console.log(firstTime);
	// console.log(frequency);

	//convert time 
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	// console.log(firstTimeConverted);

	//current time
	var currentTime = moment();
	// console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));


	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % frequency;
	var tMinutesTillTrain = frequency - tRemainder;
	

	//next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");

	//add each trains to table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
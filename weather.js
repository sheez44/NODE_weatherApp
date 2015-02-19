var http = require("https");
var API_KEY = ''; // Enter your forecast.io API KEY HERE

function printMessage(summary) {
  var message = "The weather is currently " + summary;
  console.log(message);
}

function printError(error) {
  console.error(error.message);
}

function getTemperature(latitude, longitude) {
	var connection = http.get("https://api.forecast.io/forecast/" + API_KEY + "/" + latitude + "," + longitude + "3?units=si", function(response) {
		var body = "";
		response.on("data", function(chunk) {
			body += chunk;
		});
		response.on("end", function() {
			if(response.statusCode == 200) {
				try {
					var weather = JSON.parse(body);
					printMessage(weather.currently.temperature)
				} catch (error) {
					printError(error);
				}
			} else {
				printError({message: "there was a problem getting the required data"})
			}
		});
	});
	connection.on("error", printError);
}

module.exports.getTemperature = getTemperature;

var Api = function () {

}

Api.prototype.callServer = function (callback, email) {

	console.log('Call Server');
	var request = new XMLHttpRequest();
	var url = 'https://person-stream.clearbit.com/v2/combined/find?cache=false&email='+email
	var params = '';

	request.open('GET', url, true);
	request.setRequestHeader('Content-type', 'application/json');
	request.setRequestHeader('Authorization', 'Basic {YOUR API KEY HERE}');

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		// Success!
		res = JSON.parse(request.responseText);
		callback(res);

	  } else {
		console.log('error API');
	  }
	};

	request.onerror = function() {
	  console.log('connexion error');
	};

	request.send();
}

Api.prototype.callClearbit = function () {


}

Api.prototype.callSegment = function () {

}

module.exports = function () {
	return new Api()
}

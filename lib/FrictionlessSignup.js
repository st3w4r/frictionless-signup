
var Display = require('./Display')

var FrictionlessSignup = function () {
	this.display = Display()
	this.data_form = {}
	this.metadata = {}
	this.discarded = false
}


FrictionlessSignup.prototype.getForm = function () {
	console.log('Get From');
	this.data_form = this.display.getAllFields();
	console.log(this.data_form);
}

FrictionlessSignup.prototype.getEmail = function () {
	console.log('Get Email');
}

FrictionlessSignup.prototype.callApi = function () {
	console.log('Call Api');
}

FrictionlessSignup.prototype.mapData = function () {
	console.log('Map Data');
}

FrictionlessSignup.prototype.prefill = function () {
	console.log('Prefill');
}

FrictionlessSignup.prototype.run = function () {
	this.getForm()
	this.getEmail()
	this.callApi()
	this.mapData()
	this.prefill()
}

module.exports = function () {
	return new FrictionlessSignup
}

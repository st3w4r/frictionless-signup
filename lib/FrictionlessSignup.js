
var FrictionlessSignup = function () {
	this.data_form = {}
	this.metadata = {}
	this.discarded = false
}


FrictionlessSignup.prototype.getForm = function () {
	console.log('Get From');

}

FrictionlessSignup.prototype.getEmail = function () {
	console.log('Get Email');
}

FrictionlessSignup.prototype.callApi = function () {
	console.log('Call Api');
}

FrictionlessSignup.prototype.prefill = function () {
	console.log('Prefill');
}

FrictionlessSignup.prototype.run = function () {
	this.getForm()
	this.getEmail()
	this.callApi()
	this.prefill()
}

module.exports = function () {
	return new FrictionlessSignup
}

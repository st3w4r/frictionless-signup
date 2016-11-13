
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
	console.log(this.data_form.email);
	var email = this.display.getUrlParameter('email');

	var selectorEmail = this.display.getSelectorWithName('email');

	this.display.setAllEmitter();
	// this.display.dispatchEventSelector(selectorEmail, 'email recived')
	// addEventListener('email', function () {
	// 	console.log('Email event focusout');
	// })
	// addEventListener('firstName', function () {
	// 	console.log('firstName vent focusout');
	// })

	console.log(email);
}

FrictionlessSignup.prototype.callApi = function () {
	console.log('Call Api');

	addEventListener('email focusout', function () {
		console.log('Email event focusout');
	})
}

FrictionlessSignup.prototype.mapData = function () {
	console.log('Map Data');
}

FrictionlessSignup.prototype.prefill = function () {
	console.log('Prefill');
}

FrictionlessSignup.prototype.run = function () {
	// Promise.then()
	this.getForm()
	this.getEmail()
	this.callApi()
	this.mapData()
	this.prefill()
}

module.exports = function () {
	return new FrictionlessSignup
}

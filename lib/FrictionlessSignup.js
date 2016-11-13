
var Helper = require('./Helper')
var Display = require('./Display')

var FrictionlessSignup = function () {
	this.helper = Helper()
	this.display = Display()
	this.data_form = {}
	this.metadata = {}
	this.discarded = false
}


FrictionlessSignup.prototype.getForm = function () {
	console.log('Get From');
	this.data_form = this.display.getAllFields();
	console.log(this.data_form);
	addEventListener('email valid', () => {

		console.log('email valid: ',this.data_form.email);

	})

	addEventListener('email invalid', () => {

		console.log('email invalid: ',this.data_form.email);

	})
}

FrictionlessSignup.prototype.getEmail = function () {

	console.log('Get Email');


	// Set all emitter focusout on frictionlessSelectos
	this.display.setAllEmitter();

	// Email available in the field
	addEventListener('email available', () => {
		console.log('Email event available');

		if (this.helper.checkEmail(this.data_form.email) === true) {
			this.display.dispatchEventSelector('email valid')
		} else {
			this.display.dispatchEventSelector('email invalid')
		}
	})

	// Event listener
	addEventListener('email focusout', () => {
		console.log('Email event focusout');

		var selectorEmail = this.display.getSelectorWithName('email')
		var email = this.display.getDataField(selectorEmail)

		console.log(email);

		this.data_form.email = email
		this.display.dispatchEventSelector('email available')
	})

	// Prefill email from url
	addEventListener('email url', () => {
		console.log('Email event url');

		var selectorEmail = this.display.getSelectorWithName('email');

		this.display.setDataField(selectorEmail, this.data_form.email)
		this.display.dispatchEventSelector('email available')
	})




	// console.log(this.data_form.email);
	// console.log(email);
	// var selectorEmail = this.display.getSelectorWithName('email');
	// this.display.setDataField(selectorEmail, email)

	// Get email from URL
	this.data_form.email = this.display.getUrlParameter('email');
	if (this.data_form.email)
		this.display.dispatchEventSelector('email url')


	// this.display.dispatchEventSelector(selectorEmail, 'email recived')
	// addEventListener('email', function () {
	// 	console.log('Email event focusout');
	// })
	// addEventListener('firstName', function () {
	// 	console.log('firstName vent focusout');
	// })


	console.log(this.data_form.email);
}

FrictionlessSignup.prototype.callApi = function () {
	console.log('Call Api');

	addEventListener('email valid', () => {

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

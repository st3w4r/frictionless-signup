
var Helper = require('./Helper')
var Display = require('./Display')
var Api = require('./Api')

var FrictionlessSignup = function () {
	this.helper = Helper()
	this.display = Display()
	this.api = Api()
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

	// When the email is valid call the API
	addEventListener('email valid', () => {
		this.callApi()
	})

	// Email available in the field
	addEventListener('email available', () => {
		console.log('Email event available');

		if (this.helper.checkEmail(this.data_form.email) === true) {
			this.display.dispatchEventGlobal('email valid')
		} else {
			this.display.dispatchEventGlobal('email invalid')
		}
	})

	// Event listener
	addEventListener('email focusout', () => {
		console.log('Email event focusout');

		var selectorEmail = this.display.getSelectorWithName('email')
		var email = this.display.getDataField(selectorEmail)

		console.log(email);

		this.data_form.email = email
		this.display.dispatchEventGlobal('email available')
	})

	// Prefill email from url
	addEventListener('email url', () => {
		console.log('Email event url');

		var selectorEmail = this.display.getSelectorWithName('email');

		this.display.setDataField(selectorEmail, this.data_form.email)
		this.display.dispatchEventGlobal('email available')
	})




	// console.log(this.data_form.email);
	// console.log(email);
	// var selectorEmail = this.display.getSelectorWithName('email');
	// this.display.setDataField(selectorEmail, email)

	// Get email from URL
	this.data_form.email = this.display.getUrlParameter('email');
	if (this.data_form.email)
		this.display.dispatchEventGlobal('email url')


	// this.display.dispatchEventGlobal(selectorEmail, 'email recived')
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

	this.api.callServer((res) => {
		console.log(res);
		this.mapData(res)
	}, this.data_form.email)

}

FrictionlessSignup.prototype.mapData = function (data) {
	console.log('Map Data');

	console.log(this.data_form);
	this.data_form.firstName = data.person.name.givenName
	this.data_form.lastName = data.person.name.familyName
	this.data_form.fullName = data.person.name.fullName
	this.data_form.companySize = data.company.metrics.employees
	this.data_form.companyName = data.company.name
	this.data_form.jobTitle = data.person.employment.role

	this.prefill()
}

FrictionlessSignup.prototype.prefill = function () {
	console.log('Prefill');

	console.log(this.data_form);
	this.display.setAllFields(this.data_form)
}

FrictionlessSignup.prototype.run = function () {
	// Promise.then()
	this.getForm()
	this.getEmail()
	// this.callApi()
	// this.mapData()
	// this.prefill()
}

module.exports = function () {
	return new FrictionlessSignup
}

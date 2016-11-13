
var Helper = require('./Helper')
var Mapper = require('./Mapper')
var Display = require('./Display')
var Api = require('./Api')

var FrictionlessSignup = function () {
	this.helper = Helper()
	this.mapper = Mapper()
	this.display = Display()
	this.api = Api()
	this.data_form = {}
	this.metadata = {}
	this.discarded = false
}

FrictionlessSignup.prototype.setEvents = function () {

	// Set all emitter focusout on frictionlessSelectos
	this.display.setAllEmitter();

	// Add all events listenners
	addEventListener('email valid', () => {

		console.log('email valid: ',this.data_form.email);

	})

	addEventListener('email invalid', () => {

		console.log('email invalid: ',this.data_form.email);

	})

	// Event listener
	addEventListener('email focusout', () => {
		console.log('Email event focusout');

		var selectorEmail = this.display.getSelectorWithName('email')
		var email = this.display.getDataField(selectorEmail)

		console.log(email);

		this.data_form.email = email
		this.emailAvailable()
	})

}

FrictionlessSignup.prototype.emailAvailable = function () {

	if (this.helper.checkEmail(this.data_form.email) === true) {
		this.display.dispatchEventGlobal('email valid')
		this.callApi()
	} else {
		this.display.dispatchEventGlobal('email invalid')
	}
}


FrictionlessSignup.prototype.getForm = function () {
	console.log('Get From');
	this.data_form = this.display.getAllFields();
	console.log(this.data_form);
}

FrictionlessSignup.prototype.getEmail = function () {

	console.log('Get Email');

	// Get email from URL
	this.data_form.email = this.display.getUrlParameter('email');
	if (this.data_form.email) {
		var selectorEmail = this.display.getSelectorWithName('email');
		this.display.setDataField(selectorEmail, this.data_form.email)
		this.emailAvailable()
	}

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

	console.log('Data_form: ', this.data_form);
	// console.log(data);
	this.data_form = this.mapper.mapData(this.data_form, data)
	// console.log('Mapper:', this.mapper.mapData(this.data_form, data));
	// this.data_form.firstName = data.person.name.givenName
	// this.data_form.lastName = data.person.name.familyName
	// this.data_form.fullName = data.person.name.fullName
	// this.data_form.companySize = data.company.metrics.employees
	// this.data_form.companyName = data.company.name
	// this.data_form.jobTitle = data.person.employment.role

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
	this.setEvents()
	this.getEmail()
	// this.callApi()
	// this.mapData()
	// this.prefill()
}

module.exports = function () {
	return new FrictionlessSignup
}

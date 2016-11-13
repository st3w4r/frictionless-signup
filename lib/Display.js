
/**
* Display file contain all interactions with the view.
* I/O file
*/

var Display = function () {
	this.frictionlessSelectos = {}
}

Display.prototype.getUrlParameter = function (sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
	  sParameterName = sURLVariables[i].split('=');

	  if (sParameterName[0] === sParam) {
		return sParameterName[1] === undefined ? true : sParameterName[1];
	  }
	}
}

Display.prototype.getDataField = function (selector) {

	var data = this.fieldIsEmpty(selector) === true ? null : selector.value

	return data
}

Display.prototype.getKeyField = function (selector) {

	var key = selector.getAttribute('frictionless')

	return key
}

Display.prototype.getSelectorWithName = function (name) {

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var selector = this.frictionlessSelectos[i];
		var key = selector.getAttribute('frictionless')

		if (key === name)
			return selector
	}

	return null
}

Display.prototype.setDataField = function (selector, value) {

	if (this.fieldIsEmpty(selector) === true) {
		selector.value = value
	}
	// Emit an message
}

Display.prototype.fieldIsEmpty = function (selector) {
	var empty = true;

	if (selector.value)
		empty = selector.value.length === 0 ? true : false
	return empty
}

/**
* Get all fields on the document with selector frictionless and return an object
*/

Display.prototype.getAllFields = function () {

	var frictionlessData = {};

	this.frictionlessSelectos = document.querySelectorAll('[frictionless]')

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var key = this.getKeyField(this.frictionlessSelectos[i])
		var data = this.getDataField(this.frictionlessSelectos[i])
		console.log(key);
		console.log(data);
		// Object.assign(frictionlessData, { key: key, data: data })
		// frictionlessData.push({ key: key, data: data })
		// frictionlessData.push({ key: key, data: data })
		frictionlessData[key] = data;
	}
console.log(frictionlessData);
	return frictionlessData
}

Display.prototype.setAllFields = function (data_form) {

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var selector = this.frictionlessSelectos[i]
		var key = this.getKeyField(selector)
		var data = this.getDataField(selector)
		console.log('Data_form: ', data_form);
		console.log('Key: ', key);
		if (this.fieldIsEmpty(selector))
			this.setDataField(selector, data_form[key])
		else
			console.log('Field filled per the user');

	}
}

// Display.prototype.setAllListenner = function (allFields) {
//
// 	for (var i = 0; i < allFields.length; i++) {
//
// 		var field = allFields[i];
//
//
//
// 	}
//
// };

// Add on all fields the onfocus emmitter

Display.prototype.setAllEmitter = function () {

	for (var i = 0; i < this.frictionlessSelectos.length; i++) {

		var field = this.frictionlessSelectos[i];

		this.setEmitter(field);

	}

};


// Add an listener on all frictionlessSelectos, to autofill when the data is available

Display.prototype.setListenerSelector = function (selector, name, func) {
	selector.addEventListener(name, func)
}

// Send an event when the user focus out, with name 'focusout'

Display.prototype.dispatchEventGlobal = function (name) {

	var event = new Event(name)

	dispatchEvent(event)
}

Display.prototype.setEmitter = function (selector) {

	var name = this.getKeyField(selector)
	var self = this;
	this.setListenerSelector(selector, 'focusout', function () {
		self.dispatchEventGlobal(name + ' ' + 'focusout')
	})
}

module.exports = function () {
	return new Display
}

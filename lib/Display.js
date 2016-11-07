
/**
* Display file contain all interactions with the view.
* I/O file
*/

var Display = function () {
	this.frictionlessSelectos = {}
}

Display.prototype.getUrlParameter = function () {

}

Display.prototype.getDataField = function (selector) {
	var data = {}

	var key = selector.getAttribute('frictionless')

	data[key] = this.fieldIsEmpty(selector) === true ? null : selector.value

	return data
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

		var data = this.getDataField(this.frictionlessSelectos[i])

		Object.assign(frictionlessData, data)
	}

	return frictionlessData
}

Display.prototype.setListener = function () {

}

Display.prototype.setEmitter = function () {

}

module.exports = function () {
	return new Display
}

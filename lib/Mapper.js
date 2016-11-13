var Helper = require('./Helper')

var Mapper = function () {
	this.helper = Helper()
}

Mapper.prototype.mapData = function (dataForm, dataApi) {
	var mappedData = {}

	// console.log('dataForm:', dataForm);
	for (var key in dataForm) {
		// console.log('Key: ',key);
		// console.log('value =>: ',dataForm[key]);
		// console.log('dataApi: ',dataApi);
		var sourceData = this.helper.objectByString(dataApi, key);

		mappedData[key] = (sourceData) ? sourceData : null;
	}
	return mappedData;

	// if (data.indexOf('.') !== -1) {
		// composedData = data.split('.');
		// console.log(jsonPathString);

	// return Helper.objectByString(dataApi, jsonPathString)
	// Return clearbit value in JSON based on data-clearbit value
	// and has child and grand-child keys

	// for (var i = 0; i < composedData.length)
	//
	//
	// 	if (composedData.length === 2) {
	// 	return val = clearbit[composedData[0]][composedData[1]];
	// 	} else if (composedData.length === 3) {
	// 	return val = clearbit[composedData[0]][composedData[1]][composedData[2]];
	// 	}
	//
	// }
	// If level one data (e.g "name")
	// else {
	//   return val = clearbit[data];
	// }
}

Mapper.prototype.customMapper = function () {

}

module.exports = function () {
	return new Mapper()
}

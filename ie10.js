(function () {
	"use strict";

	if (!Element.dataset && !Element.prototype.dataset) {

		Object.defineProperty (Element.prototype, 'dataset', {
			get: function () {
				var data = {},
				    attrs = this.attributes,
				    self = this;

				for (var i = 0, l = attrs.length; i < l; ++i) {
					var attr = attrs[i],
					    name = attr.name;

					if (!name || !/^data\-.*/.test(name))
						continue;

					(function (name, value) { 
						Object.defineProperty(data, name.substr(name.indexOf('-') + 1), {
							get: function () { return self.getAttribute(name); },
							set: function (v) {
								self.setAttribute(name, v);
							},
							enumerable: true,
							configurable: false
						});
					})(name, attr.value)

				}

				return data;
			},
			
			// set: function (data) {

			// 	if (typeof data !== 'object')
			// 		throw "Incorrect type of data set, must be an Object";

			// 	var attrs = this.attributes;

			// 	for (var i = 0; i < attrs.length; ++i) {
			// 		var name = attrs[i].name;

			// 		if (!name || !/^data\-.*/.test(name))
			// 			continue;

			// 		this.removeAttribute(name);
			// 		--i;
			// 	}

			// 	for (var key in data)
			// 		this.setAttribute(['data', key].join('-'), data[key]);
			// },
			enumerable: true,
			configurable: false
		});
	}
})()
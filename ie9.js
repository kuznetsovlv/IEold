(function () {
	"use strict";

	/*To support IE 9 we nead the classList property of Element*/
	function ClassList (e) {

		this.e = e;

		this.length = 0;

		var list = e.className.split(' ');
		for (var i = 0, l = list.length; i < l; ++i) {
			var cls = list[i];
			if (cls)
				Array.prototype.push.call(this, cls);
		}
	}

	/*In our progect we nead only add and remove methods, and ofcourse some Array's methods to it work*/
	Object.defineProperties(ClassList.prototype, {
		add: {
			value: function (token) {
				token = token.toLowerCase();

				for (var i = 0; i < this.length; ++i)
					if (token === this[i])
						return;

				this.push(token)

				this.e.className = this.join(' ');
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		contains: {
			value: function (token) {
				token = token.toLowerCase();
				for (var i = 0; i < this.length; ++i)
					if (token === this[i])
						return true;
				return false;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},

		item: {
			value: function (index) {
				return this[index] || null;
			},
			writable: false,
			enumerable: false,
			configurable: false
		},

		join: {
			value: Array.prototype.join,
			writable: false,
			enumerable: false,
			configurable: false
		},
		remove: {
			value: function (token) {

				token = token.toLowerCase();

				for (var i = 0; i < this.length; ++i)
					if (this[i] === token) {
						this.splice(i, 1);
						--i;
					}

				this.e.className = this.join(' ');
			},
			writable: false,
			enumerable: false,
			configurable: false
		},
		push: {
			value: Array.prototype.push,
			writable: false,
			enumerable: false,
			configurable: false
		},
		splice: {
			value: Array.prototype.splice,
			writable: false,
			enumerable: false,
			configurable: false
		},

		toggle: {
			value: function (token) {
				if (this.contains(token))
					this.remove(token);
				else
					this.add(token);

				return this.contains(token);
			},
			writable: false,
			enumerable: false,
			configurable: false
		}
	});

	/*Expanding Element*/
	Object.defineProperties(Element.prototype, {
		classList: {
			get: function () {
				return new ClassList(this);
			}
		}
	});
})();
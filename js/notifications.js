(function(w) {
	// Polyfill for classList in older browsers
	if ("document" in self && !("classList" in document.createElement("_"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var	classListProp = "classList", 
				protoProp = "prototype", 
				elemCtrProto = view.Element[protoProp], 
				objCtr = Object, 
				strTrim = String[protoProp].trim || function () {
					return this.replace(/^\s+|\s+$/g, "");
				}, 
				arrIndexOf = Array[protoProp].indexOf || function (item) {
					var i = 0, 
						len = this.length;
					for (; i < len; i++) {
						if (i in this && this[i] === item) {
							return i;
						}
					}
					return -1;
				}, 
				DOMEx = function (type, message) {
					this.name = type;
					this.code = DOMException[type];
					this.message = message;
				}, 
				checkTokenAndGetIndex = function (classList, token) {
					if (token === "") {
						throw new DOMEx(
							"SYNTAX_ERR"
							, "An invalid or illegal string was specified"
						);
					}
					if (/\s/.test(token)) {
						throw new DOMEx(
							"INVALID_CHARACTER_ERR"
							, "String contains an invalid character"
						);
					}
					return arrIndexOf.call(classList, token);
				}, 
				ClassList = function (elem) {
					var	trimmedClasses = strTrim.call(elem.getAttribute("class") || ""), 
						classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [], 
						i = 0, 
						len = classes.length;
					for (; i < len; i++) {
						this.push(classes[i]);
					}
					this._updateClassName = function () {
						elem.setAttribute("class", this.toString());
					};
				}, classListProto = ClassList[protoProp] = [], 
				classListGetter = function () {
					return new ClassList(this);
				};
			
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var	tokens = arguments, 
					i = 0, 
					l = tokens.length, 
					token, 
					updated = false;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				}
				while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var	tokens = arguments, 
					i = 0, 
					l = tokens.length,
					token, 
					updated = false;
				do {
					token = tokens[i] + "";
					var index = checkTokenAndGetIndex(this, token);
					if (index !== -1) {
						this.splice(index, 1);
						updated = true;
					}
				}
				while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var	result = this.contains(token), 
					method = result ? force !== true && "remove" : force !== false && "add";

				if (method) {
					this[method](token);
				}

				return !result;
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
						get: classListGetter, 
						enumerable: true,
						configurable: true
					};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) { // IE 8 doesn't support enumerable:true
					if (ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		}(self));
	}
	
	var Notification = {
	
		// Array of the different types of notification. E.G. error.
		_types: [
			{
				name: "error",
				cssClass: "notification-error"
			},
			{
				name: "success",
				cssClass: "notification-success"
			},
			{
				name: "warning",
				cssClass: "notification-warning"
			},
			{
				name: "info",
				cssClass: "notification-info"
			}
		],
		
		// Array of the different styles of animation. E.G. corner.
		_styles: [
			{
				name: "corner",
				cssClass: "notification-corner",
				animIn: "notification-corner-in",
				animOut: "notification-corner-out"
			}
		],
		
		// Number to keep the currently amount of notifications
		// that are active.
		_numActive: 0,
		
		// An array to store notifications - this allows them to
		// be used more than once.
		_notifications: [],
		
		// This is a function that will create a new notification.
		// When using this you parse it a type you want to use,
		// the title of the notification, the body content of the
		// notification the style you want to use.
		create: function(name, title, message, style, type) {
		
		},
		
		// This is a function that will remove a notification object.
		// Note: this will mean the notification is no longer available
		// to call. When using this function you need to parse the name
		// of the notification you want to remove.
		remove: function(name) {
			
		},
		
		// This is a function that allows the user to create a new type
		// of notification. When creating one you provide the name of the
		// type, the css class to represent the type.
		addType: function(name, cssClass) {
			
		},
		
		// This is a function that allows the user to create a new style
		// of notification. When creating one you provide the name of the
		// style, the css class to represent the style, the two
		// css classes for the animation in and out of view.
		addStyle: function(name, cssClass, animIn, animOut) {
			
		},
		
		// This function will return the number of currently active notifications
		// this will return a number representing the amount that are visible to the
		// user.
		currentlyActive: function() {
			return parseInt(this._numActive);
		},
		
		// This function will return an array with the name of each notification that
		// is available to be called.
		availableNotifications: function() {
			return this._notifications;
		}
		
	};
	
})(window);
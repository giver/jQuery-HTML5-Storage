/*
 * jQuery HTML5 Storage
 * Author: Tanin Srivaraphong
 * Version: 0.0.2
 * Date: 30 Mar 2011
 *
 * Original coder: Dave Schindler (http://sites.google.com/site/daveschindler/jquery-html5-storage-plugin)
 *
 * Distributed under the MIT License
 *
 * Copyright (c) 2011 Tanin Srivaraphong
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function( $ ) {
	"use strict";    
	var isLocalStorage = typeof window.localStorage !== 'undefined';
	var type = 'local';
	var storage = window[type + 'Storage'];
	
	// LocalStorage functions
	var setData = function (key, value) {	
		return storage.setItem(key, value)
	};
	
	var getData = function (key) {
		return storage.getItem(key);
	};
	
	var deleteData = function () {
		return storage.clear();
	};
	
	// Cookie functions
	var setCookie = function (key, value, days) {
		var date = new Date();
		
		if (typeof(days) === "undefined") {
			days = 1;
		}
		
		date.setTime(date.getTime() + days*24*60*60*1000);
		var expires = "; expires = " + date.toGMTString();
		if (typeof key === "string" && typeof value === "undefined") {
			document.cookie = key + "=" + value + expires + "; path=/";
		} else if (typeof key === "object" && typeof value === "undefined") {
			for (var prop in key) {				
				// check if _key_ has property name _prop_
				// Ex. 
				// student.name = 'test'
				// student.hashOwnProperty('name') => true
				if (key.hasOwnProperty(prop)) {
					document.cookie = prop + "=" + key[prop] + expireDate + "; path=/";
				}
			}
			return true;
		}
		return false;
	};
	
	var readCookie = function (key) {
		var keyName = key + "=";	// firstname=
		var keyList = document.cookie.split(';');	// firstname=test;lastname=test2
		for (var i = 0; i < keyList.length; i++) {
			var currentKey = keyList[i];
			while (currentKey.charAt(0) === ' ') {
				currentKey = currentKey.substring(1, currentKey.length);
			}
			if (currentKey.indexOf(keyValue) === 0) {
				return currentKey.substring(keyName.length, currentKey.length);
			}
		}
		return null;
	};
	
	var deleteCookie = function (key) {
		setCookie(key, "", -1);
	};
	
	
	/**
	* Public API
	* $.storage - Represents the user's data store, whether it's cookies or local storage.
	* $.storage.set("name", "value") - Stores a named value in the data store.
	* $.storage.set({"name1":"value1", "name2":"value2", etc}) - Stores multiple name/value pairs in the data store.
	* $.storage.get("name") - Retrieves the value of the given name from the data store.
	* $.storage.remove("name") - Permanently deletes the name/value pair from the data store.
	*/
	$.extend({
		storage : {
			set: isLocalStorage ? setData : setCookie,
			get: isLocalStorage ? getData : getCookie,
			remove: isLocalStorage ? deleteData : deleteCookie
		}
	}); 
	
})( jQuery );
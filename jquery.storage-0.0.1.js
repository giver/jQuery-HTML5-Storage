/*
 * jQuery HTML5 Storage
 * Author: Tanin Srivaraphong
 * Version: 0.0.1
 * Date: 30 Mar 2011
 */
(function( $ ) {
    
	var is_local_storage = typeof window.localStorage!=='undefined';
	var type = 'local';
	var storage = window[type + 'Storage'];

	function set_data(key, value) {
		return storage.setItem(key, value)
	}
	
	function get_data(key) {
		return storage.getItem(key);
	}
	
	function delete_data() {
		return storage.clear();
	}
	
	$.extend({
		storage : {
			set: is_local_storage ? set_data : null,
			get: is_local_storage ? get_data : null,
			remove: is_local_storage ? delete_data : null
		}
	}); 
	
})( jQuery );
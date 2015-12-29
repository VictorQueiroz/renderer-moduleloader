function Registry(injector) {
	this.injector = injector;
}

Registry.prototype = {
	$$get: function(name) {
		if(this.injector.pending.hasOwnProperty(name) || this.injector.cache.hasOwnProperty(name)) {
			return this.injector.get(name);
		}
	}
}
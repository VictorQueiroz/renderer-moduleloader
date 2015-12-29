function Registry(injector) {
	this.injector = injector;
}

Registry.prototype = {
	$$get: function(name) {
		return this.injector.get(name);
	}
}
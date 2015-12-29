function Registry(injector) {
	this.injector = injector;
}

Registry.prototype = {
	$$get: function(name) {
		name = name + 'Directive';
		
		if(this.injector.has(name)) {
			return this.injector.get(name);
		}
	}
}
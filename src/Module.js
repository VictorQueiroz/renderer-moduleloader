var directives = {};
var Module = moduleloader.Module;

Module.prototype.directive = renderer.register = function(name, factory) {
	var module = this,
			service = this && this.service && bind(this.service, this) || registerService;

	if(!directives.hasOwnProperty(name)) {
		directives[name] = [];

		service(name + 'Directive', function() {
			var data,
					options,
					directive,
					instances = [];

			forEach(directives[name], function(factory, index) {
				// If it doesn't found any invoke function on module
				// fallback into the renderer global injector.
				data = (module.invoke || renderer.injector.invoke)(factory);
				options = {};

				if(isFunction(data)) {
					options.compile = lazy(data);
				} else if (!data.compile && data.link) {
					options.compile = lazy(data.link);
				} else if (!data.compile && !data.link) {
					data.compile = noop;
				}

				if(isObject(data)) {
					extend(options, data);
				}

				defaults(options, {
					priority: 0,
					index: index,
					name: name,
					restrict: 'EA'
				});

				defaults(options, {
					require: (options.controller && options.name)
				});

				directive = extend(options, {
					name: name
				});

				instances.push(directive);
			});

			return instances;
		});
	}

	directives[name].push(factory);

	return this;
};

var oldDirectivesNames = Object.keys(oldRegistry);

oldDirectivesNames.forEach(function(name) {
	var registry = oldRegistry[name];

	if(name !== '$$get' && !registry.executed) {
		registry.directives.forEach(function(factory) {
			renderer.register(name, factory);
		});
	}
});
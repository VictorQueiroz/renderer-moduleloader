var directives = {};
var Module = moduleloader.Module;

function Directive(name, options) {
	if(name) {
		this.name = name;
	}

	if(isObject(options)) extend(this, options);
}

Module.prototype.directive = function(name, factory) {
	var module = this;

	if(!directives.hasOwnProperty(name)) {
		directives[name] = [];

		this.service(name + 'Directive', function() {
			var directives = this.directives;
			var data,
					options,
					directive,
					instances = [];

			forEach(directives[name], function(factory, index) {
				data = module.invoke(factory);
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

				directive = new Directive(name, options);
				instances.push(directive);
			});

			return instances;
		});
	}

	directives[name].push(factory);

	return this;
};
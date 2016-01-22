var pending = {},
		cache = {},
		injector = new Injector(pending, cache),
		registry = new Registry(injector);

var oldRegistry = renderer.registry;

var moduleLoader = new moduleloader.ModuleLoader(injector);

cache.compile = renderer.compile;

renderer.module = function(name, deps) {
	var module = moduleLoader.register.apply(moduleLoader, arguments);

	if(!module.invoke) {
		module.invoke = function(fn) {
			return injector.invoke(fn);
		};
	}

	return module;
};

function registerService(name, factory) {
	pending[name] = factory;
}

renderer.injector = injector;
renderer.moduleLoader = moduleLoader;
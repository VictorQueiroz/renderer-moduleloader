var pending = {},
		cache = {},
		injector = new injector.Injector(pending, cache),
		registry = new Registry(injector),
		bootstrap = renderer.bootstrap;

renderer._registry = registry;

var moduleLoader = new moduleloader.ModuleLoader(injector);

function compile(element) {
	var compile = new Compile(element, registry);

	return function(scope) {
		return compile.execute(scope);
	};
}

cache.compile = renderer.compile = compile;

renderer.module = function(name, deps) {
	var module = moduleLoader.register.apply(moduleLoader, arguments);

	if(!deps) {
		module.invoke = function(fn) {
			return injector.invoke(fn);
		};
	}

	return module;
};

renderer.bootstrap = function(element, name) {
	moduleLoader.bootstrap(name);

	bootstrap(element);
};

renderer.register = function(name, factory) {
	pending[name] = factory;

	return renderer;
};

renderer.injector = injector;
renderer.moduleLoader = moduleLoader;
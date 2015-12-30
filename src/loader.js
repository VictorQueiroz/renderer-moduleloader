var pending = {},
		cache = {},
		injector = new Injector(pending, cache),
		registry = new Registry(injector),
		bootstrap = renderer.bootstrap;

var oldRegistry = renderer._registry;

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

	if(!module.invoke) {
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

function registerService(name, factory) {
	pending[name] = factory;
}

renderer.injector = injector;
renderer.moduleLoader = moduleLoader;
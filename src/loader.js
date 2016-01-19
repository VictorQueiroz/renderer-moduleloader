var pending = {},
		cache = {},
		injector = new Injector(pending, cache),
		registry = new Registry(injector);

var oldRegistry = renderer._registry;

renderer._registry = registry;

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

renderer.beforeCompile(function(rootScope, element, name) {
	renderer.module(name).service('rootScope', function() {return scope;});
	moduleLoader.bootstrap(name);
});

function registerService(name, factory) {
	pending[name] = factory;
}

renderer.injector = injector;
renderer.moduleLoader = moduleLoader;
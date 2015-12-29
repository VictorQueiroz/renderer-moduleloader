describe('ModuleLoader', function() {
	describe('bootstrap()', function() {
		var injector,
				moduleLoader;

		beforeEach(function() {
			injector = new Injector();
			moduleLoader = new ModuleLoader(injector);

			var register = ModuleLoader.prototype.register;
			moduleLoader.register = function() {
				var module = register.apply(this, arguments);

				if(!module.invoke) {
					module.invoke = function(fn) {
						return injector.invoke(fn);
					};
				}

				return module;
			};
		});

		it('should bootstrap modules directives and define them in the injector', function() {
			var compileDirectiveFunction = function(scope, el) {
				el.innerHTML = someServiceHere(el.innerHTML, ' {{ exp }}')
			};

			var HtmlDirective = function(someServiceHere) {
				return {
					compile: compileDirectiveFunction
				};
			};

			var SomeServiceFactory = function() {
				return function addAtTheEnd(string, text) {
					return (string + text);
				};
			};

			moduleLoader.register('app', ['appDep']).service('someServiceHere', SomeServiceFactory);
			moduleLoader.register('appDep', ['directivesDeps']);
			moduleLoader.register('directivesDeps', []).directive('html', HtmlDirective);

			moduleLoader.bootstrap('app');

			injector.invoke(function(htmlDirective, someServiceHere) {
				expect(htmlDirective[0].compile).toBe(compileDirectiveFunction);
			});
		});
	});
});
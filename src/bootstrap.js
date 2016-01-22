var compile = renderer.compile;

function bootstrap(element, name) {
	var scope = renderer.scope || new renderer.Scope();

	renderer.module(name).service('rootScope', constant(scope));
	moduleLoader.bootstrap(name);

	compile(element)(scope);
}

extend(renderer, { bootstrap: bootstrap });
describe('moduleloader', function() {
	it('should bootstrap the application', function() {
		var node = document.createElement('div');

		renderer.module('app', []);
		renderer.bootstrap(node, 'app');
	});
});
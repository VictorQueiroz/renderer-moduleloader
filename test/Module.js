describe('Module', function(){
	describe('directive()', function() {
		var i = 0, factory;

		beforeEach(function() {
			factory = lazy({});
		});

		afterEach(function() {
			i++;
		});

		it('should define a directive as a service with "Directive" suffix', function() {
			renderer.module(i, []).directive('test', factory);

			expect(renderer.module(i).blocks.services[0]).toBe('testDirective');
			expect(renderer.module(i).blocks.services[1] instanceof Function === true).toBeTruthy();
		});

		it('should fill the injector with the directives', function() {
			renderer.module(i, []);

			for(var j = 0; j < 10; j++) {
				for(var h = 0; h < 10; h++) {
					renderer.module(i).directive(j, factory);
				}
			}

			renderer.module(i).boot(renderer.injector);

			for(var j = 0; j < 10; j++) {
				expect(renderer.injector.get(j + 'Directive').length).toEqual(10);
			}
		});
	});
});
describe('Registry', function() {
	describe('$$get()', function() {
		it('should return "undefined" when not find the directive', function() {
			expect(renderer._registry.$$get('someUnexistentDirective')).toBeUndefined();
		});
	});
});
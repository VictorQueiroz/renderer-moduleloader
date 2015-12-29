# renderer-moduleloader

### Dependencies
- [renderer](https://github.com/VictorQueiroz/renderer)
- [moduleloader](https://github.com/VictorQueiroz/moduleloader)
- [injection](https://github.com/VictorQueiroz/injector)

### Usage
```js
renderer.module('app', []);
renderer.module('app').directive('input', function InputDirective(compile) {
	return function(scope, node) {
		node.addEventListener('change', function() {
			scope.apply(function() {
				console.log('Scope updated!');
			});
		});
	};
});
```
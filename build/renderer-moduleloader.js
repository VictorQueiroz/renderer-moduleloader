!function(){function e(e){return function(){return e}}function r(e,r,n){var t;if(d(e))for(o=0,t=e.length;t>o;o++)r.call(n,e[o],o,e);else{var o,i,u,c=Object.keys(e),l=c.length;for(o=0;l>o;o++)i=c[o],u=e[i],r.call(n,u,i,e)}return e}function n(e){return"function"==typeof e}function t(){return e()}function o(e){return null!==e&&"object"==typeof e}function i(e){e||(e={});var r,n,t,i,l,f,a,p=u(arguments).slice(1).filter(c),s=p.length;for(f=0;s>f;f++)if((r=p[f])&&o(r))for(t=Object.keys(r),l=t.length,a=0;l>a;a++)i=t[a],n=r[i],e[i]=n;return e}function u(e){return Array.prototype.slice.apply(e)}function c(e){return l(e)===!1}function l(e){return"undefined"==typeof e}function f(e,r){var n,t,o,i=Object.keys(r),u=i.length;for(n=0;u>n;n++)t=i[n],o=r[t],e.hasOwnProperty(t)||(e[t]=o)}function a(e,r){e&&(this.name=e),o(r)&&i(this,r)}function p(e){this.injector=e}function s(e){var r=new v(e,j);return function(e){return r.execute(e)}}var d=Array.isArray,v=renderer.Compile,y={},m=moduleloader.Module;m.prototype.directive=function(u,c){var l=this;y.hasOwnProperty(u)||(y[u]=[],this.service(u+"Directive",function(){var c,p,s,d=this.directives,v=[];return r(d[u],function(r,d){c=l.invoke(r),p={},n(c)?p.compile=e(c):!c.compile&&c.link?p.compile=e(c.link):c.compile||c.link||(c.compile=t),o(c)&&i(p,c),f(p,{priority:0,index:d,name:u,restrict:"EA"}),f(p,{require:p.controller&&p.name}),s=new a(u,p),v.push(s)}),v})),y[u].push(c)},p.prototype={$$get:function(e){return this.injector.get(e)}};var h={},g={},k=new k.Injector(h,g),j=new p(k),b=renderer.bootstrap;renderer._registry=j;var w=new moduleloader.ModuleLoader(k);g.compile=renderer.compile=s,renderer.module=function(e,r){var n=w.register.apply(w,arguments);return r||(n.invoke=function(e){return k.invoke(e)}),n},renderer.bootstrap=function(e,r){w.bootstrap(r),b(e)},renderer.register=function(e,r){return h[e]=r,renderer},renderer.injector=k,renderer.moduleLoader=w}();
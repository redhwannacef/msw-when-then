(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{70:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(2),a=n(6),o=(n(0),n(78)),c={id:"features_mock-chaining",title:"Mock Chaining",slug:"/features/mock-chaining"},i={unversionedId:"features_mock-chaining",id:"features_mock-chaining",isDocsHomePage:!1,title:"Mock Chaining",description:"There are often scenarios where you may make the same call to the same api and expect different results, this is where mock chaining comes in.",source:"@site/docs/features_mock-chaining.md",slug:"/features/mock-chaining",permalink:"/msw-when-then/docs/features/mock-chaining",editUrl:"https://github.com/redhwannacef/msw-when-then/edit/master/docs/docs/features_mock-chaining.md",version:"current",sidebar:"someSidebar",previous:{title:"Mocking",permalink:"/msw-when-then/docs/features/mocking"},next:{title:"Custom Resolvers",permalink:"/msw-when-then/docs/features/custom-resolvers"}},s=[{value:"Examples",id:"examples",children:[]}],u={rightToc:s};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"There are often scenarios where you may make the same call to the same api and expect different results, this is where mock chaining comes in.\nIn ",Object(o.b)("inlineCode",{parentName:"p"},"msw-when-then"),", the requests are returned in order of calls with the last defined mock returning on all subsequent requests."),Object(o.b)("h2",{id:"examples"},"Examples"),Object(o.b)("p",null,"You may have auto retry functionality and you want to test that your if the first api call fails and the second succeeds, the user does not see anything out of the ordinary:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'when(get("https://some.url"))\n  .thenReturn(badRequest({ response: "first request" }))\n  .thenReturn(ok({ response: "subsequent requests" }));\n')),Object(o.b)("p",null,"Another scenario is simply adding to a list."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),'when(post("https://create-users.url"))\n  .thenReturn(ok({ users: ["Alice"] }))\n  .thenReturn(ok({ users: ["Alice", "Bob"] }));\n')))}l.isMDXComponent=!0},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),l=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),f=r,h=p["".concat(c,".").concat(f)]||p[f]||m[f]||o;return n?a.a.createElement(h,i(i({ref:t},u),{},{components:n})):a.a.createElement(h,i({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var u=2;u<o;u++)c[u]=n[u];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);
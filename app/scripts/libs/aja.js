!function(){"use strict";var a=["html","json","jsonp","script"],b=["connect","delete","get","head","options","patch","post","put","trace"],c=function f(){var a={},b={},c={url:function(a){return h.call(this,"url",a,d.string)},sync:function(a){return h.call(this,"sync",a,d.bool)},cache:function(a){return h.call(this,"cache",a,d.bool)},type:function(a){return h.call(this,"type",a,d.type)},header:function(b,c){return a.headers=a.headers||{},d.string(b),"undefined"!=typeof c?(d.string(c),a.headers[b]=c,this):a.headers[b]},auth:function(b,c){return d.string(b),d.string(c),a.auth={user:b,passwd:c},this},method:function(a){return h.call(this,"method",a,d.method)},queryString:function(a){return h.call(this,"queryString",a,d.queryString)},data:function(a){return h.call(this,"data",a,d.plainObject)},body:function(a){return h.call(this,"body",a,null,function(a){if("object"==typeof a){if(!(a instanceof FormData)){try{a=JSON.stringify(a)}catch(b){throw new TypeError("Unable to stringify body's content : "+b.name)}this.header("Content-Type","application/json")}}else a+="";return a})},into:function(a){return h.call(this,"into",a,d.selector,function(a){return"string"==typeof a?document.querySelectorAll(a):a instanceof HTMLElement?[a]:void 0})},jsonPaddingName:function(a){return h.call(this,"jsonPaddingName",a,d.string)},jsonPadding:function(a){return h.call(this,"jsonPadding",a,d.func)},on:function(a,c){return"function"==typeof c&&(b[a]=b[a]||[],b[a].push(c)),this},off:function(a){return b[a]=[],this},trigger:function(a,c){var d=this,e=function(a,c){b[a]instanceof Array&&b[a].forEach(function(a){a.call(d,c)})};if("undefined"!=typeof a){a+="";var f=/^([0-9])([0-9x])([0-9x])$/i,g=a.match(f);g&&g.length>3?Object.keys(b).forEach(function(a){var b=a.match(f);!(b&&b.length>3&&g[1]===b[1])||"x"!==b[2]&&g[2]!==b[2]||"x"!==b[3]&&g[3]!==b[3]||e(a,c)}):b[a]&&e(a,c)}return this},go:function(){var b=a.type||(a.into?"html":"json"),c=j();return"function"==typeof g[b]?g[b].call(this,c):void 0}},g={json:function(a){var b=this;g._xhr.call(this,a,function(a){if(a)try{a=JSON.parse(a)}catch(c){return b.trigger("error",c),null}return a})},html:function(b){g._xhr.call(this,b,function(b){return a.into&&a.into.length&&[].forEach.call(a.into,function(a){a.innerHTML=b}),b})},_xhr:function(b,c){var d,e,f,g,h=this,j=a.method||"get",k=a.sync!==!0,l=new XMLHttpRequest,m=a.data,n=a.body,o=(a.headers||{},this.header("Content-Type"));if(!o&&m&&i()&&(this.header("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),o=this.header("Content-Type")),m&&i())if("string"!=typeof n&&(n=""),o.indexOf("json")>-1)try{n=JSON.stringify(m)}catch(p){throw new TypeError("Unable to stringify body's content : "+p.name)}else{f=o&&o.indexOf("x-www-form-urlencoded")>1;for(d in m)n+=f?encodeURIComponent(d)+"="+encodeURIComponent(m[d])+"&":d+"="+m[d]+"\n\r"}g=[j,b,k],a.auth&&(g.push(a.auth.user),g.push(a.auth.passwd)),l.open.apply(l,g);for(e in a.headers)l.setRequestHeader(e,a.headers[e]);l.onprogress=function(a){a.lengthComputable&&h.trigger("progress",a.loaded/a.total)},l.onload=function(){var a=l.responseText;this.status>=200&&this.status<300&&("function"==typeof c&&(a=c(a)),h.trigger("success",a)),h.trigger(this.status,a),h.trigger("end",a)},l.onerror=function(a){h.trigger("error",a,arguments)},l.send(n)},jsonp:function(b){var c,d=this,g=document.querySelector("head"),h=a.sync!==!0,i=a.jsonPaddingName||"callback",j=a.jsonPadding||"_padd"+(new Date).getTime()+Math.floor(1e4*Math.random()),k={};if(f[j])throw new Error("Padding "+j+"  already exists. It must be unique.");/^ajajsonp_/.test(j)||(j="ajajsonp_"+j),window[j]=function(a){d.trigger("success",a),g.removeChild(c),window[j]=void 0},k[i]=j,b=e(b,k),c=document.createElement("script"),c.async=h,c.src=b,c.onerror=function(){d.trigger("error",arguments),g.removeChild(c),window[j]=void 0},g.appendChild(c)},script:function(b){var c,d=this,e=document.querySelector("head")||document.querySelector("body"),f=a.sync!==!0;if(!e)throw new Error("Ok, wait a second, you want to load a script, but you don't have at least a head or body tag...");c=document.createElement("script"),c.async=f,c.src=b,c.onerror=function(){d.trigger("error",arguments),e.removeChild(c)},c.onload=function(){d.trigger("success",arguments)},e.appendChild(c)}},h=function(b,c,e,f){if("undefined"!=typeof c){if("function"==typeof e)try{c=e.call(d,c)}catch(g){throw new TypeError("Failed to set "+b+" : "+g.message)}return a[b]="function"==typeof f?f.call(this,c):c,this}return"undefined"===a[b]?null:a[b]},i=function(){return["delete","patch","post","put"].indexOf(a.method)>-1},j=function(){var b=a.url,c="undefined"!=typeof a.cache?!!a.cache:!0,d=a.queryString||"",f=a.data;return c===!1&&(d+="&ajabuster="+(new Date).getTime()),b=e(b,d),f&&!i()&&(b=e(b,f)),b};return c},d={bool:function(a){return!!a},string:function(a){if("string"!=typeof a)throw new TypeError("a string is expected, but "+a+" ["+typeof a+"] given");return a},plainObject:function(a){if("object"!=typeof a||a.constructor!==Object)throw new TypeError("an object is expected, but "+a+"  ["+typeof a+"] given");return a},type:function(b){if(b=this.string(b),a.indexOf(b.toLowerCase())<0)throw new TypeError("a type in ["+a.join(", ")+"] is expected, but "+b+" given");return b.toLowerCase()},method:function(a){if(a=this.string(a),b.indexOf(a.toLowerCase())<0)throw new TypeError("a method in ["+b.join(", ")+"] is expected, but "+a+" given");return a.toLowerCase()},queryString:function(a){var b={};return"string"==typeof a?a.replace("?","").split("&").forEach(function(a){var c=a.split("=");2===c.length&&(b[decodeURIComponent(c[0])]=decodeURIComponent(c[1]))}):b=a,this.plainObject(b)},selector:function(a){if("string"!=typeof a&&!(a instanceof HTMLElement))throw new TypeError("a selector or an HTMLElement is expected, "+a+" ["+typeof a+"] given");return a},func:function(a){if(a=this.string(a),!/^([a-zA-Z_])([a-zA-Z0-9_\-])+$/.test(a))throw new TypeError("a valid function name is expected, "+a+" ["+typeof a+"] given");return a}},e=function(a,b){var c;if(a=a||"",b)if(-1===a.indexOf("?")&&(a+="?"),"string"==typeof b)a+=b;else if("object"==typeof b)for(c in b)a+="&"+encodeURIComponent(c)+"="+encodeURIComponent(b[c]);return a};"function"==typeof define&&define.amd?define([],function(){return c}):"object"==typeof exports?module.exports=c:window.aja=window.aja||c}();
var f;/**
* @link https://github.com/gajus/sister for the canonical source repository
* @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
*/f=function(){var t={},r={};return t.on=function(n,e){var i={name:n,handler:e};return r[n]=r[n]||[],r[n].unshift(i),i},t.off=function(n){var e=r[n.name].indexOf(n);e!==-1&&r[n.name].splice(e,1)},t.trigger=function(n,e){var i=r[n],s;if(i)for(s=i.length;s--;)i[s].handler(e)},t};var a=f;export{a as s};

(this["webpackJsonptrip-estimate-example"]=this["webpackJsonptrip-estimate-example"]||[]).push([[0],{40:function(t,e,a){t.exports=a(57)},45:function(t,e,a){},46:function(t,e,a){},57:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),s=a(7),r=a.n(s),o=(a(45),a(24)),l=a(14),c=a(30),m=a(31),u=a(34),h=(a(46),a(99)),d=a(97),p=a(100),g=a(96),v=a(90),E=a(94),f=a(95),b=a(32),y=a.n(b),k=a(26),O=a.n(k),x=(a(54),function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(c.a)(this,Object(m.a)(e).call(this,t))).state={origin:null,dest:null,estimate:null,zoom:13},a}return Object(u.a)(e,t),Object(l.a)(e,[{key:"handleChange",value:function(t,e){var a={};a[t]=e.target.value,this.setState(a)}},{key:"handlePositionSelection",value:function(t){var e={lat:parseFloat(t[0].toFixed(6)),lon:parseFloat(t[1].toFixed(6))};null===this.state.origin?this.setState({origin:e}):null===this.state.dest&&this.setState({dest:e})}},{key:"handleGetEstimate",value:function(t,e){var a=this,n={origin:{lat:t.lat,lon:t.lon},destination:{lat:e.lat,lon:e.lon}};fetch("https://api.moia.io/estimate",{method:"POST",mode:"no-cors",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify(n)}).then((function(t){return t.json()})).then((function(t){a.setState({estimate:t})})).catch((function(t){console.log(t)}))}},{key:"clearEstimate",value:function(){this.setState({estimate:null,origin:null,dest:null})}},{key:"renderEstimate",value:function(){var t=this.state.estimate.price.currency;return i.a.createElement(v.a,{className:"card"},i.a.createElement(E.a,null,i.a.createElement(f.a,{className:"trip-title",variant:"h5",component:"h2"},"Trip:"),i.a.createElement(f.a,{component:"div"},"Price: ",this.state.estimate.price.amountMin," - ",this.state.estimate.price.amountMax," ",t),i.a.createElement(f.a,{component:"div"},"ETA: ",this.state.estimate.etaMin," - ",this.state.estimate.etaMax," Minutes"),i.a.createElement(f.a,{component:"a",href:this.state.estimate.deepLink},"Take me to MOIA")))}},{key:"renderMap",value:function(){var t=this,e=this.state.origin&&[this.state.origin.lat,this.state.origin.lon],a=this.state.dest&&[this.state.dest.lat,this.state.dest.lon];return i.a.createElement(y.a,{center:[53.567137,9.9948631],zoom:12.67,height:400,onClick:function(e){return t.handlePositionSelection(e.latLng)}},e&&i.a.createElement(O.a,{anchor:e}),a&&i.a.createElement(O.a,{anchor:a}))}},{key:"render",value:function(){var t=this,e=null!==this.state.estimate;return i.a.createElement("div",{className:"App"},i.a.createElement("a",{className:"github-fork-ribbon",href:"https://github.com/moia-dev/trip-estimate-example","data-ribbon":"Fork me on GitHub",title:"Fork me on GitHub"},"Fork me on GitHub"),i.a.createElement(p.a,null),i.a.createElement(g.a,{maxWidth:"sm"},i.a.createElement(v.a,{className:"card"},this.renderMap(),i.a.createElement("form",{noValidate:!0,autoComplete:"off"},i.a.createElement("div",null,i.a.createElement(d.a,{id:"origin-lat",label:"Origin Latitude",className:"textField",margin:"normal",type:"number",value:this.state.origin&&this.state.origin.lat||"",InputProps:{readOnly:!0}}),i.a.createElement(d.a,{id:"origin-lon",label:"Origin Longitude",className:"textField",margin:"normal",type:"number",value:this.state.origin&&this.state.origin.lon||"",InputProps:{readOnly:!0}})),i.a.createElement("div",null,i.a.createElement(d.a,{id:"dest-lat",label:"Destination Latitude",className:"textField",margin:"normal",type:"number",value:this.state.dest&&this.state.dest.lat||"",InputProps:{readOnly:!0}}),i.a.createElement(d.a,{id:"dest-lon",label:"Destination Longitude",className:"textField",margin:"normal",type:"number",value:this.state.dest&&this.state.dest.lon||"",InputProps:{readOnly:!0}})))),!e&&i.a.createElement(h.a,{variant:"contained",color:"primary",onClick:function(e){return t.handleGetEstimate(t.state.origin,t.state.dest)}},"Get Estimate"),e&&this.renderEstimate(),e&&i.a.createElement(h.a,{variant:"contained",color:"primary",onClick:function(e){return t.clearEstimate()}},"Reset")))}}]),e}(i.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[40,1,2]]]);
//# sourceMappingURL=main.e46fe308.chunk.js.map
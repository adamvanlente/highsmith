var Highsmith=function(e,t){function l(e){return document.getElementById(e)}function n(e,t,l){var n=document.createElement(e);return t=t||"",className=t||"",l=l||"",n.id=t,n.className=className,n.innerHTML=l,n}function i(e){l(Y)&&b();var t=e.clientX,n=e.clientY;o(),a(t,n)}function o(){if(!B.disableOffClicker){var e=n("div","highsmithCal--offClicker");B.style.disable||(e.style.display="block",e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.bottom="0px",e.style.right="0px",e.style.zIndex="9999"),document.body.appendChild(e),e.addEventListener("click",function(){b()})}}function a(e,t){var l=n("div",Y);s(l),r(l),g(l),u(l),l=f(l,e,t),document.body.appendChild(l),p(),y(),h()}function s(e){var t=B.style.month,l=n("span","highsmithCal--month"),i=n("label","highsmithCal--month__decrement",B.style.globals.downArrowIcon),o=n("label","highsmithCal--month__label",E[T]),a=n("label","highsmithCal--month__increment",B.style.globals.upArrowIcon);i.addEventListener("click",function(){C()}),a.addEventListener("click",function(){m()}),d(l,o,a,i,t,e)}function r(e){var t=B.style.year,l=n("span","highsmithCal--year"),i=n("label","highsmithCal--year__decrement",B.style.globals.downArrowIcon),o=n("label","highsmithCal--year__label",N),a=n("label","highsmithCal--year__increment",B.style.globals.upArrowIcon);i.addEventListener("click",function(){k()}),a.addEventListener("click",function(){v()}),d(l,o,a,i,t,e)}function d(e,t,l,n,i,o){B.style.disable||(i.fontFamily&&(e.style.fontFamily=i.fontFamily),e.style.fontSize=i.fontSize,e.style.padding=i.padding,e.style.backgroundColor=i.bgColor,e.style.color=i.color,e.style.display="block",n.style.width=i.toggleSize,n.style.height=i.toggleSize,n.style.cursor="pointer",t.style.width=i.labelSize,t.style.display="inline-block",l.style.width=i.toggleSize,l.style.height=i.toggleSize,l.style.cursor="pointer"),e.appendChild(n),e.appendChild(t),e.appendChild(l),o.appendChild(e)}function y(){if(!l("highsmithCal--resetButton")&&B.resetDateButton){var e=n("span","highsmithCal--resetButton","reset");c(e,w)}}function h(){if(!l("highsmithCal--killButton")&&B.killButton){var e=n("span","highsmithCal--killButton","remove calendar");c(e,z)}}function c(e,t){if(!B.style.disable){var n=B.style.buttons;e.style.fontSize=n.fontSize,e.style.padding=n.padding,e.style.backgroundColor=n.bgColor,e.style.display="block",e.style.cursor="pointer"}l("highsmithCal").appendChild(e),e.addEventListener("click",t)}function g(e){var t=B.style.days,l=n("span","highsmithCal--daysLegend");B.style.disable||(t.fontFamily&&(l.style.fontFamily=t.fontFamily),l.style.fontSize=t.fontSize,l.style.color=t.color,l.style.backgroundColor=t.legendBgColor,l.style.display="block",l.style.textAlign="left");for(var i=["S","M","T","W","Th","F","Sa"],o=0;o<i.length;o++){var a=n("label","highsmithCal--daysLegend__label",i[o]);B.style.disable||(a.style.padding=t.padding,a.style.width=t.width,a.style.height=t.height,a.style.color=t.legendColor,a.style.display="inline-block",a.style.textAlign="center"),l.appendChild(a)}e.appendChild(l)}function u(e){var t=B.style.days,l=n("span","highsmithCal--dayHolder");B.style.disable||(l.style.fontSize=t.fontSize,l.style.backgroundColor=t.bgColor,l.style.display="block",l.style.textAlign="left"),e.appendChild(l)}function p(){var e=B.style.days,t=l("highsmithCal--dayHolder");t.innerHTML="";for(var i=new Date(N,T,1).getDay(),o=0;i>o;o++){var a=n("label","highsmithCal--dayHolder__nullLabel");B.style.disable||(a.style.padding=e.padding,a.style.width=e.width,a.style.height=e.height,a.style.backgroundColor=e.nullBgColor,a.style.display="inline-block",a.style.textAlign="center",a.style.verticalAlign="top"),t.appendChild(a)}for(var o=0;j>o;o++){var s=o+1,r=new Date(N,T,s),d=r-new Date>0;R==s&&T==M.getMonth()&&(s="<b>"+s+"</b>");var a=n("label","highsmithCal--dayHolder__label",s);B.style.disable||(a.style.padding=e.padding,a.style.width=e.width,a.style.height=e.height,a.style.backgroundColor=e.bgColor,a.style.display="inline-block",a.style.textAlign="center",a.style.verticalAlign="top",a.style.cursor="pointer",a.style.transition="all 0.2s"),B.futureOnly?d?(a.addEventListener("click",S),B.style.disable||(a.addEventListener("mouseenter",function(t){t.target.style.backgroundColor=e.legendBgColor}),a.addEventListener("mouseleave",function(e){e.target.style.background="none"}))):a.style.opacity="0.2":(a.addEventListener("click",S),a.addEventListener("mouseenter",function(t){t.target.style.backgroundColor=e.legendBgColor}),a.addEventListener("mouseleave",function(e){e.target.style.background="none"})),t.appendChild(a)}}function f(e){var t=B.style.globals,l=H.getBoundingClientRect(),n=l.top+document.body.scrollTop+l.height;return B.style.disable||(e.style.fontFamily=t.fontFamily,e.style.border=t.border,e.style.backgroundColor=t.bgColor,e.style.width=t.width,e.style.borderRadius=t.borderRadius,e.style.display="block",e.style.position="absolute",e.style.zIndex="10000",e.style.top=n+"px",e.style.left=l.left+"px",e.style.textAlign="center"),e}function b(){l("highsmithCal--offClicker")&&l("highsmithCal--offClicker").remove(),l(Y)&&l(Y).remove()}function m(){T++,T>E.length-1&&(T=0,N++),F()}function C(){T--,0>T&&(T=E.length-1,N--),F()}function v(){N++,F()}function k(){N--,F()}function F(){l("highsmithCal--month__label").innerHTML=E[T],l("highsmithCal--year__label").innerHTML=N,p()}function w(){x(),F()}function x(){var e=M;T=e.getMonth(),N=e.getFullYear(),R=e.getDate(),J=e.getDay(),j=new Date(N,T,0).getDate()}function S(e){var t=e.target.innerHTML,l=String(T+1);t=("0"+t).slice(-2),l=("0"+l).slice(-2);var n;n="mdy"==B.format?l+"/"+t+"/"+N:"ymd"==B.format?N+"/"+l+"/"+t:t+"/"+l+"/"+N,H.value=n,H.innerHTML=n,b()}function z(){b(),H.removeEventListener("click",i),H.readOnly=!1}function L(){console.log(B)}function _(e,t){t=t||B;for(item in e)A(e,item,t)}function A(e,t,l){"object"!=typeof l[t]?l[t]=e[t]:_(e[t],l[t])}var D={format:"mdy",customDate:!1,killButton:!1,resetDateButton:!1,disableOffClicker:!1,futureOnly:!1,style:{disable:!1,month:{bgColor:"#F1F1F1",color:"#333",fontFamily:!1,fontSize:"16px",labelSize:"80%",padding:"4px",toggleSize:"10%"},year:{bgColor:"#F1F1F1",color:"#777",fontFamily:!1,fontSize:"14px",labelSize:"60%",padding:"4px",toggleSize:"10%"},days:{bgColor:"#F1F1F1",color:"#333",fontFamily:!1,fontSize:"13px",height:"16px",legendBgColor:"#DCDCDC",legendColor:"#333",nullBgColor:"#FAFAFA",padding:"4px",width:"20px"},globals:{fontFamily:"Georgia, serif",bgColor:"#FFFFFF",border:"1px solid #F1F1F1",borderRadius:"2px",downArrowIcon:"&#8672;",upArrowIcon:"&#8674;",width:"200px"},buttons:{fontSize:"12px",padding:"4px"}}},E=["January","February","March","April","May","June","July","August","September","October","November","December"],B=D;_(t);var H=l(e);H.readOnly=!0;var M;if(B.customDate){var I=H.value,O=I.split("/");I=O.join("/"),M=new Date(I)}else M=new Date;var T,N,R,J,j,Y=H.className?"highsmithCal "+H.className:"highsmithCal";return Element.prototype.remove=function(){this.parentElement.removeChild(this)},H.addEventListener("click",i,!1),x(),{kill:z,showOptions:L,updateOptions:_,removeCalendar:b}};

function client(){return null!==window.innerWidth?{width:window.innerWidth,height:window.innerHight}:"CSS1Compat"===document.compatMode?{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}:{width:document.body.clientWidth,height:document.body.clientHeight}}function windowOnresize(e){var n=window.onresize;"function"!=typeof window.onresize?window.onresize=e:window.onresize=function(){n(),e()}}!function(){function e(){client().width<1205?o.psize=15:o.psize=20}function n(){o.stype=10,s.className="",c.className="active",i(1)()}function t(){o.stype=20,c.className="",s.className="active",i(1)()}function i(e){return function(){o.pageNo=e,console.log(o.pageNo);for(var n=0;n<d.length;n++)d[n].className="";d[e-1].className="select",o.sendUrl(),ajax(o)}}var o={type:"get",pageNo:1,psize:15,stype:10,asyn:!0,sendUrl:function(){o.url="http://study.163.com/webDev/couresByCategory.htm?pageNo="+o.pageNo+"&psize="+o.psize+"&type="+o.stype}};e();var a=$(".course-1");o.success=function(e){a.innerHTML="";for(var n=JSON.parse(e),t=0;t<n.list.length;t++){var i=n.list[t].price<=0?"免费":"￥"+n.list[t].price,o=document.createElement("li");o.innerHTML='<img src="'+n.list[t].middlePhotoUrl+'"><div class="padding"><h3 class="f-toe">'+n.list[t].name+"</h3><p>"+n.list[t].provider+"</p><i>"+n.list[t].learnerCount+'</i>人在学<p class="price"><em>'+i+"</em></p></div>",a.appendChild(o)}},o.sendUrl(),windowOnresize(function(){client().width<1205?20===o.psize&&(o.psize=15,o.sendUrl(),ajax(o)):15===o.psize&&(o.psize=20,o.sendUrl(),ajax(o)),o.sendUrl(),ajax(o)}),ajax(o);var c=$("#u-product"),s=$("#u-code");EventUtil.addEvent(c,"click",n),EventUtil.addEvent(s,"click",t);var l=$(".u-fenye"),d=l.getElementsByTagName("li");EventUtil.addEvent(l,"click",function(e){var e=EventUtil.getEvent(e),n=EventUtil.getTarget(e),t=n.innerHTML;t>=0&&i(t)()});var r=l.getElementsByTagName("span")[0],p=l.getElementsByTagName("span")[1];EventUtil.addEvent(r,"click",function(){o.pageNo>1?i(o.pageNo-1)():i(8)()}),EventUtil.addEvent(p,"click",function(){o.pageNo<8?(console.log(o.pageNo),i(Number(o.pageNo)+1)()):i(1)()})}();
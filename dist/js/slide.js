function runImg(){}window.onload=function(){var t=new runImg;t.ojson(),t.count=3,t.imgurl=["<img src=./images/banner1.jpg>","<img src=./images/banner2.jpg>","<img src=./images/banner3.jpg>"],t.init("#mainslide"),t.action()},runImg.prototype={ojson:function(){this.bigbox=null,this.boxul=null,this.count=0,this.imglist=null,this.numlist=null,this.imgurl=[],this.play=null,this.prov=0,this.index=0,this.timer=null},init:function(t){this.count=this.count<=3?this.count:3,this.bigbox=this.eCreate(t);for(var i=0;i<2;i++){for(var n=this.eCreate("ul"),e=1;e<=this.count;e++){var s=this.eCreate("li");s.innerHTML=0===i?this.imgurl[e-1]:e,n.appendChild(s)}this.bigbox.appendChild(n)}this.boxul=this.bigbox.getElementsByTagName("ul"),this.boxul[0].className="imglist",this.boxul[1].className="countNum",this.imglist=this.boxul[0].getElementsByTagName("li"),this.numlist=this.boxul[1].getElementsByTagName("li");for(var i=0;i<this.imglist.length;i++)this.alpha(i,0);this.alpha(0,100),this.numlist[0].className="current"},eCreate:function(t){return"string"==typeof t?t.indexOf("#")>=0?(t=t.replace("#",""),document.getElementById(t)?document.getElementById(t):(alert("没有容器"+t),null)):document.createElement(t):t},alpha:function(t,i){i>98&&(i=100),this.imglist[t].style.opacity=i/100,this.imglist[t].style.filter="alpha(opacity:"+i+")"},action:function(){this.autoplay(),this.mouseoverout(this.bigbox,this.numlist)},autoplay:function(){var t=this;this.play=setInterval(function(){t.prov=t.index,t.index++,t.index>t.numlist.length-1&&(t.index=0),t.imgshow(t.index)},5e3)},imgshow:function(t){this.index=t;var i=100,n=0;clearInterval(this.timer);for(var e=0;e<this.imglist.length;e++)this.alpha(e,0);for(var e=0;e<this.numlist.length;e++)this.numlist[e].className="";this.numlist[this.index].className="current",this.alpha(this.prov,100),this.alpha(this.index,0);var s=this;this.timer=setInterval(function(){var t=!0;i-=1,n+=1,0==i&&(i=0),100==n&&(n=100),0!==i&&100!==n&&(t=!1,s.alpha(s.prov,i),s.alpha(s.index,n)),t&&clearInterval(s.timer)},10)},mouseoverout:function(t,i){var n=this;t.onmouseover=function(){clearInterval(n.play)},t.onmouseout=function(){n.autoplay()};for(var e=0;e<i.length;e++)i[e].index=e,i[e].onmouseover=function(){n.prov=n.index,this.index!=n.prov&&n.imgshow(this.index)}}};
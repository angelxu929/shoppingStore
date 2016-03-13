/**
 * Created by Administrator on 2015/12/1 0001.
 */
window.onload=function(){
    function $(id){return document.getElementById(id);}
    var imgs=$("slider").getElementsByTagName("img");
    var ul=document.createElement("ul");
    var scrollwidth=$("slider").offsetWidth;
    var bannerm=$("banner_m");
    //var slider=$("slider");
    $("slider").appendChild(ul);
    for(var i=0;i<imgs.length;i++){
        var li=document.createElement("li");
        ul.appendChild(li);
        li.innerHTML=i+1;
    }
    ul.children[0].className="current";
   var lis=$("slider").getElementsByTagName("li");
    for(var i=0;i<lis.length;i++) {
        lis[i].index = i;
        lis[i].onmouseover = function () {
            for (var j = 0; j < lis.length; j++) {
                lis[j].className = "";
            }
            this.className = "current";
        }
    }
    //刚刷新的时候让第一张图片显示
    for(var i=1;i<imgs.length;i++){
        imgs[i].style.left=scrollwidth+"px";
    }
        var Now=0;
        for(var i=0;i<lis.length;i++){
            lis[i].onclick=function(){
                var that=this.innerHTML - 1;
                  if(that > Now){
                      animate(imgs[Now],{left:-scrollwidth});
                      imgs[that].style.left= scrollwidth +"px";
                      imgs[that].style.left= 0 ;
                  }else if(that <Now){
                      animate(imgs[Now],{left:scrollwidth});
                      imgs[that].style.left=-scrollwidth+"px";
                      imgs[that].style.left= 0 ;
                  }
                        Now=that;
                       // animate([imgs[that],{left:0}]);
                        setSquare();
            }
        }
        function setSquare() {
            //  清除所有的lis current   留下 满足需要的拿一个
            for(var i=0;i<lis.length;i++){
                lis[i].className="";
            }
            lis[Now].className="current";
        }
        var timer=null;
        timer=setInterval(autoplay,3000);
    function autoplay(){
        animate(imgs[Now],{left:-scrollwidth});
        ++Now >imgs.length-1 ? Now=0:Now;
        imgs[Now].style.left=scrollwidth+"px";
        animate(imgs[Now],{left:0});
        setSquare();

    }
    $("slider").onmouseover=function(){
          clearInterval(timer);//同下面的楼层和返回顶部的timer起冲突了，不知道清那个了 要分开变量名
         // alert(11);
    }
    $("slider").onmouseout=function(){
        timer=setInterval(autoplay,3000);
    }
    function setSquare() {
        //  清除所有的lis current   留下 满足需要的拿一个
        for(var i=0;i<lis.length;i++){
            lis[i].className="boxli";
        }
        lis[Now].className="boxli current";
    }
//input 文本框输入验证
    $("txt").onfocus=function(){
        if($("txt").value=="热门搜索"){
            $("txt").value="";
            $("txt").style.color="#333";
            $("txt").style.width=348+"px";
            $("txt").style.paddingLeft=10+"px";
            $("visiable").style.display="none";

        }
    }

    $("txt").onblur=function(){
        if($("txt").value==""){
            $("txt").value="热门搜索";
            $("txt").style.color="#ccc";
            $("txt").style.width=330+"px";
            $("txt").style.paddingLeft=28+"px";
            $("visiable").style.display="block";
        }
    }

//返回顶部
    var goTop=$("goTop");
    window.onscroll=function(){
        scroll().top>0 ? show(goTop):hide(goTop);
        leader=scroll().top;
      // console.log(scroll().top);
        //让楼层在到达指定位置是显示出来 要放到
        if(scroll().top>=1000){
            $("ul").style.display="block";
            //alert(11);
        }else{
            $("ul").style.display="none";
        }
    }
    var leader = 0, timer1=0;
    goTop.onclick = function(){
        clearInterval(timer1);
        var target=0;
        timer1=setInterval(function(){
            leader=leader+(target-leader)/10;
            window.scrollTo(0,leader);
            if(leader == target){
                clearInterval(timer1);
            }
        },20)
    }

//滑动楼层
    var floor=$("floor");
    var floorchildren=floor.children;
    var ul=$("ul");
    var ullis=ul.children;
    var leader = 0,target = 0,timer2 = null;
    for(var i=0;i<ullis.length;i++){
         ullis[i].index=i;
        ullis[i].onmouseover=function(){
            for(var j=0;j<ullis.length;j++){
                ullis[j].style.backgroundColor="#000";
            }
            this.style.backgroundColor="red";
        }
        //为什么用这个报错说style没定义
       /* ullis[i].onmouseout=function(){
             ullis[i].style.backgroundColor="lightskyblue";

         }*/
        ullis[i].onmouseout=function(){
            for(var j=0;j<ullis.length;j++){
                clearInterval(timer2); //解决清除onclick里面的点击后 在滚动滚动条不能滚动的问题
                ullis[j].style.backgroundColor="#000";
            }
        }
         ullis[i].onclick=function(){
             clearInterval(timer2);
             target = floorchildren[this.index].offsetTop;
            timer2 = setInterval(function(){
                leader = leader + (target-leader) / 10;
                window.scrollTo(0,leader);
            },30)
         }
    }
}


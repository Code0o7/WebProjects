// 自己封装常用js代码

// 通过id获取元素
function $(id) {return document.getElementById(id);}

// 获取浏览器的scrollTop、scrollLeft
function getWindowScroll(){
	if (window.pageYOffset != null) {
		// ie9+ 其他浏览器
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	}else if (document.compatMode == "CSS1Compat") {
		// 声明了DTD的文档
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}else {
		return {
			left: document.body.scrollLeft,
			top: document.body.scrollTop
		}
	}
}

// 获取浏览器可是区域大小
function getWindowClient(){
	if (window.innerWidth != null) {
		// ie9+ 最新浏览器
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}else if (document.compatMode === "CSS1Compat") {
		// 标准浏览器，声明了DTD的浏览器
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	}else {
		// 怪异浏览器
		return {
			width: document.body.clientWidth,
			height: document.body.clientHeight
		}
	}
}

// 获取文档内选中的文字
function getWindowSelection(){
	if (window.getSelection) {
		return window.getSelection().toString();
	}else {
		// ie浏览器
		return document.selection.createRange().text; 
	}
}

// 获取元素CSS属性，行内式 内嵌式 外联式
function getStyleAttr(obj,attr){
	if (obj.currentStyle) { 
		// ie 浏览器
		return obj.currentStyle[attr];
	}else {
		return window.getComputedStyle(obj,null)[attr];
	}
}

// 设置CSS属性，行内式 内嵌式 外联式
function setStyleAttr(obj,attr,attrValue){
	obj.style[attr] = attrValue;
}

//  封装缓动动画
function slowAnimate(obj,json){
	// 先清除定时器
    clearInterval(obj.timer); 

    // 开启计时器
    obj.timer = setInterval(function() {

    	var flag = true;
    	for(var key in json) {
	    	var target = json[key];

	    	var current = parseInt(getStyleAttr(obj,key));

	    	// 计算步长 不断变化的 
	        var step = (target - current) / 10;

	        // 是前进 还是倒退
	        step = step > 0 ? Math.ceil(step) : Math.floor(step);

	        // 设置属性
	        setStyleAttr(obj,key,current + step + "px");

	        if (current != json[key]) {
	        	flag = false;
	        }	
	    }

	    // 到达目标位置 停止计时器
        if(flag){
            clearInterval(obj.timer);
        }
    },10)
}

// 透明度渐变动画
function opacityAnimate(obj,toOpacity,duration){
	// 先清除定时器
	clearInterval(obj.timer); 
	var startOpacity = parseFloat(getStyleAttr(obj,"opacity"));

	var diffOpacity = parseFloat(toOpacity) - startOpacity;
	

	// console.log("透明度:" + startOpacity);

	var opacityStep = diffOpacity / duration * 10;

	obj.timer = setInterval(function(){
		startOpacity += opacityStep;

		obj.style.opacity = startOpacity;

		if(Math.abs(toOpacity - startOpacity) <= Math.abs(opacityStep)) {
			clearInterval(obj.timer);
		}
	}, 10);
}


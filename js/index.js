window.onload = function() {
	// 获取左侧栏
	var ct_cLeft = document.querySelector(".ct_cLeft");
	// 获取左侧栏的高度
	var leftHeight = ct_cLeft.offsetHeight;

	// 获取用来滑动的列表
	var ulBox = ct_cLeft.querySelector("ul:first-of-type");
	var ulBoxHeight = ulBox.offsetHeight;

	// 获取所有的li元素
	var lis = ulBox.querySelectorAll("li");

	// 设置静止状态下的最大top值
	var maxTop = 0;

	// 设置静止状态下的最小top值
	
	var minTop = leftHeight - ulBoxHeight;

	// 设置滑动状态下的最大的top值
	var maxBounceTop = maxTop + 100;
	// 设置滑动状态下的最小top值
	var minBounceTop = minTop - 100;

	// 实现滑动
	var startY;
	var moveY;
	var distanceY;

	// 记录当前元素滑动到的距离
	var currentY = 0;
	// 添加滑动事件
	ulBox.addEventListener("touchstart",function(e) {
		// 获取手指的起始坐标
		startY = e.targetTouches[0].clientY;
	})
	// 手指滑动时
	ulBox.addEventListener("touchmove",function(e) {
		moveY = e.targetTouches[0].clientY;
		// 计算距离的差异
		distanceY = moveY - startY;
		if(currentY + distanceY > maxBounceTop || currentY + distanceY < minBounceTop) {
			console.log("超出范围啦");
			return;
		}
		// 清除之前的过渡效果
		ulBox.style.transition = "none";
		// 实现偏移操作
		ulBox.style.top = (currentY + distanceY) + "px";
	});
	// 判断滑动后的距离和位置
	ulBox.addEventListener("touchend",function(e) {
		if(currentY+distanceY < minTop) {
			// 回到minTop位置
			currentY = minTop;
			ulBox.style.transition = "top 0.5s";
			ulBox.style.top=minTop+"px";

		}
		else if(currentY+distanceY > maxTop) {
			// 回到maxTop位置
			currentY=maxTop;
			ulBox.style.transition="top 0.5s";
			ulBox.style.top=maxTop+"px";
		}
		else {
			currentY=currentY+distanceY;
		}
	});
	// 为每一个li元素添加索引值
	for(var i = 0; i<lis.length; i++) {
		lis[i].index = i;
	}
	// 绑定移动端的tap事件
	itcast.tap(ulBox,function(e) {
		for(var i = 0; i < lis.length; i++) {
			lis[i].classList.remove("active");
		}
		// 为当前被单击的li元素添加样式
		var li = e.target.parentNode;
		var liHeight = li.offsetHeight;
		li.classList.add("active");



		/*2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值*/
		/*获取当前li元素的索引值*/
		var index = li.index;
		// 开启过渡
		ulBox.style.transition="top 0.5s";
		// 设置偏移
		if(-index * liHeight < minTop) {
			ulBox.style.top = minTop + "px";
			currentY = minTop;
		}
			else {
				ulBox.style.top = -index * liHeight+"px";
				currentY = -index * liHeight;
			}
	})



}
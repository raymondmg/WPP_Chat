(function ( $ ) {
	//聊天面板（可选参数：左侧/右侧，是否已经开启）
	$.fn.ChatPanel = function( options ) {

		var oldCode, newCode, side;

		newCode = "";

        //设置
		var settings = $.extend({
			side:"left",
			autoClose:true
		}, options );

		side = settings.side;
		autoClose = settings.autoClose;

		this.addClass("container sidebar");
        //根据参数设定聊天面板初始化位置
		if(side=="left"){
			this.addClass("sidebar-left");
		}else if(side=="right"){
			this.addClass("sidebar-right");
		}else{
			this.addClass("sidebar-left");	
		}
        //原来页面内容
		oldCode = this.html();
        //新添加内容
		newCode += "<div class=\"row\">\n";
		newCode += "	<div class=\"col-xs-12 col-sm-12 col-md-12 col-lg1-12\" data-side=\""+side+"\">\n"+ oldCode+" </div>\n";
		newCode += "</div>";
		newCode += "<div class=\"toggler\">\n";
		newCode += "	<span class=\"glyphicon glyphicon-chevron-right\">&nbsp;</span> <span class=\"glyphicon glyphicon-chevron-left\">&nbsp;</span>\n";
		newCode += "</div>\n";

		this.html(newCode);

		if(autoClose){
			$(this).find(".toggler").trigger("click");
		}

	};


    //面板缩进与伸展
	$(document).on('click','.toggler', function(){
		var toggler = $(this);
		var container = toggler.parent();
		var listaClassi = container[0].classList;
		var side = getSide(listaClassi);
		var containerWidth = container.width();
		var status = container.attr('data-status');
		if(!status){
			status = "opened";
		}
		doAnimation(container, containerWidth, side, status);
	});



//获取当前面板放置位置
function getSide(listaClassi){
	var side;
	for(var i = 0; i<listaClassi.length; i++){
		if(listaClassi[i]=='sidebar-left'){
			side = "left";
			break;
		}else if(listaClassi[i]=='sidebar-right'){
			side = "right";
			break;
		}else{
			side = null;
		}
	}
	return side;
}

//缩进动画（容器，容器宽度，面板，状态）
function doAnimation(container, containerWidth, sidebarSide, sidebarStatus){
	var toggler = container.children()[1];
	if(sidebarStatus=="opened"){
		if(sidebarSide=="left"){
			container.animate({
				left:-(containerWidth+2)
			});
			toggleArrow(toggler, "left");
		}else if(sidebarSide=="right"){
			container.animate({
				right:- (containerWidth +2)
			});
			toggleArrow(toggler, "right");
		}
		container.attr('data-status', 'closed');
	}else{
		if(sidebarSide=="left"){
			container.animate({
				left:0
			});
			toggleArrow(toggler, "right");
		}else if(sidebarSide=="right"){
			container.animate({
				right:0
			});
			toggleArrow(toggler, "left");
		}
		container.attr('data-status', 'opened');

	}

}
//缩进箭头（箭头，左侧/右侧）
function toggleArrow(toggler, side){
	if(side=="left"){
		$(toggler).children(".glyphicon-chevron-right").css('display', 'block');
		$(toggler).children(".glyphicon-chevron-left").css('display', 'none');
	}else if(side=="right"){
		$(toggler).children(".glyphicon-chevron-left").css('display', 'block');
		$(toggler).children(".glyphicon-chevron-right").css('display', 'none');
	}
}

}(jQuery));

//读取微信的信息
function loadChatInfo(data)
{
    //数据存在
    if(data)
    {
        //获取显示聊天信息的层
        var $rootDiv = $("#ChatList");
        var liDiv = $("<li>");
        liDiv.addClass("comment");
        liDiv.appendTo($rootDiv);

        //添加头像和个人信息
        var UserInfoDiv = $("<div>");
        UserInfoDiv.addClass("comment-meta");
        UserInfoDiv.appendTo(liDiv);
        
        var UserImg = $("<img>");
        UserImg.attr("src", data.imgSrc);
        UserImg.attr("width", "80");
        UserImg.attr("height", "80");
        UserImg.attr("alt", "");
        UserImg.appendTo(UserInfoDiv);
        
        var UserName = $("<h4>");
        UserName.text(data.UserName);
        UserName.appendTo(UserInfoDiv);

        //添加聊天内容
        var ChatInfoBlock = $("<blockquote>");
        ChatInfoBlock.appendTo(liDiv);
        
        var ChatInfo = $("<p>");
        ChatInfo.text(data.ChatInfo);
        ChatInfo.appendTo(ChatInfoBlock);

        var ChatPublishTime = $("<span>");
        
        //显示发表的时间
        var PublishTime = new Date();
        var _pbTime = PublishTime.toLocaleString();
        ChatPublishTime.text(_pbTime);
        ChatPublishTime.appendTo(ChatInfoBlock);
    }
}


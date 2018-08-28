var xaxis = 26;	
var yaxis = 10;							//x,y轴长度
var selectedArray = [];
var yAxisArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function initBackGroundData(floorInfo){
	if(42+62*xaxis<window.innerWidth)
	$("#containerDiv").width(window.innerWidth);
	else
	$("#containerDiv").width(42+70*xaxis);
	for(var i = 1; i <= yaxis; i++){
		var contentDiv = document.createElement('div');
		contentDiv.setAttribute('class','superdiv');
		if(i == yaxis){
			contentDiv.setAttribute('style','margin-bottom:50px ;');
		}
//		contentDiv.setAttribute('style','position:relative; z-index: 100;');
		document.getElementById('containerDiv').appendChild(contentDiv);
	for(var j = 1; j <= xaxis;j++){
		var one = document.createElement('div');
		one.setAttribute('class','oneDiv');
		one.setAttribute('style',' background: url(img/empty.png); background-size:contain;width: 50px;height: 50px;');
		one.setAttribute("id", "sate"+i+"-"+j);

		
		var textContent = document.createElement('div');
		textContent.setAttribute('id','text'+i+"-"+j);
		textContent.setAttribute('style','display: none; vertical-align:middle; padding-top: 5px; color: white; position: absolute; z-index: 1;  width: 48px;height: 48px;font-size: 11px; text-align: center;');
		textContent.setAttribute('class','wordwrap');
		
		var borderlmgDiv = document.createElement('div');
		borderlmgDiv.setAttribute('style','display: none; position: absolute;z-index: 100; width: 50px;height: 50px; font-size: 10px; background: url(img/selecting.png);background-size:contain');
		borderlmgDiv.setAttribute('id','boder'+i+"-"+j);
		borderlmgDiv.setAttribute('class','boderDiv');
		
		var textlabel = document.createElement('div');
		var headerText =  document.createElement('div');
		
			if(j == 1){
				textlabel.setAttribute('class','textDiv');
				textlabel.setAttribute('style','padding-left: 0%;');
				textlabel.innerText = i;
				contentDiv.appendChild(textlabel);
			}
			if(i==1){

				headerText.setAttribute('class','headerDiv');
				headerText.innerText = yAxisArray[j-1];
				$("#titleX").append(headerText);
			}
			one.appendChild(textContent);
			one.appendChild(borderlmgDiv);
           	contentDiv.appendChild(one);
		}
     }
	if(selectedArray.length>0){
		for(var i=0; i < selectedArray.length;i++){

			var objc;
			if(selectedArray[i][0]){
				objc = selectedArray[i][0];
			}else{
				objc = selectedArray[i];
			}
			$("#"+objc.id+"").css("display","block");
		}
	}
}
initBackGroundData();

var initSelectBox = function(selector, selectCallback) {
            function clearBubble(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    e.cancelBubble = true;
                }

                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
            var clickX = "";
            var clickY = "";
            var selectBoxWidth = "";
            var selectBoxHeight = "";
            var isSelectBox = true;   //是否框选还是点击
            var $container = $(selector);
            //  框选事件
            $container
                .on('mousedown', function(eventDown) {
                    //  设置选择的标识
                    var isSelect = true;
                    //  创建选框节点
                    var $selectBoxDashed = $('<div class="select-box-dashed"></div>');
                    $('.select-box-container').append($selectBoxDashed);
                    //  设置选框的初始位置
					var startX = eventDown.pageX; 
					var startY =	 eventDown.pageY; 
					clickX = startX;
					clickY = startY;
                    $selectBoxDashed.css({
                        left: startX,
                        top : startY
                    });
                    //  根据鼠标移动，设置选框宽高
                    var _x = null;
                    var _y = null;
                    //  清除事件冒泡、捕获
                    clearBubble(eventDown);
                    //  监听鼠标移动事件
                    $(selector).on('mousemove', function(eventMove) {

                        //  设置选框可见
                        $selectBoxDashed.css('display', 'block');
                        //  根据鼠标移动，设置选框的位置、宽高
                        _x = eventMove.x || eventMove.pageX;
                        _y = eventMove.y || eventMove.pageY;
                        //  暂存选框的位置及宽高，用于将 select-item 选中
  
						var _left   = Math.min(_x, startX);
                        var _top    = Math.min(_y, startY);
                        var _width  = Math.abs(_x - startX);
                        var _height = Math.abs(_y - startY);
                      
                        $selectBoxDashed.css({
                            left  : _left,
                            top   : _top,
                            width : _width,
                            height: _height
                        });
                        //  遍历容器中的选项，进行选中操作
                        $(selector).find('.oneDiv').each(function() {
                            var $item = $(this);
                            var itemX_pos = $item.prop('offsetWidth') + $item.prop('offsetLeft');
                            var itemY_pos = $item.prop('offsetHeight') + $item.prop('offsetTop');
                            //  判断 select-item 是否与选框有交集，添加选中的效果（ temp-selected ，在事件 mouseup 之后将 temp-selected 替换为 selected）
                            var condition1 = itemX_pos > _left;
                            var condition2 = itemY_pos > _top;
                            var condition3 = $item.prop('offsetLeft') < (_left + _width);
                            var condition4 = $item.prop('offsetTop') < (_top + _height);
                            if (condition1 && condition2 && condition3 && condition4&&_height>20&&_width>20) {
                            		var isSelect = false;
								$item[0].children[1].style.display = "block";
                            } else{
								$item[0].children[1].style.display = "none";
                            }
                        });
                        //  清除事件冒泡、捕获
                        clearBubble(eventMove);
                    });

                    $(selector).on('mouseup', function() {
                   	 	selectedArray=[];
                    		if(isSelectBox){
                   			$(selector).find('.boderDiv').each(function() {
             			 		if(!$(this).is(":hidden")){
             			 			selectedArray.push($(this));
             			 		}
             			 		if(selectedArray.length>0)
             			 		$('#noticeModal').modal('show')
             				});
                    		}
                    		else{
                    			$(selector).find('.boderDiv').each(function() {
             			 		if(!$(this).is(":hidden")){
             			 			$(this).css('display','none');
             			 		}
             				});
                    		}
                    		

                        $(selector).off('mousemove');
                        $(selector)
                            .find('.select-item.temp-selected')
                            .removeClass('temp-selected')
                            .addClass('selected');
                        $selectBoxDashed.remove();

                        if (selectCallback) {
                            selectCallback();
                        }
                    });
                })
                .on('mouseup',function(evenUp){
               	 	selectBoxWidth = evenUp.pageX - clickX;
               	 	selectBoxHeight = evenUp.pageY - clickY;
               	 	
               	 	if(selectBoxWidth<20||selectBoxHeight<20){
               	 		if(evenUp.target.className=="oneDiv"||evenUp.target.className=="boderDiv"){
               	 			isSelectBox = true;
               	 		}else{
               	 			isSelectBox = false;
               	 		}
               	 	}else{
               	 		isSelectBox = true;
               	 	}
                })
                		
               
                //  点选切换选中事件
                .on('click', '.oneDiv', function() {

                		if(selectedArray.length>0){
						if ($(this)[0].children[1].style.display == "block") {
                       		$(this)[0].children[1].style.display = "none";
                       		for(var i=0;i<selectedArray.length;i++){
                       			if(selectedArray[i][0]){
                       				if(selectedArray[i][0]==$(this)[0].children[1]){
                       				selectedArray.splice(i,1);
                       				}
                       			}else{
                       				if(selectedArray[i]==$(this)[0].children[1]){
                       				selectedArray.splice(i,1);
                       				}
                       			}
                       			
                       		} 
                    		}
						else {
                       		$(this)[0].children[1].style.display = "block";
                       		var inset =$(this)[0].children[1].id.substring(5).split("-");
                       		var indexA = parseInt(inset[0]+inset[1]);
                       		for(var i=0;i<selectedArray.length;i++){
                       			var mySelectId = [];
                       			if(selectedArray[i][0]){
                       				mySelectId = selectedArray[i][0].id.substring(5).split("-");
                       			}else{
                       				mySelectId = selectedArray[i].id.substring(5).split("-");
                       			}
                       			var indexB = parseInt(mySelectId[0]+mySelectId[1]);
                       			if(indexA<indexB){
                       				selectedArray.splice(i,0,$(this)[0].children[1]);
                       				break;
                       			}else if(i==selectedArray.length-1){
                       				selectedArray.push($(this)[0].children[1]);
                       				break;
                       			}
                       		}
                   		}
                		}
               })
        };
initSelectBox('#containerDiv');
$("#updatenoticeBtn").click(function (){
	for(var i=0;i<selectedArray.length;i++){
		var mySelectId =[];
		
		if(selectedArray[i][0]){
			selectedArray[i][0].display = 'none';
          	mySelectId = selectedArray[i][0].id.substring(5).split("-");
        }else{
        		selectedArray[i].display = 'none';
            	mySelectId = selectedArray[i].id.substring(5).split("-");
        }
        $("#sate"+mySelectId[0]+"-"+mySelectId[1]).attr('style','background: url(img/fullLoad.png); background-size:contain;width: 50px;height: 50px;');
        $("#text"+mySelectId[0]+"-"+mySelectId[1])[0].innerHTML =mySelectId[0]+"-"+mySelectId[1];
        $("#text"+mySelectId[0]+"-"+mySelectId[1]).css('display','block');
        $("#boder"+mySelectId[0]+"-"+mySelectId[1]).css('display','none');
	}
	console.log(selectedArray);
})

$("#cancelnoticeBtn").click(function(){
	for(var i=0;i<selectedArray.length;i++){
		var mySelectId =[];
		
		if(selectedArray[i][0]){
			selectedArray[i][0].display = 'none';
          	mySelectId = selectedArray[i][0].id.substring(5).split("-");
        }else{
        		selectedArray[i].display = 'none';
            	mySelectId = selectedArray[i].id.substring(5).split("-");
        }
        $("#sate"+mySelectId[0]+"-"+mySelectId[1]).attr('style','background: url(img/empty.png); background-size:contain;width: 50px;height: 50px;');
        $("#text"+mySelectId[0]+"-"+mySelectId[1]).css('display','none');
        $("#boder"+mySelectId[0]+"-"+mySelectId[1]).css('display','none');
      }
});

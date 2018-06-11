            var len=100,
            contentArr=[],
            pageSize=0;
            total_page=0,
            textStr='',
            dataRes=[],       
            statusArr=[],
            contentArr=[];
            // rptId= +window.location.search.slice(1).split("=")[1];
            // console.log('rptId=>',rptId);  
            function GetDateDiff(startDiffTime) {
                var newTime = startDiffTime.substring(0,10).replace(/\./g, "/");
                return newTime;    
            }; 
            function showAll(){
                $('ul#thelist').on('click','a.toggle',function () {
                //点击按钮的时候改变开关的值
                var liIndex=$(this).parents('li').index();
                console.log(liIndex);
                 if(!statusArr[liIndex]){
                    //展开
                    $(this).parents('li').find('p.new_detial').html(contentArr[liIndex]);
                    $(this).html('<i class="iconfont icon_arrow">&#xe613;</i>');
                    console.log('展开=>');
                    statusArr[liIndex]=true;
                 }else {
                     //收缩
                    console.log('收缩=>');
                    var str = contentArr[liIndex].substring(0, len)+'...';
                    $(this).parents('li').find('p.new_detial').html(str);
                    $(this).html('<i class="iconfont icon_arrow">&#xe603;</i>');
                    statusArr[liIndex]=false;
                 }
             })
            }
            function getUrlParams(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
                var r = window.location.search.substr(1).match(reg);  
                if (r != null) return unescape(r[2]); 
               return null; 
            }
            // 上拉加载
            var dropload = $('#wrap').dropload({
                scrollArea : window,
                domDown : {
                    domClass   : 'dropload-down',
                    domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData  : '<div class="dropload-noData">我也是有底线的</div>'
                },
                loadDownFn : function(me) {
                    pageSize++;
                    var rptId=getUrlParams(rptId);
                    var htmlStr="";
                    $.ajax({  
                    contentType: "application/json;charset=UTF-8",
                    type: "POST",
                    url: "http://yuqing.zhidaohulian.com/report/get_rpt_dtl", 
                    data: JSON.stringify({'rpt_id':rptId,'is_all':false,pageSize:pageSize}), 
                    dataType: 'json',
                    success: function(data){ 
                        console.log(data);
                        dataRes=data.result.data;
                        total_page=data.result.total_page;
                        var sectStr=""; 
                        var arrLen = dataRes.length;
                        $('.new_heading').text(data.result.rpt_name);
                        var newsTime=GetDateDiff(data.result.time);
                        $('.new_time').text(newsTime);
                        if(dataRes.length>0){
                            for( var i=0;i<arrLen;i++){ 
                                textStr=dataRes[i].cont.replace(/\n/g,"<br>");
                                contentArr.push(textStr);
                                sectStr = textStr.substring(0, 100)+'...';
                                if(dataRes[i].bgImg){
                                    htmlStr+='<li>'+  
                                    '<div class="new_content">'+
                                        '<div class="new_source clearfix">'+
                                            '<div class="new_item">'+
                                                    // '<img class="new_icon" src='+dataRes[i].source_img+'/>'+
                                                    // '<span class="new_name">'+dataRes[i].source_title+'</span>'+
                                            '</div>'+   
                                            '<a class="new_view" href='+ dataRes[i].source_url +'>查看来源</a>'+
                                        '</div>'+
                                        '<div class="new_img">'+
                                            '<img src='+dataRes[i].bgImg+'>'+
                                        '</div>'+
                                        '<h2 class="new_title">'+dataRes[i].title+'</h2>'+
                                        '<p class="new_detial">'+sectStr+'</p>'+
                                        '<a href="javascript:;" class="toggle"><i class="iconfont icon_arrow">&#xe603;</i></a>'+
                                    '</div>'+
                                '</li>';
                                }else{
                                    htmlStr+='<li>'+   
                                    '<div class="new_content">'+
                                        '<div class="new_source clearfix">'+
                                            '<div class="new_item">'+
                                                    // '<img class="new_icon" src='+dataRes[i].source_img+'/>'+
                                                    // '<span class="new_name">'+dataRes[i].source_title+'</span>'+
                                            '</div>'+   
                                            '<a class="new_view" href='+ dataRes[i].source_url +'>查看来源</a>'+
                                        '</div>'+
                                        '<h2 class="new_title">'+dataRes[i].title+'</h2>'+
                                        '<p class="new_detial">'+sectStr+'</p>'+
                                        '<a href="javascript:;" class="toggle"><i class="iconfont icon_arrow">&#xe603;</i></a>'+
                                    '</div>'+
                                '</li>';
                                }
                            }   
                        } else{
                            // me.lock();
                            me.noData();
                        }
                        setTimeout(function(){
                            $(".new_list").append(htmlStr);
                            showAll();
                            me.resetload();
                        },2000);
                    }
                  })
                }
            });    
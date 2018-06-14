            //初始化参数
            function init(){
                var obj={
                    pageSize:0,
                    textStr:'',
                    dataRes:[],       
                    statusArr:[],
                    contentArr:[]
                }
                return obj;
            }  
            var obj=init();
            //日期格式化
            function getDateDiff(time) {
                var newTime = time.substring(0,10).replace(/\./g, "/");
                return newTime;    
            }; 
            //文章折叠切换
            function showAll(){
                var statusArr=obj.statusArr,
                    contentArr=obj.contentArr,
                    len=50;
                $('ul#thelist').on('click','a.toggle',function () {
                //点击按钮的时候改变开关的值
                var liIndex=$(this).parents('li').index();
                 if(!statusArr[liIndex]){
                    //展开
                    $(this).parents('li').find('p.new_detial').html(contentArr[liIndex]);
                    $(this).html('<i class="iconfont icon_arrow">&#xe613;</i>');
                    statusArr[liIndex]=true;
                 }else {
                     //收缩
                    var str = contentArr[liIndex].substring(0, len)+'...';
                    $(this).parents('li').find('p.new_detial').html(str);
                    $(this).html('<i class="iconfont icon_arrow">&#xe603;</i>');
                    statusArr[liIndex]=false;
                 }
             })
            }
            //获取url参数
            function getUrlParams(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
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
                    obj.pageSize++;
                    var htmlStr="",rptId=getUrlParams("id"); 
                    $.ajax({  
                    contentType: "application/json;charset=UTF-8",
                    type: "POST",
                    url: "http://yuqing.zhidaohulian.com/report/get_rpt_dtl", 
                    data: JSON.stringify({'rpt_id':rptId,'is_all':false,pageSize:obj.pageSize}), 
                    dataType: 'json',
                    success: function(data){ 
                        console.log(data);
                        obj.dataRes=data.result.data;
                        var dataRes=obj.dataRes,
                            textStr=obj.textStr,
                            contentArr=obj.contentArr,
                            sectStr="",
                            arrLen = dataRes.length,
                            len=50,
                            newsTime=getDateDiff(data.result.time);
                        $('.new_heading').text(data.result.rpt_name);
                        $('.new_time').text(newsTime);
                        if(dataRes.length>0){
                            for(var i=0;i<arrLen;i++){ 
                                textStr=dataRes[i].cont.replace(/\n/g,"<br>");
                                contentArr.push(textStr);
                                sectStr = textStr.substring(0, len)+'...';
                                if(dataRes[i].bgImg){
                                    htmlStr+='<li>'+  
                                    '<div class="new_content">'+
                                        '<div class="new_source clearfix">'+
                                            '<div class="new_item">'+
                                                '<img class="new_icon" src='+dataRes[i].source_img+'>'+
                                                '<span class="new_name">'+dataRes[i].source_title+'</span>'+
                                            '</div>'+   
                                            '<a href='+ dataRes[i].source_url +' class="new_view" >查看来源</a>'+
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
                                                '<img class="new_icon" src='+dataRes[i].source_img+'>'+
                                                '<span class="new_name">'+dataRes[i].source_title+'</span>'+
                                            '</div>'+   
                                            '<a  href='+ dataRes[i].source_url +' class="new_view">查看来源</a>'+
                                        '</div>'+
                                            '<h2 class="new_title">'+dataRes[i].title+'</h2>'+
                                            '<p class="new_detial">'+sectStr+'</p>'+
                                            '<a href="javascript:;" class="toggle"><i class="iconfont icon_arrow">&#xe603;</i></a>'+
                                    '</div>'+
                                '</li>';
                                }
                            }   
                        } else{
                            me.lock();
                            me.noData();
                        }
                        setTimeout(function(){
                            $(".new_list").append(htmlStr);
                            showAll();
                            me.resetload();
                        },1000);
                    }
                  })
                },
                threshold : 100
            });    
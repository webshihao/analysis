/*
* @Created Date:   2018-05-21 10:36:17
* @Author: yiche
* ------
* @Last Modified: 2018-06-13 10:06:34
* @Modified by:   huke
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
<template>
    <div>
        <div class="report_div">
            <input v-model="reportTitle" class="reportTitle" placeholder="请输入内容"/>
            <h2 class="time_h2">{{time}}</h2>
            <div class="cont_wrap" v-for="(article,index) in articleList" v-dragging="{item: article,list: articleList,group: 'article'}" :key="article.title" :class="{show_border:isDrag}">
                <input class="cont_num" disabled="true" type="text" v-model="article.rptOrder" @blur="sortList"><input class="title_input" v-model="article.title" disabled="true" /><img class="delImg" :src="delImg" @click="delArticle(article,index)" alt=""><textarea :class="{allWidth: !article.bgImg}" name="" id="" cols="30" rows="10" v-model="article.cont"></textarea><img v-if="article.bgImg" :src="article.bgImg" class="bg_img" alt="">
            </div>
            
        </div>
        <div class="btn_wrap">
            <div class="btn_arr">
                <el-button type="primary" @click="save" style="width:120px;border-radius:2px;">保存</el-button>
                <el-button type="default" @click="cancel" style="width:120px;border-radius:2px;">取消</el-button>
            </div>
            
        </div>
    </div>    
    
</template>
<script>
	import {
		ajaxGet,
		ajaxPost,
		getStore,
		setStore,
        containEle
	} from '@/util/util.js'
	import DropdownItem from '@/components/dropItem.vue'
	import SearchItem from '@/components/searchItem.vue'
    import heartOn from 'static/img/heart_on.png'
    import heartOff from 'static/img/heart_off.png'
    import addReport from 'static/img/addReport.png'
    import addReportImg from 'static/img/addReportImg.png'
    import delImg from 'static/img/delArticle.png'
	export default {
	    data() {
	        return {
    	        reportTitle: '',
                articleList: [],
                isDrag:false,
                time: '',
                delImg: delImg,
                items: [
                    {title: 'sdfsdf',url: 'http://www.baidu.com'},
                    {title: 'sdfsdssf',url: 'http://www.sogou.com'},
                    {title: 'sdfssdssf',url: 'http://www.sina.com'},
                    {title: 'sdfs2dssf',url: 'http://www.bilibili.com'}
                ]
	        }
	    },
	    components: {
	    	DropdownItem,
	    	SearchItem
	    },
	    created() {
            const id = this.$route.query.id;
	    	this.getReportData(id);
            this.saveLoop()
           
	    },
        watch: {

            // before
        },  
        beforeRouteLeave(to,from,next){
            clearTimeout(_timer);
            next()
        },
	    methods: {
            saveLoop(){
                const that = this;
                window._timer = null;
                var test = (function f(){
                    clearTimeout(_timer);
                    _timer = setTimeout(function(){
                        that.saveAjax(
                            function(ret_code){
                                if(ret_code == 0){
                                    that.$message({
                                        message: '自动保存成功',
                                        type: 'success'
                                    })
                                }else{
                                    that.$message.error('自动保存失败')
                                }
                            }
                        );
                        f();
                    }, 1000*5*60);
                })
                test();
            },
	    	getReportData(id){
                const url = '';
                const params = {
                    rpt_id: id,
                    pageSize: 1,
                    is_all: true
                };
                ajaxPost('/report/get_rpt_dtl',params).then((res)=>{
                    const { ret_code,msg,result } = res.data;
                    this.articleList = result.data;
                    const timeArr = result.time.split(" ")[0].split(".");
                    this.time = timeArr[0]+ '年' + timeArr[1] + '月' + timeArr[2] + '日';
                    this.reportTitle = result.rpt_name;
                });
            },
            delArticle(article,index){
                this.$confirm('确认要删除这条信息吗？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    this.articleList.splice(index,1);
                    this.articleList.forEach((value,index)=>{
                        value.rptOrder = index + 1;
                    })
                });
                
            },
            sortList(){
                this.articleList.sort(function(a,b){
                    return a.rptOrder - b.rptOrder;
                })

            },
            cancel(){
                this.$confirm('是否确认取消报告','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    // type:'delImg',
                }).then(()=>{
                    this.$router.push({path: '/home/rptLst'});
                });
            },
            saveAjax(callback){
                // 把order调整顺序
                this.articleList.forEach((item,index) => {
                    item.rptOrder = index + 1;
                });
                const params = {
                    rpt_id: this.$route.query.id,
                    rpt_name: this.reportTitle,
                    data: this.articleList
                };
                ajaxPost('/report/sav_rpt_dtl',params).then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    callback(ret_code);
                })
            },
            save(){
                const that = this;
                
                this.saveAjax(function(ret_code){
                    if(ret_code == 0){
                        clearTimeout(_timer);
                        that.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        // that.saveLoop();
                        that.$router.push({path: '/home/rptLst'})
                    }else{
                        that.$message.error('保存失败');
                    }
                }); 
                
            }
	    },
        mounted(){
            this.$dragging.$on('dragged', ({ value }) => {
                this.isDrag=true;
                value.list.forEach((item,index) => {
                    item.rptOrder = index+1;
                })
            })
            // this.isDrag=false;
        }
	}
</script>

<style scoped lang="less">
    .report_div {
        width: 90%;
        text-align: left;
        margin: 84px auto;
        background: #fff;
        padding: 40px;
        box-sizing: border-box;
        input {
            width: 100%;
            padding: 0 5px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #CFD0D1;
            outline: 0;
            box-sizing: border-box;
            font-family: Microsoft Yahei;
        }
        .reportTitle {
            height: 50px;
            padding: 13px 0 13px 20px;
            font-size: 18px;
            font-family: Microsoft Yahei;
        }
        .time_h2 {
            font-size: 14px;
            margin: 20px 0;
            color: #8e8e8e;
        }
        .cont_wrap {
            margin-bottom: 50px;
            position: relative;
            .cont_num {
                text-align: center;
                width: 5%;
                display: inline-block;
                box-sizing: border-box;
                background: #f9fafc;
                border-right: 0;
                border-bottom: 0;
                height: 50px;
            } 
            .title_input {
                width: 95%;
                padding: 0 5px;
                display: inline-block;
                height: 50px;
                line-height: 50px;
                border: 1px solid #CFD0D1;
                background: #F9FAFC;
                box-sizing: border-box;
                background: #f9fafc;
                border-bottom-color: transparent;
                font-size: 16px;
                color: #8e8e8e;
                cursor: move;
            }
            .delImg {
                width: 23px;
                height: 23px;
                position: absolute;
                top: 16px;
                right: 10px;
                cursor: pointer;
            }
            img {
                vertical-align: middle;
            }
            textarea {
                width: 74%;
                padding: 24px;
                height: 180px;
                border: 1px solid #CFD0D1;
                box-sizing: border-box;
                resize: none;
                color: #8e8e8e;
                font-family: Microsoft Yahei;
                &.allWidth {
                    width: 100%;
                }
            }
            .bg_img {
                width: 26%;
                height: 180px;
            }
        }
        
    }
    .show_border{
        border: 1px dashed #333;
    }
    .btn_wrap {
        text-align: right;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: #fff;
        line-height: 60px;
        border-top: 1px solid #CFD0D1;
        .btn_arr {
            padding-right: 5%;
        }
    }
    .el-icon-warning:before{
         background: url('');
    }
    
</style>
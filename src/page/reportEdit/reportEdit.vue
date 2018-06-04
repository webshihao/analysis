/*
* @Created Date:   2018-05-21 10:36:17
* @Author: yiche
* ------
* @Last Modified: 2018-06-01 16:31:34
* @Modified by:   yiche
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
<template>
    <div>
        <div class="report_div">
            <input v-model="reportTitle" placeholder="请输入内容"/>
            <h2 class="time_h2">{{time}}</h2>
            <div class="cont_wrap" v-for="(article,index) in articleList">
                <input class="cont_num" type="text" v-model="article.order" @blur="sortList"><input class="title_input" v-model="article.title" /><img class="delImg" :src="delImg" @click="delArticle(article,index)" alt=""><textarea name="" id="" cols="30" rows="10" v-model="article.cont"></textarea><img :src="article.bg_img" class="bg_img" alt="">
            </div>
            
        </div>
        <div class="btn_wrap">
            <div class="btn_arr">
                <el-button type="default" @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
            
        </div>
    </div>    
    
</template>

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
        }
        .time_h2 {
            margin: 20px 0;
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
            } 
            .title_input {
                width: 95%;
                padding: 0 5px;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                border: 1px solid #CFD0D1;
                background: #F9FAFC;
                box-sizing: border-box;
                background: #f9fafc;
            }
            .delImg {
                width: 23px;
                height: 23px;
                position: absolute;
                top: 11px;
                right: 10px;
                cursor: pointer;
            }
            img {
                vertical-align: middle;
            }
            textarea {
                width: 82%;
                padding: 5px;
                height: 180px;
                border: 1px solid #CFD0D1;
                box-sizing: border-box;
            }
            .bg_img {
                width: 18%;
                height: 180px;
            }
        }
        
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
	
</style>
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
            // window.onbeforeunload = function (e) {
            //     if (BaikeNew.unloadNotCheck) return;
            //     var msg = "您编辑的文章内容还没有保存！";
            //     if (BaikeNew.isIe) {
            //         window.event.returnValue = msg;
            //     }
            //     else {
            //         return msg;
            //     }
            // }
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
                    }, 1000*60*5);
                })
                test();
            },
	    	getReportData(id){
                const url = '';
                const params = {
                    rpt_id: id
                };
                ajaxPost('/yuqing/get_rpt_dtl',params).then((res)=>{
                    const { ret_code,msg,result } = res.data;
                    this.articleList = result.data;
                    this.time = result.time;
                    this.reportTitle = result.rpt_name;
                });
            },
            delArticle(article,index){
                this.$confirm('确认要删除这条信息吗？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.articleList.splice(index,1);
                    this.articleList.forEach((value,index)=>{
                        value.order = index + 1;
                    })
                });
                
            },
            sortList(){
                this.articleList.sort(function(a,b){
                    return a.order - b.order
                })
            },
            cancel(){
                this.$confirm('是否确认取消报告','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$router.push({path: '/home/rptLst'});
                });
            },
            saveAjax(callback){
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
                this.$alert('保存成功',{
                    confirmButtonText: '确定',
                    callback: action => {
                        this.saveAjax(function(ret_code){
                            if(ret_code == 0){
                                clearTimeout(_timer);
                                that.saveLoop();
                                that.$router.push({path: '/home/rptLst'})
                            }else{
                                that.$message.error('保存失败');
                            }
                        }); 
                    }
                });
            }
	    },
        mounted(){
            
        }
	}
</script>
/*
* @Created Date:   2018-05-21 10:37:19
* @Author: yiche
* ------
* @Last Modified: 2018-06-07 11:05:25
* @Modified by:   huke
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
<template>
    <div class="query_condition">
    	   <el-form :inline="true" class="demo-form-inline">
        		<el-form-item>
            			<el-date-picker
            			      v-model="dateArr"
            			      type="daterange"
            			      align="left"
            			      unlink-panels
            			      range-separator="至"
            			      start-placeholder="开始日期"
            			      end-placeholder="结束日期"
            			      value-format="yyyyMMdd"
            			      :picker-options="pickerOptions">
            			</el-date-picker>
        		</el-form-item>
    		    <el-form-item>
    			<div class="search_div" id="searchDiv">
    				<searchItem
    					:input_tips="input_tips"
    					:search_arr="searchGroup"
                        :show_dialog="show_dialog"
    					:prop_search_val="search_val"
                        @clearCommand="handleClear"
    					@changeSearch="handleChangeSearch"
    					@changeCommandRoot="handleChangeCommandRoot"
    				>
    					<img slot="search_icon" src="../../../static/img/search_icon.png" alt="">
    				</searchItem>
    			</div>
                <el-form-item class="clear"></el-form-item>
    		</el-form-item>
    	</el-form>
    	<div class="table_wrap">
    		<p class="table_p"></p>
    		<el-table
    			:fit="true"
                :highlight-current-row="true"
                @cell-mouse-enter="handleTableHover"
                @cell-mouse-leave="handleTableLeave"
    		    :data="reportListData"
    		    style="width: 100%">
    		    <el-table-column
    		      label="报告名称"
    		      align="left"
    		      prop="repName">
                  <template slot-scope="scope">
                    <a
                      target="_blank"
                      :href="'/static/newsDetail/report.html?id=' + scope.row.id "
                      >
                      {{scope.row.repName}}
                    </a>
                  </template>
    		    </el-table-column>
    		    <el-table-column
    		      label="时间"
    		      align="center"
    		      width="150"
    		      prop="createtime">
    		    </el-table-column>
    		    <el-table-column
    		      label="操作"
    		      align="center"
    		      width="150"
    		      prop="desc">
                    <template slot-scope="scope">
                       <!--  <el-row>
                            <img @click="handleDel(scope.$index,scope.row)" :src="del" alt="">
                            <img @click="handleEdit(scope.$index,scope.row)" :src="edit" alt="">
                        </el-row> -->
                        <el-button type="text" size="small" @click="handleDel(scope.$index,scope.row)">删除</el-button>
                        <el-button type="text" size="small" :disabled="scope.row.isTimeout" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                    </template>
    		    </el-table-column>
    		  </el-table>
    	</div>	
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
         width="30%"
        :modal="true"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDialog()">
        <template slot-scope="scope">
             <div style="height:40px;">是否确认删除这条报告？</div>
             <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" :disabled="isTipVisible" @click="selfConfirm(scope.$index,scope.row)">确 定</el-button>
             </div>
        </template>
  </el-dialog>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="5"
          :current-page="1"
          :total="total_num"
          @current-change="handleCurPage"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          style="float:right; margin-right:50px;"
          >
        </el-pagination>
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
    import edit from 'static/img/edit.png'
    import del from 'static/img/del.png'
	export default {
	    data() {
	        return {
    	        dateArr: [],
    	        pickerOptions: {
                  shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 0);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近七天',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近三十天',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }]
                },
                labelPosition:'left',
                searchGroup: [],
                searchObj: {},
                input_tips: '搜索策略',
                msg_count: 0,
                show_dialog: false,
                reportListData: [],
                dialogVisible: false,
                keyword: '',
                search_val: '',
                page_num: 1,
                total_num: 0,
                curDelId: 0,
                iscloseDialog: false,
                isTipVisible:false,
                edit:edit,
                del:del,
                queryParams: {
                }
	        }
	    },
	    components: {
	    	DropdownItem,
	    	SearchItem
	    },
	    created() {
	    	// 默认日期为今天
	    	this.dateArr = ['',''];
            // this.dateArr = [this.getCurDate(),this.getCurDate()];
            this.queryParams = this.getQueryParams();
            this.getDataTable(this.queryParams);
	    },
        watch: {
            'dateArr'(newVal,oldVal){
                // 首次加载时间时拿不到其他的query  所以不发table请求 
                if(oldVal.length != 2){
                    return;
                }
                this.queryParams = this.getQueryParams();
                this.getDataTable(this.queryParams);
            }
        },   
	    methods: {
            checkMsg(str) {
                this.$message({
                  type: 'warning',
                  showClose: true,
                  message: str
                });
            },
	    	// 获取当前日期
	    	getCurDate(){
	    		return new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2,"0") + new Date().getDate().toString();
	    	},
            // 获取报告列表
            getDataTable(params){
                // if (this.dateArr[0] && this.dateArr[1] && this.dateArr[0]>this.dateArr[1]){
                //     this.checkMsg('提交开始日期必须小于结束日期!');
                //     return;
                // }
                ajaxPost('/report/get_rpt_list',params).then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    console.log(res.data);
                    this.reportListData = result.data;
                    this.total_num = result.data_num;
                    this.page_num = result.page_num;
                });
            },
            getQueryParams(){
                this.queryParams.data_start = this.dateArr[0]; 
                this.queryParams.data_end = this.dateArr[1];
                this.queryParams.page_num = this.page_num;
                this.queryParams.keywd = this.keyword;
                return this.queryParams;
            },
            handleChangeCommandRoot(item,index,isShow){
                // debugger
                console.log(item,index,123123);
                this.keyword = item.name;
                this.show_dialog = isShow;
                this.search_val = item.name;
                this.queryParams = this.getQueryParams();
                this.getDataTable(this.queryParams);
            },
	    	handleChangeSearch(value,isShow){
                this.keyword = !!value ? value : '';  
                this.show_dialog = isShow; 
                const params = {
                    content: this.keyword
                };
                ajaxPost('/yuqing/get_search_list',params).then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    this.searchGroup = result.data;
                })
            },
            handleClear(item){
                const params = {
                    content: 'clear'
                };
                ajaxPost('/yuqing/get_search_list',params).then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        this.searchGroup = [];
                    }else{
                        this.$message.error(msg);
                    }
                    
                });
            },
            handleDel(index,value){
                console.log(index,value);
                this.dialogVisible = true;
                this.curDelId = value.id;
                console.log(this.curDelId);
                
            },
            handleEdit(index,value){
                console.log(value.id);
               this.$router.push({ path: '/reportEdit', query: { id: value.id } });
            },
            closeDialog(){
               this.iscloseDialog = true;
            },
            selfConfirm(){
                console.log('this.curDelId=>', this.curDelId);
                this.reportListData.splice(this.curDelId,1); 
                const params = {
                    rpt_id: this.curDelId
                };
                ajaxGet('/report/del_rpt',params).then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        this.queryParams = this.getQueryParams();
                        this.getDataTable(this.queryParams);
                    }
                });
                this.dialogVisible = false;
            },
            handleTableHover(row, column, cell, event){
                // cell.style.color = '#328BFF'
            },
            handleTableLeave(row, column, cell, event){
                // cell.style.color = '#606266'
            },
            getQueryParams(){
                this.queryParams.data_start = this.dateArr[0]; 
                this.queryParams.data_end = this.dateArr[1];
                this.queryParams.page_num = this.page_num;
                this.queryParams.keywd = this.keyword;
                return this.queryParams;
            },
            handleCurPage(val){
                this.page_num = val;
                this.queryParams = this.getQueryParams();
                this.getDataTable(this.queryParams);
            },
            handlePrevClick(val){
                this.page_num = val;
                this.queryParams = this.getQueryParams();
                this.getDataTable(this.queryParams);
            },
            handleNextClick(val){
                this.page_num = val;
                this.queryParams = this.getQueryParams();
                this.getDataTable(this.queryParams);
            }
	    },
        mounted(){
            this.$nextTick((ele)=>{
                const searchDom = document.getElementById('searchDiv');
                document.addEventListener('click',(e)=>{
                    if (!containEle(searchDom, e.target)) {
                        this.show_dialog = false;
                    }
                })
            })
        }
	}
</script>
<style scoped lang="less">
    clearfix:after{
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0;
    }
    .search_div {
        z-index: 9999;
    }
    .query_condition {
        height: 88px;
        background: #fff;
        .el-form-item {
            margin:20px 0 0 50px;
        }
        .el-form-item:first-child{
            float:left;
        }
        .el-form-item:last-child{
            float:right;
            margin-right:50px;
        }
        .clear{
            clear:both;
        }
        .table_wrap {
            margin: 0 50px;
            .table_p {
                height: 56px;
                line-height: 56px;
                text-align: left;
                b {
                    color: #f00;
                }
            }
        }
        .reportlist_div {
            cursor: pointer;
            height: 45px;
            line-height: 45px;
            &:hover {
                background: #f5f7fa;
            }
            span {
                display: inline-block;
            }
            img {
                display: inline-block;
                vertical-align: middle;
            }
        }
        .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
    }
</style>
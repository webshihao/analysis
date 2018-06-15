/*
* @Created Date:   2018-05-21 10:36:17
* @Author: yiche
* ------
* @Last Modified: 2018-06-15 10:27:43
* @Modified by:   huke
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
<template>
    <div class="query_condition">
    	<el-form :inline="true" class="demo-form-inline">
            <!-- <div> -->
                <!-- <span>时间</span> -->
            <el-form-item>
                <el-date-picker
                      v-model="dateArr"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyyMMdd"
                      :clearable="false"
                      :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <!-- </div> -->
    		
    		<el-form-item>
    			<dropdownItem
    			    :dropName="collectionObj.name"
    			    :dropdownItemData="collectionGroup" 
    			    @dropItemClick="clickCollection"
    			></dropdownItem>
    		</el-form-item>
    		<el-form-item>
    			<dropdownItem
    			    :dropName="competitiveObj.name"
    			    :dropdownItemData="competitiveGroup" 
    			    @dropItemClick="clickCompetitive"
    			></dropdownItem>
    		</el-form-item>
    		<el-form-item>
    			<dropdownItem
    			    :dropName="mediaObj.name"
    			    :dropdownItemData="mediaGroup" 
    			    @dropItemClick="clickMedia"
    			></dropdownItem>
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
                        @commandEnterRenderTable="handleEnterRenderTable"
    					@changeCommandRoot="handleChangeCommandRoot"
    				>
    					<img slot="search_icon" src="../../../static/img/search_icon.png" alt="" @click="clickRenderTable">
    				</searchItem>
    			</div>
    		</el-form-item>
    	</el-form>
    	<div class="table_wrap" id="table_wrap">
    		<p class="table_p">根据条件已经为您筛选出了<b>{{msg_count}}</b>条信息</p>
    		<el-table
    			:fit="true"
                :highlight-current-row="true"
                @cell-mouse-enter="handleTableHover"
                @cell-mouse-leave="handleTableLeave"
    		    :data="tableData"
    		    style="width: 100%;padding: 0 30px;">
    		    <el-table-column type="expand" align="left">
    		      <template slot-scope="props">
    		        <el-form label-position="left" inline class="demo-table-expand">
    		          <el-form-item label="" align="left">
    		            <span>{{ props.row.abst }}</span>
    		          </el-form-item>
    		        </el-form>
    		      </template>
    		    </el-table-column>
    		    <el-table-column
    		      label="标题"
    		      align="left"
                  show-overflow-tooltip
    		      prop="title">
                    <template slot-scope="scope">
                      <a
                        target="_blank"
                        :href="scope.row.url"
                        >
                        {{scope.row.title}}
                      </a>
                    </template>
    		    </el-table-column>
    		    <el-table-column
    		      label="来源"
    		      align="left"
    		      width="150"
    		      prop="source">
    		    </el-table-column>
    		    <el-table-column
    		      label="媒体类型"
    		      align="left"
    		      width="150"
    		      prop="media_type">
    		    </el-table-column>
    		    <el-table-column
    		      label="时间"
    		      align="left"
    		      width="150"
    		      prop="time">
    		    </el-table-column>
    		    <el-table-column
    		      label="相似文章"
    		      align="left"
    		      width="150"
    		      prop="rep_num">
    		    </el-table-column>
    		    <el-table-column
    		      label="操作"
    		      align="left"
    		      width="150"
    		      prop="desc">
                    <template slot-scope="scope">
                        <el-row class="imgWrap">
                            <img @mouseover="overHeart($event)" @mouseout="outHeart($event)" @click="handleCollect(scope.$index,scope.row)" :src=" scope.row.opr_id == 1 ? heartOn : heartOff " alt="">
                            <img @mouseover="overReport($event)" @mouseout="outReport($event)" @click="handleReport(scope.$index,scope.row)" :src="addReport" class="edit_img" alt="">
                        </el-row>
                        
                    </template>
    		    </el-table-column>
    		  </el-table>
    	</div>	
    	<el-dialog
          title="添加报告"
          :visible.sync="dialogVisible"
          width="25%"
          >
          <div class="reportWrap">
              <div v-for="report in reportList" class="reportlist_div" @click="handleChangeReport(report)" :class="{checked: report.isChecked}" >
                  <span>{{report.name}}</span><img v-if="report.isChecked" :src="addReportImg" alt="">
              </div>
          </div>
          
          <div>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
          
        </el-dialog>
        <pagination
            :page_num="page_num"
            :total_num="total_num"
            @commandCurPage="handleCurPage"
            @commandPrevClick="handlePrevClick"
            @commandNextClick="handleNextClick"
        >
        </pagination>
    </div>
</template>

<style scoped lang="less">
	.search_div {
		z-index: 9999;
	}
	.query_condition {
		height: 88px;
		background: #fff;
		.el-form-item {
			margin-top: 20px;
		}
		#table_wrap {
			margin: 0 50px;
			.table_p {
				height: 56px;
				line-height: 56px;
				text-align: left;
				b {
					color: #f00;
				}
			}
            .imgWrap {
                img {
                    cursor: pointer;
                    position: relative;
                    top: 4px;
                    &.edit_img {
                        position: relative;
                        margin-left:10px;
                    }
                }
            }

            
            .demo-table-expand {
                text-align: left !important;
                color: #333;
                .el-form-item {
                    margin-top: 0;
                    margin-bottom: 0;
                    .el-form-item__content {
                        line-height: 30px;
                    }
                }
                
            }
            .el-table__body-wrapper {
                .el-table__row {
                    .cell {
                        a {
                            
                            &:link {
                                color: #333;
                            }
                            &:visited {
                                color: #8e8e8e!important;
                            }
                            &:hover {
                                color: #328BFF;
                                text-decoration: underline;
                            }
                            &:active {
                                color: #f00;
                            }
                        }
                    }
                }
            }
            
		}
        .reportWrap {
            height: 226px;
            overflow-y: auto;
        }
        .reportlist_div {
            cursor: pointer;
            height: 45px;
            line-height: 45px;
            color: #333;
            &:hover {
                color: #328BFF;
                background: #F8FCFF;
            }
            &.checked {
                color: #999;
            }
            span {
                display: inline-block;
            }
            img {
                width: 24px;
                height: 24px;
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
	import Pagination from '@/components/pagination.vue'
    import heartOn from 'static/img/heart_on.svg'
    import heartHover from 'static/img/heart_hover.svg'
    import heartOff from 'static/img/heart_off.svg'
    import addReport from 'static/img/addReport.svg'
    import addReportHover from 'static/img/addReportHover.svg'
    import addReportImg from 'static/img/addReportImg.png'
	export default {
	    data() {
	        return {
    	        dateArr: [],
    	        pickerOptions: {
                     disabledDate(time) {
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        // // return time.getTime() > Date.now() - 8.64e6;
                        // return [start,end]
                        // return time.getTime() < this.start;    
                  },
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
	        	competitiveGroup: [],
                collectionGroup: [],
                mediaGroup: [],
                searchGroup: [],
                collectionObj: {},
                competitiveObj: {},
                mediaObj: {},
                searchObj: {},
                input_tips: '搜索策略',
                msg_count: 0,
                show_dialog: false,
                tableData: [],
                heartOff: heartOff,
                heartOn: heartOn,
                heartHover: heartHover,
                addReport: addReport,
                addReportHover: addReportHover,
                addReportImg: addReportImg,
                dialogVisible: false,
                reportList: [],
                inputVisible: false,
                inputValue: '',
                opiId: 0,
                isShowNewTag: true,
                keyword: '',
                search_val: '',
                page_num: 1,
                total_num: 0,
                isChecked: false,
                queryParams: {}
	        }
	    },
	    components: {
	    	DropdownItem,
	    	SearchItem,
            Pagination
	    },
	    created() {
	    	var p1 = this.getCompetitiveList();
	    	var p2 = this.getCollectionList();
	    	var p3 = this.getMediaList();
	    	// 默认日期为今天
	    	this.dateArr = [this.getPrevDate(),this.getCurDate()];
	    	Promise.all([p1,p2,p3]).then((res)=>{
                this.queryParams = this.getQueryParams();
	    		this.getDataTable(this.queryParams);
	    	})
	    },
        watch: {
            'reportList'(newVal){
                if(newVal.length >= 5){
                    this.isShowNewTag = false;
                }else{
                    this.isShowNewTag = true;
                }
            },
            'dateArr'(newVal,oldVal){
                // 首次加载时间时拿不到其他的query  所以不发table请求 
                if(oldVal.length != 2){
                    return;
                }
                this.queryParams = this.getQueryParams(true);
                this.getDataTable(this.queryParams);
            }
            
        },   
	    methods: {
	    	// 获取上个月日期
            getPrevDate(){

                const customDate = new Date().getTime() - 3600 * 1000 * 24 * 30;
                return new Date(customDate).getFullYear().toString() + (new Date(customDate).getMonth() + 1).toString().padStart(2,"0") + new Date(customDate).getDate().toString().padStart(2,"0");
            },
            // 获取当前日期
	    	getCurDate(){
	    		return new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2,"0") + new Date().getDate().toString().padStart(2,"0");
	    	},
	    	// 获取竞品列表
	    	getCompetitiveList(){
	    		return ajaxGet('/yuqing/get_cmp_lst').then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        this.competitiveGroup = result.data;
                        this.competitiveObj = this.competitiveGroup[0];
                        return this.competitiveObj;    
                    }else{
                        this.$message.error(msg);
                    }
	    			
	    		})
	    	},
	    	// 获取收藏列表
	    	getCollectionList(){
	    		return ajaxGet('/yuqing/get_col_list').then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        const {ret_code,msg,result} = res.data;
                        this.collectionGroup = result.data;
                        this.collectionObj = this.collectionGroup[0];
                        return this.collectionObj;
                    }else{
                        this.$message.error(msg);
                    }
	    			
	    		})
	    	},
	    	// 获取媒体类型列表
	    	getMediaList(){
	    		return ajaxGet('/yuqing/get_media_list').then((res)=>{
	    			const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        this.mediaGroup = result.data;
                        this.mediaObj = this.mediaGroup[0];
                        return this.mediaObj;
                    }else{
                        this.$message.error(msg);
                    }
	    		})
	    	},
	    	clickCollection(item){
	    		this.collectionObj = item;
                this.queryParams = this.getQueryParams(true);
                this.getDataTable(this.queryParams);
	    	},
	    	clickCompetitive(item){
	    		this.competitiveObj = item;
                this.queryParams = this.getQueryParams(true);
                this.getDataTable(this.queryParams);
	    	},
	    	clickMedia(item){
	    		this.mediaObj = item;
                this.queryParams = this.getQueryParams(true);
                this.getDataTable(this.queryParams);
	    	},
            // isShow为是否展示下拉框
	    	handleChangeSearch(value,isShow){
                // 这样写为了防止给后端传undefined
                this.keyword = !!value ? value : '';  
                this.show_dialog = isShow; 
                const params = {
                    content: this.keyword
                };
                ajaxPost('/yuqing/get_search_list',params).then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        this.searchGroup = result.data;
                    }else{
                        this.$message.error(msg);
                    }
                })
                // if(!!value){
                //     this.queryParams = this.getQueryParams()
                //     this.getDataTable(this.queryParams)
                // }
            },
            handleChangeCommandRoot(item,index,isShow){
                this.keyword = item.name;
                this.show_dialog = isShow;
                this.search_val = item.name;
                this.queryParams = this.getQueryParams(true);
                this.getDataTable(this.queryParams);
            },
	    	// 获取舆情列表
	    	getDataTable(params){

	    		const url = '/yuqing/get_opi_list';
	    		ajaxPost(url,params).then((res)=>{
	    			const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        this.tableData = result.data;
                        this.msg_count = result.totle_num;
                        this.page_num = result.page_num;
                        this.total_num = result.totle_num;
                    }else{
                        this.$message.error(msg);
                    }
	    			
	    		});
	    	},
            handleCollect(index,value){
                // 渲染table的时候 1 是 收藏 2 是 未收藏
                // 点击此按钮  如果当前是1 那就传2  
                this.opiId = value.opi_id;
                // console.log('收藏=>',value)
                const url = '/yuqing/do_collect';
                const typeNum = value.opr_id == 1 ? 2 : 1;
                const params = {
                    opi_id: value.opi_id,
                    type: typeNum   //1 添加 2 取消 
                };
                ajaxGet(url,params).then((res)=>{
                    const {ret_code,msg} = res.data;
                    if(ret_code == 0){
                        value.opr_id = typeNum;
                    }else{
                        this.$message.error(msg);
                    }
                });
            },
            handleReport(index,value){
                this.opiId = value.opi_id;
                this.dialogVisible = true;
                const params = {
                    id: value.opi_id 
                };
                ajaxGet('/yuqing/get_rpt_name_list',params).then((res)=>{
                    const {ret_code,msg,result} = res.data;
                    if(ret_code == 0){
                        this.reportList = result.data;
                    }else{
                        this.$message.error(msg);
                    }
                })
                // console.log(index,value)
            },
            handleChangeReport(report){
                if(report.isChecked){
                    return;
                }
                const params = {
                    opi_id: this.opiId,
                    rpt_id: report.id
                };
                ajaxGet('/yuqing/add_opi_to_rpt',params).then((res)=>{
                    const { ret_code,msg } = res.data;
                    if(ret_code == 0){
                        report.isChecked = true;
                    }else{
                        this.$message.error(msg);
                    }
                });
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm(){
                let inputValue = this.inputValue;
                const params = {
                    rpt_name: inputValue,
                    opi_id: this.opiId
                };
                // 查看是否有已存在的报告
                const isRepeat = this.reportList.some(value => value.name == inputValue); 
                if(isRepeat){
                    this.$message.error('请勿输入重复报告名称');
                    return false;
                }
                if(inputValue && !isRepeat){
                    ajaxGet('/yuqing/add_single_rpt',params).then((res)=>{
                        const { ret_code,msg,result } = res.data;
                        if(ret_code == 0){
                            this.reportList = result.data;
                        }else{
                            this.$message.error(msg);
                        }
                    });
                    
                    this.inputValue = '';
                }
                this.inputVisible = false;
            },
            handleTableHover(row, column, cell, event){
                // cell.style.color = '#328BFF'
            },
            handleTableLeave(row, column, cell, event){
                // cell.style.color = '#606266'
            },
            // 拿到渲染table所有的参数
            getQueryParams(pageToOne){
                this.queryParams.data_start = this.dateArr[0]; 
                this.queryParams.data_end = this.dateArr[1];
                // 当改变任意筛选条件时page_num = 1
                this.queryParams.page_num = !!pageToOne ? 1 : this.page_num;
                this.queryParams.cmp_id = this.competitiveObj.id;
                this.queryParams.media_id = this.mediaObj.id;
                this.queryParams.opr_id = this.collectionObj.id;
                this.queryParams.keywd = this.keyword;
                // console.log('this.collectionObj.id=>',this.collectionObj.id);
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
            // 点击搜索小图标
            clickRenderTable(){
                this.show_dialog = false;
                this.queryParams = this.getQueryParams(true);
                this.getDataTable(this.queryParams);
            },
            // 点击回车
            handleEnterRenderTable(val){
                this.show_dialog = false;
                this.keyword = val;
                this.queryParams = this.getQueryParams(true);
                this.getDataTable(this.queryParams);               
            },
            overHeart(event){
                if(event.target.src == this.heartOn) return;
                event.target.src = this.heartHover;
            },
            outHeart(event){
                if(event.target.src == this.heartOn) return;
                event.target.src = this.heartOff;
            },
            overReport(event){
                event.target.src = this.addReportHover;
            },
            outReport(event){
                event.target.src = this.addReport;
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
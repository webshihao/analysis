/*
* @Created Date:   2018-06-12 18:26:19
* @Author: huke
* ------
* @Last Modified: 2018-06-13 09:23:40
* @Modified by:   huke
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
<template>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :current-page="prop_num"
      :total="total_num"
      @current-change="handleCurPage"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      style="float:right; margin-right:68px;margin-top: 26px;"
      >
    </el-pagination>
</template>
<style lang="less">
    .el-pagination {
    	&.is-background {
    		.btn-prev,.btn-next {
    			width: 42px;
    			height: 32px;
    			border: 1px solid #CFD0D1;
    			border-radius: 6px;
    			background: #fff;
    		}
    		.el-pager {
    			.btn-quicknext,.btn-quickprev {
    				height: 32px;
    				line-height: 32px;
    			}
    			.number {
    				width: 42px;
    				height: 32px;
    				line-height: 32px;
    				background: #FFFFFF;
    				border: 1px solid #CFD0D1;
    				border-radius: 6px;
    				&.active {
    					background: #2ED3A8;
    					border: 1px solid transparent;
    					border-radius: 6px;
    				}
    			}
    		}
    	}
    	
    }
</style>
<script>
    export default {
        props: {
            // 父组件请求回来的顶部导航数据
            page_num: {
                type: Number,
                default: 0
            },
            // 当前选中索引
            total_num: {
                type: Number,
                default: 0
            }
            
        },
        data(){
        	return {
                prop_num: this.page_num
            }
        },
        methods: {
            handleCurPage(val){
            	this.$emit('commandCurPage',val);
            },
            handlePrevClick(val){
            	this.$emit('commandPrevClick',val);
            },
            handleNextClick(val){
            	this.$emit('commandNextClick',val);
            }
        }
    }
</script>
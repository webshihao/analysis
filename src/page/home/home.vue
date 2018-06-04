/*
* @Created Date:   2018-05-21 10:35:42
* @Author: yiche
* ------
* @Last Modified: 2018-05-23 15:13:27
* @Modified by:   yiche
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
<template>
	<div>
	    <my-header
			:topNav="topNav"
			:counter="counter"
			@handlerTopNav="triggerTopNav"
	    >
	    	<h2 class="header_logo" slot="logo">舆情分析</h2>
	    	<p class="header_info" slot="info">{{username}}</p>
	    </my-header>
	    <router-view></router-view>
	    
	    
	</div>	
    
</template>

<style scoped lang="less">
	.header_logo {
		background-color: #2e3254;
		color: #fff;
		height: 55px;
		line-height: 55px;
		width: 200px;
		font-size: 16px;
	}
	.header_info {
		margin-left: auto;
	    color: #fff;
	    padding-right: 30px;
	    font-size: 16px;
	    line-height: 55px;
	}
	
</style>
<script>
	import {
		ajaxGet,
		ajaxPost,
		getStore,
		setStore
	} from '@/util/util.js'
	import MyHeader from '@/components/myHeader.vue'
	export default {
	    data() {
	        return {
	        	counter: 0,
	        	username: '',
	        	topNav: [
	        		{id: 1,name: 'pubOpi',description: '实时舆情'},
	        		{id: 2,name: 'rptLst',description: '报告列表'}
	        	],
    	        
	        }
	    },
	    components: {
	    	MyHeader,
	    	
	    },
	    created() {
	    	this.getUser();
	    	
	    },
	    methods: {
	    	getUser(){
	    		this.username = getStore('username')
	    	},
	    	
	    	triggerTopNav(item,index){
	    		this.counter = index;
	    	},
	    	
	    }
	}
</script>
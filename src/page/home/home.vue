/*
* @Created Date:   2018-05-21 10:35:42
* @Author: yiche
* ------
* @Last Modified: 2018-06-13 17:38:21
* @Modified by:   huke
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
	    	<div class="header_info" slot="info">
	    		<p class="text">{{username}}</p>
	    		<img class="arrowdown" src="../../../static/img/arrowdown_white.svg" alt="">
	    		<ul>
	    			<li @click="exit">退出</li>
	    		</ul>
	    	</div>

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
		cursor: pointer;
		margin-left: auto;
	    padding-right: 50px;
	    font-size: 16px;
	    line-height: 55px;
	    position: relative;
	    &:hover {
	    	ul {
	    		display: block;
	    	}
	    }
		.text { 
	    	color: #fff;
			margin-right: 28px;
		}
	    .arrowdown {
	    	position: absolute;
	    	top: 16px;
	    	right: 50px;

	    }
	    ul {
	    	background: #2e3254;
    	    width: 100px;
    	    height: 40px;
    	    line-height: 40px;
    	    position: absolute;
    	    color: #fff;
    	    top: 55px;
    	    right: 53px;
    	    z-index: 1000;
    	    display: none;
    	    li {
    	    	cursor: pointer;
    	    }
	    }

	}
	
</style>
<script>
	import {
		ajaxGet,
		ajaxPost,
		getStore,
		setStore,
		getLocal,
		setLocal,
		removeLocal,
		delCookie
	} from '@/util/util.js'
	import MyHeader from '@/components/myHeader.vue'
	export default {
	    data() {
	        return {
	        	counter: getStore('nav_index') ? +getStore('nav_index') : 0,
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
	    		setStore('nav_index',index);
	    	},
	    	exit(){
	    		delCookie('user_cookie');
	    		this.$router.push({path: '/'});
	    	}
	    }
	}
</script>
/*
* @Created Date:   2018-05-17 17:41:39
* @Author: yiche
* ------
* @Last Modified: 2018-06-12 10:18:38
* @Modified by:   huke
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
<template>
	<div class="container" id="container">
		<div class="login_bg"></div>
		<!-- <img class="login_bg" :src="login_bg" alt=""> -->
		<div class="content">
			<h2>账号登陆</h2>
			<div class="login__pane">
			    <div class="user_name input_box">
			        <div class="returnInfo">
			            <span>{{returnInfo}}</span>
			        </div>
			        <img src="../../../static/img/user.svg" />
			        <input type="text" v-model="username" placeholder="用户名"/>
			    </div>
			    <div class="user_pwd input_box">
			        <img src="../../../static/img/pass.svg" />
			        <input type="password" v-model="password"  placeholder="密码" />
			    </div>
			    <div class="checkCode input_box">
			        <img src="../../../static/img/code.svg"/>
			            <input type="text" v-model="codeNum" placeholder="验证码"/>
			        <div class="checkImg float" @click="setImg">
			            <img :src="imgSrc" alt="">
			        </div>
			    </div>
			    <div class="rember_pwd">
			        <img :src="is_save_userinfo ? rember_pwd1 : rember_pwd" @click="change_save"/>
			        <span @click="change_save">记住密码</span>
			    </div>
			    <div class="do_login" @click="click_submit">
			        <span>登录</span>
			    </div>
			    
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		.login_bg {
			flex: 3;
			width: 100%;
			height: 100%;
			background: url(../../../static/img/login.png);

			background-size: cover;
		}
		.content {
			flex: 2;
			h2 {
				
			}
			.login__pane{
			    padding-top: 28px;
			    font-size: 14px;
			    color: #EC3333;
			    letter-spacing: -0.41px;
			    margin: 0 auto;
			    width: 70%;
			    .input_box{
			        position: relative;
			        padding-left: 17px;
			        padding-bottom: 5px; 
			        margin-top: 10px;   
			        box-sizing: border-box;
			        line-height: 40px;
			        height: 40px;
			        text-align: left;
			        border: 1px solid #ebebeb;
			        background: #FFFFFF;
			        border-radius: 2px;
			        .returnInfo{
			            position: absolute;
			            top: -42px;
			            left:0px;
			        }
			        img{
			            vertical-align: middle;
			        }
			        input{
			            border: none;
			            outline: none;
			            height: 20px;
			            margin-left:14px;
			            letter-spacing: -0.37px;
			            font-family: 'Microsoft YaHei';
			            font-size: 14px;
			            color: #333333;
			            letter-spacing: -0.37px;
			        }
			    }
			    .rember_pwd{
			        margin-top: 15px;
			        height: 25px;
			        line-height: 25px;
			        display: flex;
			        align-items: center;
			        img{
			            width: 15px;
			            height: 15px;
			            cursor: pointer;
			            vertical-align: middle;
			            border-radius: 2px;
			        }
			        span{
			            font-family: MicrosoftYaHei;
			            font-size: 12px;
			            color: #666666;
			            letter-spacing: -0.37px;
			            margin-left: 8px;
			            cursor: pointer;
			            display: inline-block;
			            &.forget_pass {
			                margin-left: 200px;
			            }
			        }
			    }
			    .checkCode{
			        height: 40px;
			        margin-top: 10px;
			        font-size: 16px;
			        color: #606060;
			        letter-spacing: -0.37px;
			        line-height: 37px;
			        overflow: hidden;
			        span{
			            margin-right: 8px;
			        }
			        .checkInput{
			            margin-right: 16px;
			            input{
			                width: 122px;
			                height: 28px;
			                margin-right: 16px;
			                border: 1px solid #EBEBEB;
			                border-radius: 2px;
			                margin: 0;
			                padding: 0;
			                outline: none;
			            }
			            
			        }
			        .checkImg{
			            width: 100px;
			            height: 30px;
			            margin: 0;
			            cursor: pointer;
			            // float: right;
			            margin: -1px 3px;
			            position: absolute;
			            right: 0;
			            top: 0;
			            img{
			                width: 100%;
			                height: 100%;
			            }
			        }
			    }
			    .do_login{
			        width: 100%;
			        height: 43px;
			        margin: 0 auto;
			        margin-top: 25px;
			        background: #528DFF;
			        border-radius: 2px;
			        text-align: center;
			        cursor: pointer;
			        span{
			            font-size: 18px;
			            color: #FFFFFF;
			            letter-spacing: -0.41px;
			            line-height: 43px;
			        }
			    }
			    img{
			        margin: 0;
			    }
			} 
		}
	}

</style>
<script>
	import login_bg from 'static/img/login.png' 
	import rember_pwd1 from 'static/img/rember_pwd1.svg' 
	import rember_pwd from 'static/img/rember_pwd.svg' 
	import codeImg from 'static/img/verifyCode.jpeg' 
	import {
		ajaxGet,
		ajaxPost,
		getStore,
		setStore
	} from '@/util/util.js'
	export default {
	    data() {
	        return {
	        	login_bg: login_bg,
	        	rember_pwd: rember_pwd,
	        	rember_pwd1: rember_pwd1,
	        	codeImg: codeImg,
	        	username: '',
	        	imgSrc: '',
	        	is_save_userinfo: false,
	        	password: '',
	        	returnInfo: '',
	        	codeNum: ''
	        }
	    },
	    components: {
	    },
	    created() {
	    	if(getStore('password')){
	    		this.password = getStore('password');
	    	}
	    	this.setImg();
	    },
	    mounted(){
	    	this.$nextTick(()=>{
	    	    let height = document.body.clientHeight;
	    	    document.getElementById('container').style.height = height + 'px';
	    	})
	    },
	    methods: {
	    	page_jump(str){
	            this.$router.push({path:str});
	        },
	    	// 验证码
	    	setImg(){
	    		var data = new Date().getTime();
	    		this.imgSrc = '/login/get_vcode?' + data;
	    	},
	    	// 提交
	    	click_submit(event){
	    		const params = {
	    			user: this.username,
	    			pass: this.password,
	    			code: this.codeNum
	    		};
	    		if(this.codeNum == ''){
	    			this.returnInfo = '请输入验证码';
	    			return false;
	    		}
	    		ajaxPost('/login/user_login',params).then((res)=>{
	    			let {ret_code,msg,result} = res.data;
	    			if(ret_code == 0){
	    				setStore('username',this.username)
	    				this.page_jump('/home');
	    			}else{
	    				this.returnInfo = msg;
	    				this.setImg();
	    			}
	    		}).catch((err)=>{
	    			console.log(err);
	    		})
	    	},
	    	// 记住密码
	    	change_save(){
	    		this.is_save_userinfo = !this.is_save_userinfo;
	    		setStore('password',this.password);
	    	}
	    }
	}
</script>
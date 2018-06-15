<template>
    <header id="myHeader" class="mod-myHeader">
      <slot name="logo"></slot>
      <div class="nav">
        <slot name="media"></slot>
        <div class="topnav"
            v-for="(item,index) in topNav"
            :class="{'nav-link-active':index == counter}"
            :key="item.id"
            @click.stop="handlerTopBar(item,index)"
            >
            <router-link class="navtitle" :to="{path:'/'+defaultRoot+'/'+item.name}">{{item.description}}</router-link>
        </div>
        <slot name="info"></slot>
      </div>
    </header>
</template>
<style lang="less">
    .mod-myHeader {
        display: flex;
        height: 55px;
        box-sizing: border-box;
        align-items: center;
        width: 100%;
        .nav {
            flex: 1;
            height: 55px;
            display: flex;
            align-content: space-around;
            background-color: #2e3254;
            margin-left: -2px;
            .topnav {
                cursor: pointer;
                width: 124px;
                height: 55px;
                line-height: 55px;
                text-align: center;
                .navtitle {
                    font-size: 14px;
                    font-family: 'MicrosoftYaHei';
                    font-weight: 400;
                    color: #FFFFFF;
                    letter-spacing: -0.33px;
                    text-decoration: none;
                    display: block;
                    &.link-active {
                        color: #00F8B7;
                    }
                }
            }
            .nav-link-active {
                background: #0C1036;
            }
            .topnav:hover{
                background-color: #0C1036;
            }
        }
    }
</style>
<script>
    export default {
        props: {
            // 父组件请求回来的顶部导航数据
            topNav: {
                type: Array
            },
            // 当前选中索引
            counter: {
                type: Number,
                default: 0
            },
            // 根路径
            defaultRoot: {
                type: String,
                default: 'home'
            }
        },
        data(){
            return {
                
            }
        },
        methods: {
            // 顶部nav路由跳转
            handlerTopBar(item,index){
                // 将该值传给父组件，判断是否有左侧nav
                this.$emit("handlerTopNav",item,index);
            }
        }
    }
</script>

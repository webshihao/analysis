<template>
    <div class="input-wrap" @click="searchClick($event)">
        <input type="text" v-model="search_val" @keyup.enter="enterClick(search_val)" @keydown.down.prevent="selectDown"
    @keydown.up.prevent="selectUp"  :placeholder="input_tips">
    <ul>
        <slot name="search_icon" ></slot>
        <div class="dialog_wrap" v-show="show_dialog">
            <ul class="search-wrap">
                <template v-for="(root_item,root_index) in search_arr">
                    <li class="root_li" :class="{curli:now==root_index}" @click="commandClickRoot(root_item,root_index)">{{root_item.name}}</li>
                    <template v-if="root_item.children" v-for="(item,index) in root_item.children">
                        <li class="title_li" @click="commandClick(item,index)">{{item.name}}</li>
                    </template>
                </template>
            </ul>
            <span class="clear" @click="clearClick">清空历史数据</span>
        </div>
        </ul>
    </div>
</template>

<script>
    import { containEle,throttle } from '@/util/util.js'
    export default {
        props: {
            search_arr: {
                type: Array,
                default: []
            },
            show_dialog: {
                type: Boolean,
                default: false
            },
            input_tips: {
                type: String,
                default: '请输入'
            },
            prop_search_val: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                search_val: '',
                // 三种状态
                isClick: true,    //点击div
                isSearch: false,  //搜索
                isChoose: false,  //点击li
                now: -1,
                flag:false
            }
        },
        watch:{
            // 当下拉为空时 回退至-1
            'search_arr'(newVal){
                if(newVal.length == 0){
                    this.now = -1;
                }
            },
            'search_val': throttle(function(newVal) { 
                // 判断是否是keyup keydown还是手动输入  通过判断every 
               this.flag = this.search_arr.some((item)=>item.name == newVal);
               this.isChoose ? this.isSearch = false : this.isSearch = true;
               if(!this.flag){
                this.$emit('changeSearch',newVal.toLowerCase(), this.isSearch);
               }
            }, 500),

        },
        methods: {
           searchClick(event){
               // 防止事件冒泡
               this.flag = false;
               if(event.target.nodeName == 'INPUT'){
                   this.isChoose = false;
                   this.isSearch = false;
                   this.$emit('changeSearch',this.search_val,this.isClick);
               }
           },
           selectDown() {
            if(this.search_arr.length == 0) return false;
            this.flag=true;
            if(this.flag) {
                    this.now++;
                    if(this.now==this.search_arr.length)this.now=0;
                    this.search_val=this.search_arr[this.now].name;
                }
            },
           selectUp(){
            if(this.search_arr.length == 0) return false;
            this.flag=true;
            if(this.flag) {
                this.now--;
                if(this.now==-2 || this.now==-1)this.now=this.search_arr.length-1;
                this.search_val=this.search_arr[this.now].name;
            }
           },
           commandClick(item,index){
               this.$emit('changeCommand',item,index);
           },
           commandClickRoot(item,index){
               this.search_val = item.name;   
               this.$emit('changeCommandRoot',item,index,this.isChoose);
               this.isChoose = true;                                           
            },
            clearClick(){
                this.$emit('clearCommand',this.search_arr);
            },
            enterClick(val){
                this.$emit('commandEnterRenderTable',val);
            }
        }
    }
</script>
<style lang="less">
    .input-wrap {
        width: 288px;
        height: 29px;
        float: right;
        display: inline-block;
        padding: 0 6px;
        box-sizing: border-box;
        position: relative;
        z-index: 10;
        input {
            width: 288px;
            background: #FFFFFF;
            border: 1px solid #CFD0D1;
            border-radius: 4px;
            outline: 0;
            font-size: 14px;
            line-height: 40px;
            height: 40px;
            padding-left: 10px;
            box-sizing: border-box;
        }
        img {
            width: 22px;
            height: 22px;
            position: absolute;
            right: 5px;
            top: 11px;
        }
        .dialog_wrap {
            width: 288px;
            height: 178px;
            position: relative;
            .search-wrap {
                width: 288px;
                height: 168px;
                overflow-y: auto;
                box-shadow: 0 3px 6px 0 rgba(0,0,0,0.10);
                border-radius: 2px;
                background: #fff;
                position: absolute;
                li {
                    width: 100%;
                    height: 28px;
                    line-height: 28px;
                    text-align: left;
                    font-size: 13px;
                    background: #fff;
                    color: #606060;
                    border: 0;
                    &.root_li,&.curli {
                        text-indent: 1em;
                    }
                    &.curli {
                        background-color:#eee;
                    }
                    &.root_li{
                        &:hover {
                            background-color:#eee; 
                        }
                        
                    }
                    &.title_li {
                        text-indent: 2em;
                        &:hover {
                            background: #f5f5f5;
                            cursor: pointer;
                        }
                    }
                }
            }
            .clear {
                cursor: pointer;
                position: absolute;
                bottom: 6px;
                left: 13px;
                font-size: 12px;
            }
        }
        
    }
</style>
<template>
    <div class="input-wrap" @click="searchClick($event)">
        <input type="text" v-model="search_val" @keyup.enter="enterClick(search_val)" :placeholder="input_tips">
        <slot name="search_icon" ></slot>
        <div class="dialog_wrap" v-show="show_dialog">
            <ul class="search-wrap">
                <template v-for="(root_item,root_index) in search_arr">
                    <li class="root_li" @click="commandClickRoot(root_item,root_index)">{{root_item.name}}</li>
                    <template v-if="root_item.children" v-for="(item,index) in root_item.children">
                        <li class="title_li" @click="commandClick(item,index)">{{item.name}}</li>
                    </template>
                </template>
            </ul>
            <span class="clear" @click="clearClick">清空历史数据</span>
        </div>
        
    </div>
</template>
<style lang="less">
    .input-wrap {
        width: 200px;
        height: 29px;
        float: right;
        display: inline-block;
        padding: 0 6px;
        box-sizing: border-box;
        position: relative;
        z-index: 10;
        input {
            width: 200px;
            border: 1px solid #cfd2da;
            outline: 0;
            border-radius: 12px;
            font-size: 14px;
            line-height: 29px;
            height: 29px;
            padding-left: 10px;
            box-sizing: border-box;
        }
        img {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 5px;
            top: 13px;
        }
        .dialog_wrap {
            width: 200px;
            height: 178px;
            position: relative;
            .search-wrap {
                width: 200px;
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
                    &.root_li {
                        text-indent: 1em;
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
                position: absolute;
                bottom: 6px;
                left: 13px;
                font-size: 12px;
            }
        }
        
    }
</style>
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
            }
        },
        watch:{
            'search_val': throttle(function(newVal) { 
               this.isChoose ? this.isSearch = false : this.isSearch = true;
               this.$emit('changeSearch',newVal.toLowerCase(), this.isSearch);
            }, 500),
        },
        methods: {
           searchClick(event){
               // 防止事件冒泡
               if(event.target.nodeName == 'INPUT'){
                   this.isChoose = false;
                   this.isSearch = false;
                   this.$emit('changeSearch',this.search_val,this.isClick);
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
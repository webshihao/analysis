<!-- 普通下拉框
可配置参数：
    showSearch：是否显示搜搜索框 default:true
    dropName：初始显示在下拉框中的文字 default:'不限级别''
    trigger：触发方式   default:'click'
    menuAlign：菜单排列方式 default:'start'
    dropdownItemData default:[],         无分组下拉框
    dropdownItemGroupData  default: [],  有分组下拉框
    isSelect:是否能下拉   dafault：'true'
    searchType:搜索内容的类别。 default："serial"
父元素可监听到的事件：
    选中某项：dropItemClick(object) object:选中项的文字和value
 -->

<template>
    <div id="dropdownitem" class="mod-dropdownitem" ref="dropdownitem">
        <div v-show="!isSelect" class="maste"></div>
        <div
            class="dropdownitem__menu"
            >
            <span class="yc-dropdown-link"  @click="clickSelect" :style="linkStyle">
                <span :class="['dropName-outer', {'dropName-outer-change': isClickChange }]">
                    <span class="dropName" :title="dropNameText">{{dropNameText}}</span>
                </span>
                <img ref="child" :class="{rotateimg:isRotate}" src="../../static/img/arrow__down.svg" height="14" width="22" alt="">
            </span>
            <div slot="dropdown" ref="dropdown" class="yc-dropdown-menu" v-if="isShowContent">
                <input 
                    class="input-search"
                    v-if="showSearch"
                    placeholder="请搜索"
                    icon="search"
                    size="small"
                    v-model="searchName"
                />
               <img class="input__icon" src="../../static/img/search_icon.png" v-if="showSearch"/>
                <!-- 无分组下拉框 -->
                <div class="item-show" v-if="dataFromFather != null">
                    <template v-for="(item,index) in dataFromFather">
                        <li
                            :key="item.index"
                            class="drop-item-all"
                            @click="handleCommand(item)"
                        >
                            {{item.name}}
                        </li>
                    </template>
                </div>
                <!-- 有分组下拉框 -->
                <div class="group-show" v-if="dropdownItemGroupData != null" :style="groupStyle">
                    <template v-if="!isTitleClick" v-for="(group, groupIndex) in dropdownItemGroupData" >
                        <li class="drop-group-name drop-item-all" 
                            :key="groupIndex"
                            @click.native="handleListClick"
                        >{{group.name}}</li>
                        <template  v-for="(item,index) in group.children">
                            <li 
                                class="drop-item-all"
                                @click='handleCommand(item)'
                                :class="{serial_active:(groupIndex == highlightIndexParent && index == highlightIndex)}"
                                :key="groupIndex+'-'+index"
                            >{{item.name}} </li>
                        </template> 
                    </template>
                    <template v-else-if="isTitleClick && group.children != null">
                        <li 
                            class="drop-group-name drop-item-all"
                            :key="groupIndex"
                            @click='handleCommand(group)'
                            >{{group.name}} 
                        </li>
                        <template  v-for="(item,index) in group.children">
                            <li 
                                class="drop-item-all"
                                :key="groupIndex+'-'+index"
                                @click='handleCommand(item)'
                                >{{item.name}} 
                            </li>
                        </template> 
                    </template>
                    <template v-else-if="isTitleClick && !group.children">
                        <li 
                            class="drop-group-name drop-item-all"
                            :key="groupIndex"
                            @click='handleCommand(group)'
                            >{{group.name}} 
                        </li>
                    </template>
                </div>
                <li class="drop-group-name drop-item-all noData" v-if="dataFromFather == null && dropdownItemGroupData == null">暂无数据</li> 
                <li class="drop-group-name drop-item-all noData nodataclass" v-if="dataFromFather.length==0 && dropdownItemGroupData.length==0">对不起，该车系不在您的权限范围内</li>    
            </div>
        </div> 
    </div>
</template>
<style lang="less" >
    .nodataclass {
        font-size: 12px;
        line-height: 18px;
        padding: 0 5px;
    }
    .mod-dropdownitem{
        color:#606060;
        font-family:'MicrosoftYaHei';
        position: relative;

        .maste{
            position: absolute;
            height: 40px;
            width: 120px;
            left: 0;
            top: 0;
            background-color: transparent;
            z-index: 5;
        }
        .yc-dropdown-link {
            display: flex;
            flex-flow:row;
            align-items:center;
            justify-content:center;
            width: 118px;
            height: 40px;
            border: 1px solid #D1D5DF;
            border-radius: 2px;
            background-color: #FFF;
            &:hover {
                border-color: #2e2e2e;
            }
            img {
                vertical-align: text-top;
                margin-left: -5px;
                &.rotateimg{
                    vertical-align: unset;
                    transform: rotateZ(180deg);
                    transition: all .5s;
                } 
            }
            .dropName-outer{
                flex:1;
                background-color: #FFF;
                height: 100%;
                .dropName{
                    display: block;
                    font-size: 13px;
                    line-height: 40px;
                    margin-left: 8px;
                    color: #2E2E2E;
                    width: 82px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                
            }
            .dropName-outer-change {
                background-color: #F7F7F7;
            }
            
        }
    }
    // 本品样式

    .choose__group{
        .yc-dropdown-link{
            width: 70px;
        }
        .dropName {
            width: 36px!important;
            margin-left: 10px!important;
            font-size: 12px!important;
        }
    }        
    .selfProduct {
        .dropName {
            width: 70px!important;
            font-size: 12px!important;
            font-weight: bold;
        }
        .yc-dropdown-link {
            width: 102px;
        }
    }
    //user
    .mastContent1{
        .maste{
            width: 108px!important;
        }
        .yc-dropdown-link{
            width: 106px!important;
        }
        .dropName {
           width: 55px!important;
        } 
        .check__change{
            margin-left: 10px;
        }       
    }
    .choose__level{
        .yc-dropdown-link{
            width: 102px;
        }
        .dropName {
            width: 70px!important;
            font-size: 12px!important;
        }        
    }

    .slide-slide-active {
        transition: all .8s linear;
    }
    .slide-slide-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-slide-enter,
    .slide-slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
    {
        // transform: translateY(-10px);
        height: -10px;
    }
    .yc-dropdown-menu{
        position: absolute;
        top: 42px;
        transform-origin: center top 0px;
        z-index: 1500;
        width: 120px;
        font-size: 14px;
        box-sizing: border-box;
        padding: 5px 0;
        border:1px solid #D1D5DF;
        box-shadow: 0 4px 8px 0 rgba(235,235,235,0.50);
        margin: 0px;
        margin-top: -1px;
        overflow: hidden;
        background-color: #FFF;
        .item-show {
            overflow-y: auto;
            max-height: 128px;
            cursor: pointer;
            .yc-dropdown-menu__item:hover{
                background-color: #F1F4F9;
                color:#2E2E2E;

            }
            .drop-item-all {
                line-height: 40px;
                font-size: 12px;
                color:#606060;
                border: 1px dotted #F5F5F5;
                padding:0 10px 0 8px;
            }
            .drop-group-name{
                padding:0 10px 0 8px;
                color:#2E2E2E;

            }
            .noData {
                margin-left: 8px;
            }
        }
    }

    .group-show {
        overflow-y: auto;
        max-height: 128px;
        // border-bottom: 1px solid #D1D5DF;
        margin-top: -2px;
        cursor: pointer;
        .yc-dropdown-menu__item:hover{
            background-color: #F1F4F9;
            color:#2E2E2E;
        }
        .drop-item-all {
            line-height: 40px;
            font-size: 12px;
            color:#606060;
            border: 1px dotted #F5F5F5;
            padding:0 10px 0 18px;
        }
        .serial_active {
            background: #eee;
        }
        .drop-group-name{
            padding:0 10px 0 6px;
            color:#2E2E2E;
            user-select: none;
            cursor: pointer;
        }
        .noData {
            margin-left: 8px;
        }
    }
    .input-search {
        width: 90%;
        display: block;
        margin: 0 auto;
        height: 23px;
        box-sizing: border-box;
        padding: 0 6px;
        margin-bottom: 7px;
        outline: none;
        font-size: 10px;
    }
    .input__icon {
        position: absolute;
        right: 8px;
        top: 7px;
        width: 18px;
        height: 18px;
    } 
</style>
<script>
import { throttle, ajaxPost, containEle} from '@/util/util.js'

export default {
    name: 'dropdownitem',
    data() {
        let drop_name = this.dropName;
        return {
            dropNameText: drop_name,
            iconTrigger: true,
            highlightedIndex: -1,
            suggestionLists: this.dropdownItemData,
            isOnComposition: false,
            isFocus: false,
            loading: false,
            dataFromFather: this.dropdownItemData,
            searchName: '',
            isClickChange: false,
            // 切换下拉状态
            toggleDropState: true,
            isShowContent: false,
            // 是否添加旋转class
            isRotate: false
        }
    },
    props: {
        // 父级是否可以选
        isTitleClick: {
            type: Boolean,
            default: true
        },
        showSearch: {
            type: Boolean,
            default: false
        },
        searchType: {
            type: String,
            default: "serial"
        },
        isSelect: {
            type: Boolean,
            default: true
        },
        dropName: {
            type: String,
            default: "不限级别"
        },
        menuAlign: {
            type: String,
            default: 'start'
        },
        // 上部宽高样式
        linkStyle: {
            type: Object,
            default: function() {
                return {}
            }
        },
        // 下拉框宽高样式
        groupStyle: {
            type: Object,
            default: function() {
                return {}
            }
        },
        dropdownItemData: {
            type: Array,
            default: function() {
                return []
            }
        },
        dropdownItemGroupData: {
            type: Array,
            default: function() {
                return []
            }
        },
        // 回显当前dropdown-item 一级和二级索引
        highlightIndex:{

        },
        highlightIndexParent:{

        }
    },
    watch: {
        'searchName': throttle(function(newVal) { this.handleSearchChange(newVal) }, 500),
        'dropdownItemData': function(newValue) {
            this.dataFromFather = newValue;
        },
        'dropName':function(newValue){
            this.dropNameText = newValue;
        },
        'dropdownItemGroupData':function(newVal){
        },
        'isShowContent'(newVal){
            if(!newVal){
                this.isRotate = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click',(e)=>{
            if (!containEle(this.$el, e.target)) {
                this.isShowContent = false;
            }
        })
        document.getElementsByClassName("maste")[0].click = function() {
            return false;
        }
    },
    methods: {
        // 选中某项后执行回调(将dropdown-item值传入)
        handleCommand(command) {
            this.dropNameText = command.name;
            this.$emit("dropItemClick", command);
            this.isShowContent = false;
        },
        clickSelect(e) {
            this.isRotate = true;
            // this.isClickChange = true;
            this.isShowContent = !this.isShowContent;
            console.log(this.isShowContent);

            if(this.isShowContent){
                this.$emit('triggerInput', true);
            }
            // e.stopPropagation();
            return false;
        },
        getitem(item, index) {
            item.index = index;
            return item;
        },
        handleDropdownVisible(e) {
            this.iconTrigger = !this.iconTrigger;
            if (this.iconTrigger) {
                e.target.style.transform = "rotateZ(0deg)"
            } else {
                e.target.style.transform = "rotateZ(180deg)"
            }
            this.$emit('visibleItem', e)
        },
        querySearch(queryString, cb) {
            var suggestionLists = this.suggestionLists;
            var results = queryString ? suggestionLists.filter(this.createFilter(queryString)) : suggestionLists;
            // 调用 callback 返回建议列表的数据
            // cb(results);
            this.loading = false;
            if (Array.isArray(results)) {
                self.suggestionLists = results;
            } else {
                console.error('autocomplete suggestions must be an array');
            }
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.name.indexOf(queryString) === 0);
            };
        },
        getData(queryString) {
            const self = this;
            this.loading = true;
            this.querySearch(queryString);
        },
        getdata(url, para, fun) {//向后台获取数据
            var params = para || {};
            ajaxPost(url, params).then((res) => {
                fun(res);
            })
        },
        // 查询本品
        handleSearchChange(newVal) {
            const self = this;
            this.$emit('changeSearchData', newVal.toLowerCase());
        },
        handleComposition(event) {
            if (event.type === 'compositionend') {
                this.isOnComposition = false;
                this.handleChange(this.value);
            } else {
                this.isOnComposition = true;
            }
        },
        handleChange(value) {
            this.$emit('input', value);
            if (this.isOnComposition || (!this.triggerOnFocus && !value)) {
                this.suggestionLists = [];
                return;
            }
            this.getData(value);
        },
        handleFocus() {
            this.isFocus = true;
            if (this.triggerOnFocus) {
                this.getData(this.value);
            }
        },
        handleBlur() {
            // 因为 blur 事件处理优先于 select 事件执行
            setTimeout(_ => {
                this.isFocus = false;
            }, 100);
        },
        handleKeyEnter() {
            if (this.isShow && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestionLists.length) {
                this.select(this.suggestionLists[this.highlightedIndex]);
                this.value = "";
            }
        },
        handleSuggestionSelect(item, index) {
            this.value = "";
            this.$emit('select', item);
            this.highlightedIndex = index;
        },
        highlight(index) {
            if (!this.isShow || this.loading) { return; }
            if (index < 0) index = 0;
            if (index >= this.suggestionLists.length) {
                index = this.suggestionLists.length - 1;
            }
            this.highlightedIndex = index;
        },
    }
}
</script>
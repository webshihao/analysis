/*
* @Created Date:   2018-05-21 10:00:50
* @Author: yiche
* ------
* @Last Modified: 2018-06-12 11:27:45
* @Modified by:   huke
* ------
* Copyright (c) 2018 易车
* ---------------------------------------
* Javascript will save your soul!
*/
import axios from 'axios';

export const ajaxPost = (url,params) => {
	let axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        transformResponse: [function(data) {
            var data = typeof data == 'string' ? JSON.parse(data) : data;
            return data;
        }],
    });
    return axiosInstance.post(url, params)
}
export const ajaxGet = (url,query) => {
	let axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        // timeout: 5000
        transformRequest: [function(data) {
            var data = data || {};
            return JSON.stringify(data);
        }],
        transformResponse: [function(data) {
            var data = typeof data == 'string' ? JSON.parse(data) : data;
            return data;
        }],
    });
    return axiosInstance.get(url,{
        params: query
    })
}

/**
 * 设置localstorage,
 * @param {*} name  存储名称
 * @param {*} content  存储的值，不需要json 化
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}
/**
 * 删除sessionStorage
 */
export const removeStore = name => {
    if (!name) return;
    return window.sessionStorage.removeItem(name);
}

/**
 * 节流函数，自动搜索
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} mustRunDelay 
 */
export const throttle = (fn, delay, mustRunDelay) => {
    let timer = null
    let t_start
    return function() {
        const context = this
        const args = arguments
        let t_curr = +new Date()

        clearTimeout(timer)
        if (!t_start) {
            t_start = t_curr
        }
        if (t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args)
            t_start = t_curr
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args)
            }, delay)
        }
    }
};

/**
 * 节点包含
 * @param {*} index 当前左侧导航索引 0-0
 * @param {*} navigations 左侧导航数据
 */
export const containEle = function(parentEl, el, container){
    // 第一个节点是否包含第二个节点
    //contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+(估计从9.0+),safari5.1.7+
    if (parentEl == el) {
        return true;
    }
    if (!el || !el.nodeType || el.nodeType != 1) {
        return false;
    }
    if (parentEl.contains ) {
        return parentEl.contains(el);
    }
    // 兼容火狐
    if ( parentEl.compareDocumentPosition ) {
        return !!(parentEl.compareDocumentPosition(el) & 16);
    }
    var prEl = el.parentNode;
    while(prEl && prEl != container) {
        if (prEl == parentEl)
            return true;
        prEl = prEl.parentNode;
    }
    return false;
}
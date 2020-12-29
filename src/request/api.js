import request from './request.js'


export const getHomeData = () => {
    return request({
        method:'get',
        url:'/index/index'
    })
}

//封装搜索窗口数据
export const getSearchData = () =>{
    return request({
        method:'get',
        url:'/search/index'
    })
}

//封装搜索商品展示商品数据 
export const getSearchShopData = (params) => request.get('/goods/list',{params})

//封装实施搜索窗口数据
export const getTimeData = (params) => request.get('/search/helper',{params})

//封装清除历史记录数据
export const clearHistory = () => request.post('/search/clearhistory')
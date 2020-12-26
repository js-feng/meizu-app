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
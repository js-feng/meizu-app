import request from './request.js'


export const getHomeData = () => {
    return request({
        method:'get',
        url:'/index/index'
    })
}
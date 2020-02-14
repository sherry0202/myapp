import axios from 'axios'
import qs from 'qs'
import { func } from 'prop-types';

// export const IP =  'http://localhost:80'
// export const IP =  'http://172.16.14.243:80'
export const IP='http://172.20.10.7:80'

// 服务器地址
const req=axios.create({
    baseURL: IP,
    timeout: 10000
})

// 登录 acc：账号 pwd：密码
export function login(acc,pwd){
    return req.post('/login.php',qs.stringify({acc,pwd}))
}

// 获取猜你喜欢列表
export function getList(){
    return req.get('/gethouselist.php')
}

// 注册接口
export function register(data){
    return req.post('/reg.php',qs.stringify(data))
}

// 获取验证码
export function getCode(){
    return req.get('/valitecode.php')
}
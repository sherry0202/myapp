import React, { Component } from 'react'
import { Button, Flex,InputItem,WingBlank,WhiteSpace,Toast } from 'antd-mobile';
import {Link} from 'react-router-dom'
import {login} from '../../api/apis'

export default class Login extends Component {
    state={
        user:'',
        pwd:'',
        olduser:'',
        oldpwd:'',
    }
    render() {
        let {user,pwd}=this.state
        return (
            <div style={{ backgroundColor: '#fff',height:'100%' }}>
                <div style={{width:256,height:256,margin:'0 auto'}}>
                    <Flex justify="center">
                        <img src={require('../../assets/images/logo.jpg')} />
                    </Flex>
                </div>
                <WingBlank size="lg">
                    <InputItem
                        clear
                        placeholder="请输入用户名"
                        value={user}
                        onChange={(val)=>{this.setState({user:val})}}
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/images/user.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        type="password"
                        value={pwd}
                        onChange={(val)=>{this.setState({pwd:val})}}
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/images/pwd.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <WhiteSpace size="lg" />
                    <Button 
                    style={{ backgroundColor: '#FFA000', color: '#fff' }} 
                    activeStyle={{backgroundColor: 'rgb(243, 170, 47)'}}
                    onClick={this.btnTouch}
                    >登录</Button>
                    <WhiteSpace size="lg" />
                    <Flex justify="between">
                        <Link to="/reg" style={{color:'#FFA000'}}>快速注册</Link>
                        <Link to="/forget" style={{color:'#FFA000'}}>忘记密码？</Link>
                    </Flex>
                </WingBlank>
            </div>

        )
    }

    // 点击登录
    btnTouch= async ()=>{
        let user=this.state.user
        let pwd=this.state.pwd

        //如果当前用户名和密码和上一轮是一样的 就不发送请求
        if(this.state.olduser==user && this.state.oldpwd==pwd)
        return

        this.setState({
            oldpwd:pwd,
            olduser:user,
        })

        let res=await login(user,pwd)
        if(res.data==='ok'){
            // console.log(this.props)
            this.props.history.replace('/nav')
        }else{
            Toast.fail('用户名或密码错误',2)
        }
    }
}

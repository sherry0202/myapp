import React, { Component } from 'react'
import { Flex, WhiteSpace, WingBlank, InputItem, Checkbox, Button, Toast, Modal } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { register, getCode } from '../../api/apis'

const AgreeItem = Checkbox.AgreeItem;

export default class Reg extends Component {
    state = {
        acc: '',
        pwd: '',
        code: '',//用户输入的验证码
        receiveCode: '',//收到的验证码
        modal1: false,//弹出框是否显示
        boxchecked: false,//是否勾选协议

    }
    render() {
        let { acc, pwd, code } = this.state
        return (
            <div style={{ backgroundColor: '#fff', height: '100%' }}>
                <WhiteSpace size="lg" />
                <WingBlank size="lg">
                    <Flex justify="center">
                        <h2 style={{ color: 'rgb(57, 55, 55)', margin: 20 }}>忘记密码</h2>
                    </Flex>
                    <WhiteSpace size="lg" />
                    <InputItem
                        clear
                        value={acc}
                        placeholder="请输入账号"
                        onChange={(val) => { this.setState({ acc: val }) }}
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/images/phone.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <InputItem
                        clear
                        value={pwd}
                        placeholder="请输入新密码"
                        onChange={(val) => { this.setState({ pwd: val }) }}
                        type="password"
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/images/pwd.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <Flex justify="between">
                        <InputItem
                            clear
                            value={code}
                            onChange={(val) => { this.setState({ code: val }) }}
                            placeholder="请输入验证码"
                        >
                        </InputItem>
                        <span onClick={this.getValiteCode}>获取验证码</span>
                    </Flex>
                    <WhiteSpace size="sm" />
                    <Flex>
                        <Flex.Item>
                            <AgreeItem data-seed="logId" onChange={this.agreeThat.bind(this)}>
                                我已同意<a style={{ color: '#FFA000' }} onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《用户服务协议》及《隐私权政策》</a>
                            </AgreeItem>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg" />
                    <Button onClick={this.regAccount} style={{ backgroundColor: '#FFA000', color: '#fff' }}>确认修改</Button>
                    <WhiteSpace size="lg" />
                    <Link to="/" style={{ color: '#FFA000' }}>返回登录</Link>
                </WingBlank>

                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title={'验证码为：' + this.state.receiveCode}
                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                </Modal>
            </div>
        )
    }

    // 弹出框
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    // 同意协议
    agreeThat(e) {
        // console.log(e.target)
        this.setState({
            // 协议是否勾选
            boxchecked: e.target.checked
        })
    }
    // 获取验证码
    getValiteCode = () => {
        getCode().then((data) => {
            // 保存收到的验证码
            console.log('收到的验证码' + data.data)
            this.setState({
                receiveCode: data.data
            })

            // 弹出验证码框
            this.setState({
                modal1: true
            })

        })
    }

    // 注册
    regAccount = () => {
        // 如果协议勾选了
        if (this.state.boxchecked) {
            // 如果验证码正确
            // console.log(this.state.code)
            if (Number(this.state.receiveCode) === Number(this.state.code)) {
                // 注册验证
                this.regCheck(this)
                
            } else {
                Toast.fail('您输入的验证码有误', 2)
            }
        } else {
            // 如果协议没有勾选
            Toast.fail('请勾选同意协议', 2)
        }

    }
    // 注册验证
    regCheck = () => {
        let{acc,pwd}=this.state
        let data = { 
            acc,
            pwd
        }
        // console.log(data)
        register(data).then((res) => {
            // console.log(res)
            if (res.statusText == 'OK') {
                // console.log(this.props)
                // 跳转到登录页面
                this.props.history.push('/')
            } else {
                Toast.fail('修改失败', 2)
            }
        })
    }


}

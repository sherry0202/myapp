import React, { Component } from 'react'
import './My.scss'
import { Flex, WingBlank, List } from 'antd-mobile'

const Item = List.Item;
export default class My extends Component {
    state={
        funclist:[{icon:'coin',key:'coins',title:'我的积分'},
        {icon:"order",key:'order',title:'我的订阅'},
        {icon:"member",key:'member',title:'微聊联系人'},
        {icon:''},
        {icon:"counter",key:'counter',title:'房贷计算器'},
        {icon:"collection",key:'collection',title:'我的房子'},
        {icon:''},
        {icon:"write",key:'write',title:'我的看房记录'},
        {icon:"question",key:'question',title:'我的问答'},
        {icon:''},
        {icon:"setting",key:'setting',title:'设置'},
        {icon:"opinion",key:'opinion',title:'意见反馈'},]
    }
    render() {
        return (
            <div>
                <div className="top">
                    <WingBlank size="lg">
                        <div className="top-msg">
                            <Flex justify="start" align="start">
                                <img src={require('../../../assets/images/header.jpg')} className="top-img" />
                                <div className="log-title">
                                    <p className="log-reg"><a>登录</a>/<a>注册</a></p>
                                    <p style={{ fontSize: 13 }}>可以与经纪人发起聊天</p>
                                </div>
                            </Flex>
                            <img className="set-icon" src={require('../../../assets/images/set.png')} />
                        </div>
                        <div className="bot-msg">
                            {/* <Flex> */}
                            <div className="bot-box border">
                                <p className="count">0</p>
                                <p className="bot-name"><img className="bot-icon" src={require('../../../assets/images/market.png')} />钱包</p>
                            </div>
                            <div className="bot-box border">
                                <p className="count">0</p>
                                <p className="bot-name"><img className="bot-icon" src={require('../../../assets/images/sales.png')} />优惠</p>
                            </div>
                            <div className="bot-box">
                                <p className="count">0</p>
                                <p className="bot-name"><img className="bot-icon" src={require('../../../assets/images/coins.png')} />积分</p>
                            </div>
                            {/* </Flex> */}
                        </div>
                    </WingBlank>

                </div>
                <div className="func" >
                    <List>
                        {
                            this.state.funclist.map((obj,index)=>{
                                if(obj.icon!=''){
                                    return <Item
                                    key={index}
                                        thumb={require('../../../assets/images/'+obj.icon+'.png')}
                                        key={obj.key}
                                        arrow="horizontal"
                                        onClick={() => { }}
                                    >{obj.title}</Item>}
                                else {return <div key={index} style={{height:8,backgroundColor:'#f4f4f4'}}></div>}
                            })
                        }
                    </List>
                </div>
            </div>
        )
    }
}

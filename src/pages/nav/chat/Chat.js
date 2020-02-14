import React, { Component } from 'react'
import './Chat.scss'

export default class Chat extends Component {
    render() {
        return (
            <div className="container">
                <div className="msg">
                    <img src={require('../../../assets/images/header.jpg')} className="head-img" />
                    <p className="counselor">置业顾问:<span className="name">马冬梅</span></p>
                    <p className="slogen">专业服务诚信做人诚信做事！</p>
                    <button className="chat">我要聊天</button>
                </div>
            </div>
        )
    }
}

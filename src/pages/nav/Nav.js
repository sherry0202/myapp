import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import './Nav.scss'
import Home from './home/Home'
import History from './history/History'
import My from './my/My'
import Chat from './chat/Chat'

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            tablist:[{title:'首页',key:'home',icon:'home1',sicon:'home',child:<Home/>},
            {title:'微聊',key:'chat',icon:'chat1',sicon:'chat',child:<Chat/>},
            {title:'足迹',key:'history',icon:'history1',sicon:'history',child:<History/>},
            {title:'我的',key:'my',icon:'my1',sicon:'my',child:<My/>}]
        };
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494" //未选中字体颜色
                    tintColor="#FFA000" //选中的字体颜色
                    barTintColor="white" //tab背景色
                >
                {
                    this.state.tablist.map(obj=>

                        <TabBar.Item
                            title={obj.title}
                            key={obj.key}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/images/'+obj.icon+'.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/images/'+obj.sicon+'.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                            }
                            selected={this.state.selectedTab === obj.key}
                            // badge={1}
                            onPress={() => {
                                this.setState({
                                    selectedTab: obj.key,
                                });
                                window.load = true
                            }}
                        >
                            {obj.child}
                        </TabBar.Item>
                    )
                }
                </TabBar>
            </div>
        );
    }
    
}

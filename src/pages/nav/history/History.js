import React, { Component } from 'react'
import { Flex ,WingBlank,WhiteSpace} from 'antd-mobile';
import './History.scss'
import {IP} from '../../../api/apis'
import {connect} from 'react-redux'

class History extends Component {
    render() {
        return (
            <div className="history">
                <WingBlank size="lg">
                    <h3 className="history-title">浏览过的好房</h3>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WingBlank size="md">
                {
                    this.props.state.map(obj=>
                        <div className="product" key={obj.name}>
                                <Flex justify="between">
                                    <div className="house">
                                    <Flex justify="between" align="start">
                                        <img className="house-img" src={IP+obj.imgs}/>
                                        <div className="details">
                                            <p className="house-title">{obj.name}</p>
                                            <p className="adress">{obj.area}<span className="range">{obj.range}</span></p>
                                            <p className="size">{obj.type}<span className="point">{obj.point}平</span></p>
                                        </div>
                                    </Flex>
                                    </div>
                                    <h3 className="house-price">{obj.price}/平</h3>
                                </Flex>
                            </div>
                    )
                }
                </WingBlank>
            </div>
        )
    }
}
export default connect((state)=>{
    return {state}
})(History)
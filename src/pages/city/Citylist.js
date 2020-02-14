import React, { Component } from 'react'
import './citylist.scss'
import listArr from '../../json/citylist.json'
import BScroll from 'better-scroll'

export default class Citylist extends Component {
    render() {
        return (
            <div>
                <div id="left-box">
                    <ul className="content">
                        <h3 className="select-title">切换城市</h3>
                    {
                        listArr.map(obj=>
                            <div key={obj.title} id={obj.title} className="city-box">
                                <h3 className="finger">{obj.title}</h3>
                                {
                                    obj.child.map(city=>
                                            <p key={city} className="city-list">{city}</p>
                                    )
                                }
                            </div>
                        )
                    }
                    </ul>
                </div>
                <div className="right-box" onTouchMove={this.moveTitle.bind(this)}>
                    {listArr.map(obj=><p key={obj.title} className="select" 
                    onClick={this.selectCity.bind(this,obj.title)}>{obj.title}</p>)}
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.leftbox=new BScroll('#left-box')
    }

    // 点击右边栏字母左边栏自动滚动到相应div
    selectCity(title){
        this.leftbox.scrollToElement('#'+title,500)
    }

    // 滑动右边栏时左边栏自动跟随滚动到相应位置
    moveTitle(e){
        //获取第一根手指的触屏事件对象
        // touches[0]就是第一根手指触屏事件对象
        // console.log(e.touches[0].clientX,e.touches[0].clientY)
        // 根据当前的X和Y坐标，获取此坐标对应的DOM元素
        let elem=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY)
        // console.log(elem.className)
        // 选中右边栏所有class类名为select的title，让左边栏滚动到相应div
        if(elem.className=="select"){
            this.leftbox.scrollToElement('#'+elem.innerHTML,500)
        }
    }


}

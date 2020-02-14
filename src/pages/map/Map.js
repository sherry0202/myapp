import React, { Component } from 'react'

export default class Map extends Component {
    state={
        mycity:''
    }
    render() {
        return (
            <div>
                <h3>城市地图定位</h3>
                <div id="app-map" style={{ width: '100%', height: 620 }}></div>
            </div>
        )
    }

    componentDidMount(){
        // 地图定位
        var map = new window.AMap.Map("app-map", {
            resizeEnable: true,
            center: [116.397428, 39.90923],
            zoom: 13
        });
        // 地图定位
        //实例化城市查询类
        var _this=this
        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;//当前城市
                    var citybounds = result.bounds;//定位城市的经纬度
                    // console.log(citybounds) 
                    // document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
                    //地图显示当前城市
                    map.setBounds(citybounds);
                }
            } else {
                // document.getElementById('info').innerHTML = result.info;
                console.log(result.info)
            }
        });
    }
}

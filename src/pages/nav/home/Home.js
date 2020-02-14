import React, { Component } from 'react'
import { Flex, WhiteSpace, SearchBar, WingBlank, Carousel,Grid  } from 'antd-mobile';
import './Home.scss'
import {getList,IP} from '../../../api/apis'
import {connect} from 'react-redux'

const data = [{icon:require('../../../assets/images/bighouse.png'),text:'新房'},
{icon:require('../../../assets/images/house.png'),text:'租房'},
{icon:require('../../../assets/images/subway.png'),text:'地铁沿线'},
{icon:require('../../../assets/images/property.png'),text:'百元好房'},
{icon:require('../../../assets/images/move.png'),text:'搬家'},
{icon:require('../../../assets/images/clean.png'),text:'保洁'},
{icon:require('../../../assets/images/fixed.png'),text:'装修'},
{icon:require('../../../assets/images/msg.png'),text:'卖房'},]

const result=[{icon:require('../../../assets/images/money.png'),text:'新房'},
{icon:require('../../../assets/images/computer.png'),text:'租房'},
{icon:require('../../../assets/images/know.png'),text:'地铁沿线'},
{icon:require('../../../assets/images/scan.png'),text:'百元好房'},]

class Home extends Component {
    state = {
        value: '',
        data: ['banner1', 'banner2', 'banner3'],
        imgHeight: 176,
        houseList:[],
        mycity:'定位中'
    };
    render() {
        let { value,mycity } = this.state
        return (
            <div className="home">
                <div className="top">
                    <div onClick={this.handleClick.bind(this,'#/citylist')} className="location">{mycity}<img className="local-img" src={require('../../../assets/images/tran.png')}/></div>
                    <div onClick={this.handleClick.bind(this,'#/search')} className="search_box">
                        <img className="search-icon" src={require('../../../assets/images/search.png')}/>
                        <span>搜索好房</span>
                    </div>
                    <img onClick={this.handleClick.bind(this,'#/map')} className="map-icon" src={require('../../../assets/images/map2.png')} />
                </div>
                <div className="banner">
                    <WingBlank>
                        <Carousel
                            autoplay={true}
                            infinite
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="#"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={require('../../../assets/images/'+val+'.jpg')}
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                </div>
                <div className="menu">
                    <Grid data={data} hasLine={false} />
                </div>
                <div className="encyclo">
                    <WhiteSpace size="md" />
                    <WingBlank size="lg">
                        <Flex justify="start">
                            <h3 className="encyclo-title">房产全百科<span className="tips">专业的买房攻略</span></h3>
                        </Flex>
                    </WingBlank>
                    <Grid data={result} hasLine={false} />
                </div>
                <div className="youlike">
                    <WhiteSpace size="md" />
                    <WingBlank size="lg">
                    <Flex justify="start">
                        <p className="youlike-title">猜你喜欢</p>
                    </Flex>
                    </WingBlank>
                    <WhiteSpace size="md" />
                    <WingBlank size="md">
                    {
                        this.state.houseList.map(obj=>
                        
                            <div className="product" key={obj.id} onClick={this.clickHouse.bind(this,obj)}>
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
                    <WhiteSpace size="md" />
                </div>
            </div>
        )
    }

    //回收资源, 当组件销毁时候， 所有的响应就全部不再执行
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        };
    }

    componentDidMount() {
        // 设置定时器循环banner
        setTimeout(() => {
            this.setState({
                data: ['banner1', 'banner2', 'banner3'],
            });
        }, 100);

        // 获取猜你喜欢列表
        getList().then((data)=>{
            var houseList=data.data
            // console.log(houseList)
            this.setState({
                houseList:houseList
            })
            // console.log(this.state.houseList)
        })

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
                    _this.setState({
                        mycity:cityinfo//获取定位设置定位城市
                    })
                    // document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
                    //地图显示当前城市
                    // map.setBounds(citybounds);
                }
            } else {
                // document.getElementById('info').innerHTML = result.info;
                console.log(result.info)
            }
        });
    }
    
    // 点击顶部城市、搜索框跳转
    handleClick(href){
        window.location.href=href
    }

    // 点击房屋信息，添加到历史足迹
    clickHouse(obj){
        // console.log(obj)
        //提交action，触发reducer进行计算
        this.props.dispatch({
            type:'add_house',
            obj
        })
    }
}

export default connect()(Home)
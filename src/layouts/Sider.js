import React, {Component, Suspense} from 'react';
import {Avatar, Card} from 'antd';
import adView from "../assets/HTML/adview.html"

const {Meta} = Card

class SiderView extends Component {
    render() {
        console.log("adView",adView);
        return (
            <div className='sider_view'>
                <Card className='sider_card' size="small">
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                        title="高天原"
                        description="This is the description"
                    />
                    <hr/>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card headStyle={{backgroundColor: "#f2f2f2"}} className='sider_card' size="small" title="文章推荐"
                      extra={<a href="#">More</a>}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card headStyle={{backgroundColor: "#f2f2f2"}} className='sider_card' size="small" title="文章分类"
                      extra={<a href="#">More</a>}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card headStyle={{backgroundColor: "#f2f2f2"}} className='sider_card' size="small" title="文章分类"
                      extra={<a href="#">More</a>}>
                    <iframe
                        title="resg"
                        src={adView}
                        style={{ width: 320, border: '0px', height: 100 }}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                </Card>

            </div>
        )
    }
};
export default SiderView;

import React, {Component, Suspense} from 'react';
import {Avatar, Card} from 'antd';

const {Meta} = Card

class SiderView extends Component {
    render() {
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

            </div>
        )
    }
};
export default SiderView;

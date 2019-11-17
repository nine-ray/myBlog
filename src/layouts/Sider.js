import React, {Component} from 'react';
import {Card,Icon, Avatar} from 'antd';
import {connect} from "dva";

const {Meta} = Card
class SiderView extends Component {
    render() {
        return (
            <div className='sider_view'>
                <Card className='sider_card' size="small"  style={{ width: 300 }}>
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="高天原"
                        description="This is the description"
                    />
                    <hr/>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card headStyle={{backgroundColor:"#f2f2f2"}} className='sider_card' size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card headStyle={{backgroundColor:"#f2f2f2"}} className='sider_card' size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        )
    }
};
export default SiderView;

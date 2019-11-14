import React, {Component, Fragment} from 'react';
import { Card } from 'antd';
import {connect} from "dva";

@connect(()=>{

})
class SiderView extends Component{
    render() {
        return (
            <Card style={{ padding: 0 }}>

            </Card>
        )
    }
};
export default SiderView;

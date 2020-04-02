import styles from './index.css';
import React, {PureComponent} from 'react';
import {Avatar, Card, Form, Input, Modal, Select} from 'antd';
import SearchBar from "../../components/SearchBar"
import {connect} from 'dva';
import {CloseOutlined, PlusCircleOutlined} from '@ant-design/icons';

import {lind2Icon, skipToOther} from "../../util/utils"


const {Search} = Input;
const {Option} = Select;
const {Meta, Grid} = Card;
const {Item} = Form;
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};


@connect((common) => ({
    deskHeight: common.deskHeight,
    deskDivWidth: common.deskDivWidth
}))
@Form.create()
class Home extends PureComponent {
    state = {
        currentTool: 0,
        currentKey: ""
    };

    componentWillMount() {
        const strs = localStorage.getItem("collect");
        this.collectList = JSON.parse(strs)||[];
    }

    collectList = [];

    componentDidMount() {

    }

    collectListSort = () => {
        this.collectList.sort((a, b) => b.collectOrder - a.collectOrder)
    };
    deleteCollectList = (collectId) => {
        this.collectList = this.collectList.filter(item => item.collectId !== collectId)
        this.collectListSort();
        localStorage.clear();
        localStorage.setItem("collect", JSON.stringify(this.collectList));
        this.forceUpdate();
    }

    changeCollectList = (collect) => {
        const index = this.collectList.findIndex((value) => {
            if (value.collectId === collect.collectId) {
                return true;
            }
            return false;
        });
        if (index >= 0) {
            this.collectList.map((item, i) => {
                if (i !== index && i <= 5) {
                    item.collectOrder = item.collectOrder - 1;
                } else if (i === index) {
                    item = collect
                }
                return item;
            });
            this.collectList = this.collectList.filter(item => item.collectOrder > 0)
        } else {
            this.collectList.push(collect)
        }
        this.collectListSort();
        localStorage.clear();
        localStorage.setItem("collect", JSON.stringify(this.collectList));
        this.forceUpdate();
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    render() {
        const deskDivWidth = this.props.deskDivWidth || 1440
        const {
            form
        } = this.props;

        const {getFieldDecorator} = form

        const handleOk = e => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                const {link, name} = fieldsValue;
                this.changeCollectList({
                    collectId: new Date().getMilliseconds(),
                    collectOrder: 100,
                    link,
                    name
                })
            });
            this.setState({
                visible: false,
            });
        };
        const gridType = {
            width: deskDivWidth / 12,
            height: deskDivWidth / 12,
            textAlign: 'center',
            margin: 5,
            padding: 30
        }
        return (
            <div className={styles.normal}>
                <SearchBar/>
                <Card bordered={false} style={{width: "60%", marginTop: 70, height: "70%"}}>
                    {this.collectList.map((item, i) => {
                        if (i >= 11) {
                            return null;
                        }
                        const icon = lind2Icon(item.link);
                        console.log("icon", icon);
                        return <Grid key={item.collectId} style={gridType} hoverable={true} onClick={(e) => {
                            item.collectOrder = item.collectOrder + 1;
                            this.changeCollectList(item);
                            skipToOther(item.link)
                        }}>
                            <CloseOutlined onClick={(e) => {
                                this.deleteCollectList(item.collectId);
                                e.stopPropagation();
                            }} style={{
                                position: "relative",
                                bottom: gridType.width * 0.3,
                                left: gridType.width * 0.55
                            }}/>
                            <Avatar src={icon}>无</Avatar>
                            <p style={{margin: 10}}>{item.name}</p>
                        </Grid>
                    })}
                    <Grid key={-1} style={gridType} hoverable={true} onClick={this.showModal}>
                        <PlusCircleOutlined style={{fontSize: gridType.width / 2, color: "#f0f2f5"}}/>
                    </Grid>
                </Card>

                <Modal
                    title="快捷链接管理"
                    onCancel={this.handleCancel}
                    onOk={handleOk}
                    visible={this.state.visible}
                >
                    <Form
                        {...layout}
                    >
                        <Item
                            label="链接"
                            required={true}
                            placeholder="链接地址，以https或者http起头"
                        >
                            {getFieldDecorator('link')(<Input placeholder="链接地址，以https或者http起头"/>)}
                        </Item>
                        <Item
                            label="链接名称"
                            name="name"
                        >
                            {getFieldDecorator('name')(<Input placeholder="填写链接名称"/>)}

                        </Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}

export default Home;

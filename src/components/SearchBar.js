import React, { PureComponent } from 'react';
import { Avatar, Card, Col, Input, Popover, Row, Select, Tag, Icon, Modal, Form } from 'antd';
// import {DownOutlined} from '@ant-design/icons';
import { baidu, bdIcon } from "../assets/image/images"
import { connect } from 'dva';


const { Search } = Input;
const { CheckableTag } = Tag;
const { Option } = Select;
const { Meta } = Card;

let deskHeight = 400;
let deskDivWidth = 1440;

@connect((common) => ({
    deskHeight: common.deskHeight,
    deskDivWidth: common.deskDivWidth
}))
class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentTool: 0,
            currentKey: "",
        };
    }

    searchToOther = (keyword) => {
        const currentTool = this.state.currentTool;
        window.open(this.toolList[currentTool].link + keyword)
    };
    skipToOther = (link) => {
        window.open(link)
    }
    toolList = [{
        name: "百度",
        img: baidu,
        icon: bdIcon,
        description: "www.baidu.com",
        link: "https://www.baidu.com/s?wd="
    }];
    recommendList = [{
        name: "淘宝购物",
        link: "https://www.tmall.com",
        color: "magenta"
    }, {
        name: "哔哩哔哩",
        link: "https://www.bilibili.com",
        color: "green"
    }, {
        name: "CSDN-程序员",
        link: "https://www.csdn.net",
        color: "#f50"
    }];

    componentWillReceiveProps(nextProps, nextContext) {
        deskHeight = nextProps.deskHeight;
        deskDivWidth = nextProps.deskDivWidth;
        this.forceUpdate();
    }
    render() {
        const { getFieldDecorator, validateFieldsAndScroll, resetFields } = this.props.form
        const content = (
            <Row gutter={[24, 24]} justify="space-around" style={{ width: 576 }}>
                {/* deskDivWidth * 0.4, */}
                {this.toolList.map((item) => {
                    return <Col key={item.description}
                        style={{ backgroundColor: "#f9f9f9", height: 30, padding: 2, margin: 15 }} span={4}>
                        <Avatar src={item.icon} size={20} />
                        <span>{item.name}</span>
                    </Col>
                })}
            </Row>
        );
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 16 },
        }
        return (
            <div style={{ width: "100%", height: 50, textAlign: "center" }}>
                <Popover content={content} placement="bottomLeft">
                    <div className="ant-dropdown-link"
                        style={{ height: "100%", display: "inline-block", position: "relative", bottom: 50 }}
                        onClick={e => e.preventDefault()}>
                        <img style={{ width: 80, height: "100%" }} src={baidu} />
                        <Icon type="down" style={{ position: "relative", top: 15 }} />
                        {/* <DownOutlined /> */}
                    </div>
                </Popover>
                <div style={{ display: "inline-block", width: "60%", paddingLeft: 0 }}>
                    <Search
                        placeholder="填写搜索内容"
                        onSearch={value => this.searchToOther(value)}
                        size="large"
                        style={{
                            width: "90%",
                        }}
                    />
                    <a style={{ width: '10%', marginLeft: '10px' }}><Icon onClick={() => { this.props.handleAddFolder() }} style={{ fontSize: '30px' }} type="plus-square" /></a>
                    <Row justify="start"
                        style={{
                            width: 864, // deskDivWidth * 0.6,
                            marginInline: "auto",
                            display: "inline-block",
                            marginTop: 5
                        }}>
                        {this.recommendList.map((item) => {
                            return <Col span={2} key={item.link}>
                                <CheckableTag color={item.color}
                                    onChange={(e) => {
                                        this.skipToOther(item.link)
                                    }}>{item.name}</CheckableTag>
                            </Col>
                        })}
                    </Row>
                </div>
                {/* 添加文件夹名称modal */}
                <Modal
                    title="添加文件夹"
                    onCancel={this.props.handleCancel}
                    onOk={this.props.handleOk}
                    visible={this.props.visible}
                >
                    <Form
                        {...layout}
                    >
                        <Form.Item
                            label="文件夹名称"
                            required={true}
                        >
                            {getFieldDecorator('folderName')(<Input />)}
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}

export default Form.create()(SearchBar);

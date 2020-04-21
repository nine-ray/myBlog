import styles from './index.less';
import React, { PureComponent } from 'react';
import { Avatar, Card, Form, Input, Modal, Select, Button, Menu, Dropdown, Icon, Tag, Tooltip } from 'antd';
import SearchBar from "../../components/SearchBar"
import { connect } from 'dva';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { lind2Icon, skipToOther } from "../../util/utils"

const { Item } = Form;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};


@connect((common) => ({
    deskHeight: common.deskHeight,
    deskDivWidth: common.deskDivWidth
}))
@Form.create()
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            uuid: ''
        };
    }

    componentWillMount() {
        let dataInfo = localStorage.getItem("foldData") ? JSON.parse(localStorage.getItem("foldData")) : []
        this.setState({
            dataInfo: dataInfo || []
        })
    }

    // collectListSort = () => {
    //     this.collectList.sort((a, b) => b.collectOrder - a.collectOrder)
    // };

    // changeCollectList = (collect) => {
    //     const index = this.collectList.findIndex((value) => {
    //         if (value.collectId === collect.collectId) {
    //             return true;
    //         }
    //         return false;
    //     });
    //     if (index >= 0) {
    //         this.collectList.map((item, i) => {
    //             if (i !== index && i <= 5) {
    //                 item.collectOrder = item.collectOrder - 1;
    //             } else if (i === index) {
    //                 item = collect
    //             }
    //             return item;
    //         });
    //         this.collectList = this.collectList.filter(item => item.collectOrder > 0)
    //     } else {
    //         this.collectList.push(collect)
    //     }
    //     this.collectListSort();
    //     localStorage.clear();
    //     localStorage.setItem("collect", JSON.stringify(this.collectList));
    //     this.forceUpdate();
    // };
    // 显示添加urlmodal
    showModal = (uuid) => {
        this.setState({
            visible: true,
            uuid
        });
    };
    // 添加urlmodal---取消
    handleCancel = () => {
        this.setState({
            visible: false,
            uuid: ''
        });
        this.props.form.resetFields()
    };
    // 删除url
    handleDelete = (eleUuid, itemUuid) => {
        const dataInfoMid = this.state.dataInfo.map(ele => {
            if (ele.uuid === eleUuid) {
                let groupMid=ele.group.filter(item=>{if(item.uuid!==itemUuid)return item})
                return ({
                    ...ele,
                    group: [...groupMid]
                })
            } else {
                return ({ ...ele })
            }
        })
        localStorage.setItem('foldData', JSON.stringify(dataInfoMid))
    }
    // 显示页面
    handleShow = (url) => {
        window.open(url)
    }
    // card中的url
    handleUrl = (ele) => {
        const buttonComs = []
        ele.group.forEach((item, index) => {
            if (item.type === 'file') {
                buttonComs.push(
                    <div style={{ width: '55px', height: '20px', marginRight: '4px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: '#DDDDDD', marginBottom: '5px' }}>
                        <Tooltip title={item.name}>
                            <div style={{ width: '80%' }}><a style={{ width: '100%' }} onClick={() => { this.handleShow(item.url) }}>{item.name && item.name.length > 2 ? `${item.name.substring(0, 2)}...` : item.name || ''}</a></div>
                        </Tooltip>
                        <div style={{ width: '20%' }}><a style={{ color: 'red' }} onClick={() => { this.handleDelete(ele.uuid, item.uuid) }}>x</a></div>
                    </div>
                )
            }
        })
        return buttonComs
    }
    // 每个card
    handleRender = (arrayDatas) => {
        const renderCom = []
        if (arrayDatas.length) {
            arrayDatas.forEach((item, index) => {
                if (item.type === 'folder') {
                    renderCom.push(
                        <Card title={item.topic} className={styles.itemCard} extra={<a onClick={() => { this.showModal(item.uuid) }}>添加</a>} style={{ height: '200px' }}>
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {item.group && item.group.length ? this.handleUrl(item) : []}
                            </div>
                        </Card>
                    )
                }
            })

        }
        return (renderCom)
    }
    // 生成唯一标示
    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    render() {
        const deskDivWidth = this.props.deskDivWidth || 1440
        const {
            form
        } = this.props;
        let { dataInfo } = this.state
        const { getFieldDecorator, resetFields } = form
        // 添加urlmodal----确定
        const handleOk = () => {
            form.validateFields((err, fieldsValue) => {
                if (err) return;
                const { link, name } = fieldsValue;
                const dataInfoMid = dataInfo.map(item => {
                    if (item.uuid === this.state.uuid) {
                        let groupMid = []
                        if (item.group && item.group instanceof Array) {
                            groupMid = [...item.group]
                            groupMid.push({
                                type: 'file',
                                name: name,
                                url: link,
                                uuid: this.guid()
                            })
                        }
                        else {
                            groupMid.push({
                                type: 'file',
                                name: name,
                                url: link,
                                uuid: this.guid()
                            })
                        }
                        return ({
                            ...item,
                            group: [...groupMid]
                        })
                    } else {
                        return ({ ...item })
                    }
                })
                localStorage.setItem('foldData', JSON.stringify(dataInfoMid))
                resetFields()
                this.setState({
                    uuid: ''
                })
                // this.changeCollectList({
                //     collectId: new Date().getMilliseconds(),
                //     collectOrder: 100,
                //     link,
                //     name
                // })
            });
            this.setState({
                visible: false,
            });
        };
        // const gridType = {
        //     width: deskDivWidth / 12,
        //     height: deskDivWidth / 12,
        //     textAlign: 'center',
        //     margin: 5,
        //     padding: 30
        // }
        const arrayData = [
            {
                topic: '社交',
                type: 'folder',
                group: [{
                    type: 'file',
                    name: '邮箱，邮箱邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }]
            }, {
                topic: '社交',
                type: 'folder',
                group: [{
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }]
            }, {
                topic: '社交',
                type: 'folder',
                group: [{
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                },]
            }, {
                topic: '社交',
                type: 'folder',
                group: [{
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                },]
            }, {
                topic: '社交',
                type: 'folder',
                group: [{
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }]
            }, {
                topic: '社交',
                type: 'folder',
                group: [{
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }, {
                    type: 'file',
                    name: '邮箱',
                    url: 'https://mail.163.com/',
                }]
            },
        ]
        return (
            <div className={styles.normal}>
                <SearchBar />
                {/* 中间内容 */}
                <div className={styles.centerContent}>
                    {this.handleRender(dataInfo && dataInfo.length ? dataInfo : [])}
                </div>
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
                            {getFieldDecorator('link')(<Input placeholder="链接地址，以https或者http起头" />)}
                        </Item>
                        <Item
                            label="链接名称"
                            name="name"
                        >
                            {getFieldDecorator('name')(<Input placeholder="填写链接名称" />)}

                        </Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}

export default Home;

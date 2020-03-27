import React, {Component} from 'react'
import {Avatar, Layout, Menu} from 'antd';
import "./Header.less"
import {main} from "../assets/image/images"
import {skipToOther} from "../util/utils"

const {Header} = Layout;
const {SubMenu} = Menu;


class HeaderView extends Component {
    state = {activeItem: 'home'}

    handleClick = e => {
        const {key} = e
        if (key === "star:1") {
            skipToOther("https://me.csdn.net/z13222038779")
        } else if (key === "star:2") {
            skipToOther("https://github.com/nine-ray")
        }
        // console.log('click ', e);
        // this.setState({
        //     current: e.key,
        // });
    };

    render() {
        const {activeItem} = this.state

        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="Avatar">
                    <Avatar src={main}/>
                    伊小猿网址导航
                </Menu.Item>
                {/*<Menu.Item key="app" disabled>*/}
                {/*    Navigation Two*/}
                {/*</Menu.Item>*/}
                <SubMenu
                    style={{position: "absolute", top: 5, right: 5}}
                    title={
                        <span className="submenu-title-wrapper">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>

              关注作者
            </span>
                    }

                >
                    <Menu.Item key="star:1">CSDN</Menu.Item>
                    <Menu.Item key="star:2">GITHUB</Menu.Item>
                </SubMenu>
                {/*<Menu.Item key="git">*/}
                {/*    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">*/}
                {/*        Navigation Four - Link*/}
                {/*    </a>*/}
                {/*</Menu.Item>*/}
            </Menu>
        )
    }
}

export default HeaderView

import React, {Component} from 'react'
import {Menu,Input} from 'semantic-ui-react'
import {Layout} from 'antd';
import "./Header.less"


import {connect} from "dva";

const {Header} = Layout;

class HeaderView extends Component {
  state = {activeItem: 'home'}

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state

    return (
        <Menu>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Menu.Item position='right'>
            <Input icon='search' placeholder='Search mail...' />
          </Menu.Item>
        </Menu>
    )
  }
}

export default HeaderView

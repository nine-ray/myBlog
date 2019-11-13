import React from 'react';
import { Layout } from 'antd';
import Media from 'react-media';
import { connect } from 'dva';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';
import Footer from './Footer';
import 'semantic-ui-css/semantic.min.css';


import Header from './Header';


const { Sider, Content } = Layout;

class BasicLayout extends React.Component {
  componentDidMount() {
  }



  render() {
    const {
      children,
    } = this.props;

    const layout = (
      <Layout>
          <Header
            logo={logo}
            {...this.props}
          />
        <Layout>
          <Sider>Sider</Sider>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
          <Footer />
      </Layout>
    );
    return (
      <React.Fragment>
        {layout}
      </React.Fragment>
    );
  }
}
export default connect(({  }) => ({
}))(props => (
  <Media query="(max-width: 599px)">
    {() => <BasicLayout {...props} />}
  </Media>
));

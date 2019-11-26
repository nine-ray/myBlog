import React from 'react';
import {Col, Layout, Row} from 'antd';
import Media from 'react-media';
import {connect} from 'dva';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';
import Footer from './Footer';
import Sider from "./Sider"
import 'semantic-ui-css/semantic.min.css';


import Header from './Header';


const {Content} = Layout;

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
                <Row>
                    <Col span={18}>
                        <Content className={styles.content}>
                            {children}
                        </Content>
                    </Col>
                    <Col span={6}>
                        <Sider></Sider>
                    </Col>

                </Row>
                <Footer/>
            </Layout>
        );
        return (
            <React.Fragment>
                {layout}
            </React.Fragment>
        );
    }
}

export default connect(({}) => ({}))(props => (
    <Media query="(max-width: 599px)">
        {() => <BasicLayout {...props} />}
    </Media>
));

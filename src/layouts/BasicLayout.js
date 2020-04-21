import React from 'react';
import {Layout} from 'antd';
import Media from 'react-media';
import {connect} from 'dva';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';
import Footer from './Footer';
import 'semantic-ui-css/semantic.min.css';


import Header from './Header';


const {Content} = Layout;

@connect((common) => ({
    deskHeight: common.deskHeight,
    deskDivWidth: common.deskDivWidth
}))
class BasicLayout extends React.Component {
    componentDidMount() {
        this.handleSize();
        // 注册浏览器尺寸变化监听事件， 刷新桌面尺寸
        window.addEventListener('resize', this.handleSize);
    }

    constructor(props){
        super(props);
    }

    componentWillUnmount() {
        // 移除监听事件
        window.removeEventListener('resize', this.handleSize);
    }

// 自适应浏览器的高度
    handleSize = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'common/deskChange',
            payload: {
                deskHeight: document.body.clientHeight,
                deskDivWidth: document.body.clientWidth
            }
        });
    };


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
                <Content className={styles.content}>
                    {children}
                </Content>
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

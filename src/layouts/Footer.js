import React, {Fragment} from 'react';
import {Col, Icon, Layout, Row} from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import ad from "../assets/HTML/adView.html"

const {Footer} = Layout;

const FooterView = () => {
    const friendLinks = [{
        name: "95链",
        link: "http://www.95links.com"
    }];
    const links = [
        {
            key: "ICP证",
            title: "苏ICP备19066171号-1",
            href: "http://www.beian.miit.gov.cn/"
        }
    ];
    return (
        <Footer style={{padding: 0, textAlign: "center"}}>
            <Row justify="start"
                 style={{
                     width: "60%",
                     marginInline: "auto",
                     display: "inline-block",
                     marginTop: 5
                 }}>
                <Col span={2}>
                    友情链接：
                </Col>
                {friendLinks.map((item) => {
                    return <Col span={2} key={item.link}>
                        <a
                            href={item.link}>{item.name}</a>
                    </Col>
                })}
            </Row>
            <iframe
                title="resg"
                src={ad}
                style={{ width: '100%', border: '0px', height: '1100px' }}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                scrolling="auto"
            />
            <GlobalFooter
                links={links}
                copyright={
                    <Fragment>
                        <Icon type="copyright"/> 2019 nine-ray
                    </Fragment>
                }
            />
        </Footer>
    )
};
export default FooterView;

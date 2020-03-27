import React, { Fragment } from 'react';
import {Layout, Icon, Col, Row, Tag} from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import {skipToOther} from "../util/utils"

const { Footer } = Layout;
const {CheckableTag} = Tag;


const FooterView = () => {
    const friendLinks = [];
    return (
        <Footer style={{ padding: 0, textAlign: "center" }}>
            <Row justify="start"
                 style={{
                     width: "60%",
                     marginInline: "auto",
                     display: "inline-block",
                     marginTop: 5
                 }}>
                <Col span={2} >
                    友情链接：
                </Col>
                {friendLinks.map((item) => {
                    return <Col span={2} key={item.link}>
                        <CheckableTag
                            onChange={(e) => {
                                          skipToOther(item.link)
                                      }}>{item.name}</CheckableTag>
                    </Col>
                })}
            </Row>
            <GlobalFooter
                links={[
                ]}
                copyright={
                    <Fragment>
                        Copyright <Icon type="copyright" /> 2019 nine-ray
                    </Fragment>
                }
            />
        </Footer>
    )
};
export default FooterView;

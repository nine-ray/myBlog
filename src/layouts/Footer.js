import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
      ]}
      copyright={
        <Fragment>
          FiveStar API Gateway V1.2 <Icon type="copyright" /> 2016-2019 FiveStar
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;

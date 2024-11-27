import React from 'react';
import { WhoamiContainer } from 'containers/Whoami';
import { AuthContainer } from 'containers/Auth';
import { Col, List, Row, Typography } from 'antd';
import Link from 'next/link';

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <Row>
      <Col span={16}>
        <WhoamiContainer />
      </Col>
      <Col span={8}>
        <List
          bordered
          header={<Typography.Text strong>Pages</Typography.Text>}
        >
          <List.Item>
            <Link href="/admin/nodes" passHref legacyBehavior>
              <Typography.Link>Nodes</Typography.Link>
            </Link>
          </List.Item>
          <List.Item>
            <Link href="/admin/jobs" passHref legacyBehavior>
              <Typography.Link>Jobs</Typography.Link>
            </Link>
          </List.Item>
          <List.Item>
            <Link href="/admin/tags" passHref legacyBehavior>
              <Typography.Link>Tags</Typography.Link>
            </Link>
          </List.Item>
        </List>
      </Col>
    </Row>
  </AuthContainer>
);

export default Page;

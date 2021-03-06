import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeFilled,
} from '@ant-design/icons';
import './Layout.css';
import { useAuth } from '../../hooks/useAuth';

const { Header, Sider, Content } = Layout;

type Props = {
  children: JSX.Element | JSX.Element[];
};

function AppLayout(props: Props): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuth, sigout } = useAuth();

  return (
    <Layout className="app-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeFilled />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/about">About</Link>
          </Menu.Item>
          {isAuth ? (
            <>
              <Menu.Item
                key="3"
                icon={<UploadOutlined />}
                onClick={() => sigout()}
              >
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="4" icon={<UploadOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<UploadOutlined />}>
                <Link to="/signup">Signup</Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item key="6" icon={<UserOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          {/* {isAuth ? (
            <>
              <Menu.Item key="7" icon={<VideoCameraOutlined />}>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
            </>
          ) : (
            <></>
          )} */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              className="trigger"
              onClick={() => setCollapsed((r) => !r)}
            />
          ) : (
            <MenuFoldOutlined
              className="trigger"
              onClick={() => setCollapsed((r) => !r)}
            />
          )}

          <h1 className="header">Udacity Storefront</h1>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;

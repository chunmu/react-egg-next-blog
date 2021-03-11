import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import cx from 'classnames';
import github from '../../assets/images/github.svg';
import styles from  './index.less';
import './common.less';

const { Sider, Content, Header } = Layout;

const Admin: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cx(styles.Main)}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.Logo} >
            <img src={github}/>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              用户管理
            </Menu.Item>
            <Menu.Item key="2">
              文章管理
            </Menu.Item>
            <Menu.Item key="3">
              评论管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className={styles.Header}>
            {
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                onClick: () => {
                  setCollapsed(!collapsed);
                },
              })
            }
          </Header>
          <Breadcrumb className={styles.Breadcrumb}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className={cx(styles.MainContainer, 'admin-container')}
          >
            { props.children }
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;

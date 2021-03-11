import React, { useState } from 'react';
import { Table, Form, Row, Col, Input, Button, Collapse, Modal } from 'antd';
import { Context } from 'egg';
import { ColumnsType } from 'antd/es/table/Table';
import { addUser } from '../../../service/user';
import Layout from '../Layout';
import styles from  './index.less';

export interface User {
  name: string,
  status: number,
  role: number,
  created?: number,
  updated?: number,
  key?: string,
  password: string,
}

interface PageProps {
  ctx: Context
}

const User: React.FC<PageProps> = () => {
  const [form] = Form.useForm();
  const [userForm] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const columns: ColumnsType<User> = [
    {
      title: '用户名',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: '角色',
      key: 'role',
      dataIndex: 'role'
    },
  ];
  const tableData: User[] = [
    {
      name: 'chunmu.zhang',
      status: 1,
      role: 1,
      created: 23232323232323232,
      key: 'chunmu.zhang',
      password: '***'
    }
  ]

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  function handleOk() {
    const valid = userForm.validateFields()
      .then(res => {
        const user: User = {
          name: res.name,
          status: 1,
          role: 1,
          password: '***',
        }
        addUser(user);
      })
      .catch(() => {})
  }
  function handleCancel() {
    setVisible(false);
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <Layout>
      <div className={styles.Main}>
        <Collapse defaultActiveKey={['form', 'table']} ghost>
          <Collapse.Panel header="查询条件" key="form">
            <Form
              form={form}
              name="advanced_search"
              className="ant-advanced-search-form"
              onFinish={onFinish}
            >
              <Row gutter={24}>
                <Col span={8} key="name">
                  <Form.Item
                    name="name"
                    label="用户名"
                  >
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
                <Col span={8} key="status">
                  <Form.Item
                    name="status"
                    label="状态"
                  >
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                      form.resetFields();
                    }}
                  >
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </Collapse.Panel>
          <Collapse.Panel header="查询结果" key="table" style={{marginTop: '8px'}}>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" onClick={() => setVisible(true)}>
                  新增
                </Button>
              </Col>
            </Row>
            <Table columns={columns} dataSource={tableData} sticky bordered size="small"/>
          </Collapse.Panel>
        </Collapse>
        <Modal title="新增/编辑用户" visible={visible} onOk={handleOk} onCancel={handleCancel}>
          <Form
            {...layout}
            form={userForm}
            name="advanced_form"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="用户名"
              rules={[{ required: true }]}
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default User;

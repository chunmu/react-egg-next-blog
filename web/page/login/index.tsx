import React, { useState } from 'react';
import { Alert, Input, Form } from 'antd';
import github from '../../assets/images/github.svg';
import styles from  './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: {getInitialProps: () => any} & React.FC = (props) => {
  const [errMsg, setErrMsg] = useState('');
  function onFinish() {}
  function onFinishFailed() {}
  function onSubmit() {}
  const nameRules = [
    {
      required: true,
      message: '请填写用户名',
    },
  ]
  const passwordRules = [
    {
      required: true,
      message: '请填写密码',
    },
  ]
  return (
    <div className={styles.Login}>
      <div className={styles.logo}>
        <img src={github} alt=""></img>
        <h1>向南居</h1>
      </div>
      <div className={styles.loginForm}>
        {
          errMsg && <LoginMessage content={errMsg}></LoginMessage>
        }
        <Form
          layout="vertical"
          name="login"
          initialValues={{ username: 'Aike', password: '' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名或邮箱地址"
            name="username"
            rules={nameRules}>
            <Input />
          </Form.Item>

          <Form.Item
            label="用户密码"
            name="password"
            rules={passwordRules}>
            <Input />
          </Form.Item>

          <Form.Item noStyle>
            <button className={styles.button} type="submit">登录</button>
          </Form.Item>
        </Form>
        
      </div>
    </div>
  );
};

Login.getInitialProps = () => {
  // const newsId = __isBrowser__ ? (ctx as RouteComponentProps<{id: string}>).match.params.id : (ctx as Context).request.path.split('/')[2]
  return {
    news: ['chunmu.zhang']
  };
}

export default Login

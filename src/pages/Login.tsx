import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export const Login = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ maxWidth: '500px' }} // Adjust maxWidth to at least the width of the textboxes
            >
                <h1 style={{ textAlign: 'left', fontSize: '50px' }}>Sign in</h1>
                <p style={{ textAlign: 'left', fontSize: '25px', marginTop: '-40px' }}>Stay Organize Login</p>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                        style={{ width: '500px', height: '50px', fontSize: '16px' }}  // Set width to 500px
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        style={{ width: '500px', height: '50px', fontSize: '16px' }}  // Set width to 500px
                        iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button   
                        type="primary"
                        htmlType="submit"
                        style={{ height: '50px', fontSize: '18px', padding: '0 30px', width: '100%' }} // Button width 100% of the form
                     >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

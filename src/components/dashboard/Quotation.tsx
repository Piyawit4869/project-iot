import { Button, Card, DatePicker, Input, Select, } from "antd";
import { Form } from "antd";
import { AppLayout } from "../../layout/AppLayout";
import { Link } from "react-router-dom";

export const QuotationPage = () => {

    const onFinish = (values: any) =>{
        console.log('success:', values);
    }

    const onFinishFailed = (errorInfo: any) =>{
        console.log('Failed:', errorInfo);
    }

    const {RangePicker} = DatePicker;
  return (
    <AppLayout>
        <Card
           title="quotation"
           extra={<Link to="/dashboard">เพิ่มเติม</Link>}>
        <div className="userform">
                <Form
                    labelCol={{ span: 6}}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                        <Form.Item
                        label="costumer_name"
                        name="Costumer_name"
                        rules={[{required: true, message: 'please put costumer name'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                        label="due_date"
                        name="Due_date"
                        rules={[{required: true, message: 'please select due date'}]}>
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item
                        label="exp_date"
                        name="Exp_date"
                        rules={[{required: true, message: 'please select range date'}]}>
                            <RangePicker/>
                        </Form.Item>
                        <Form.Item
                        label="money"
                        name="Money"
                        rules={[{required: true, message: 'please select money'}]}>
                            <Select>
                                <Select.Option value='THB'>THB</Select.Option>
                                <Select.Option value='JPY'>JPY</Select.Option>
                                <Select.Option value='USD'>USD</Select.Option>
                                <Select.Option value='EUR'>EUR</Select.Option>
                                <Select.Option value='GBP'>GBP</Select.Option>
                            </Select>
                        </Form.Item>
                        <Link to='/addList'>
                            <Button>Add list</Button>
                        </Link>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to={"/indexquotationpage"}>
                                <Button>Cancel</Button>
                            </Link>
                        </Form.Item>
                </Form>
        </div>
        </Card>
    </AppLayout>
  );
};

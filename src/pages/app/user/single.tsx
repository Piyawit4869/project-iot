import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Divider, Input, Row, Steps } from "antd";
// import React from "react";
// import { useNavigate } from 'react-router-dom';

export const UsersSingle = () => {
    // const navigate = useNavigate();
    
    const horizontalLineStyle = {
        height: '2px',
        background: 'linear-gradient(to right, #f0e68c, #f08080)',
        border: 'none',
        margin: '10px 0',
        width: '50%',
    };

    const searchBoxStyle = {
        width: '50%',
        marginBottom: '20px',
    };

    return (
        <div>
            <Row>
                <Col span={18}>
                    <Breadcrumb style={{ marginBottom: "20px" }}>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/users">ตั้งค่าผู้ใช้</Breadcrumb.Item>
                        <Breadcrumb.Item>ลงทะเบียนผู้ใช้</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>ประวัติการใช้งาน</h1>
                    <div style={{ ...horizontalLineStyle, marginLeft: 0 }}></div>
                    <Row>
                        <Col span={24}>
                            <Input.Search
                                placeholder="ค้นหา"
                                onSearch={(value) => console.log(value)}
                                style={searchBoxStyle}
                            />
                        </Col>
                    </Row>
                    <div style={{ ...horizontalLineStyle, marginLeft: 0 }}></div>
                </Col>
                <Col span={6}>
                    <Steps
                        progressDot
                        current={1}
                        direction="vertical"
                        items={[
                            {
                                title: 'Finished',
                                description: 'This is a description. This is a description.',
                            },
                            {
                                title: 'Finished',
                                description: 'This is a description. This is a description.',
                            },
                            {
                                title: 'In Progress',
                                description: 'This is a description. This is a description.',
                            },
                            {
                                title: 'Waiting',
                                description: 'This is a description.',
                            },
                            {
                                title: 'Waiting',
                                description: 'This is a description.',
                            },
                        ]}
                    />
                </Col>
            </Row>
            <Divider />
        </div>
    );
};





import { Card, Row, Typography } from "antd";
import { Title } from "../components/global/Title";
import Column from "antd/es/table/Column";

export const Analytics = () => {

    return (
    <div>
        {Title("Analytics")}
        <Card title="Analytics">
            <Row>
                <div>
                    <Typography>
                        รายได้ปี 2566
                    </Typography>
                </div>
                <div>
                    <Typography>
                        รายได้ปี 2566
                    </Typography>
                </div>
                <div>
                    <Typography>
                        รายได้ปี 2566
                    </Typography>
                </div>
            </Row>
            <Column></Column>
        </Card>
    </div>
  );
};


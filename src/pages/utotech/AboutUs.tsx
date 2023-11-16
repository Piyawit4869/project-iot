import { Typography, Row, Image, Card, Col } from "antd";

const mockData = [
  {
    id: 1,
    image:
      "https://e7.pngegg.com/pngimages/420/821/png-clipart-computer-icons-scalable-graphics-icon-design-data-analysis-analysis-icon-text-logo.png",
    title: "DESIGN AND ANALYSIS",
    description: "Description for Item 1",
    detail:
      "Planning and designing a backyard system Starting from designing flowchart, database system and schema and much more. according to the needs of the users that the mentor has assigned.",
  },
  {
    id: 2,
    image: "https://cdn-icons-png.flaticon.com/512/8759/8759392.png",
    title: "DEVELOPMENT",
    description: "Description for Item 2",
    detail:
      "The work involved in developing a website for the Internet or an intranet. Development can range from developing a simple single static page of plain text to complex web applications services.",
  },
  {
    id: 3,
    image: "https://cdn-icons-png.flaticon.com/512/5269/5269933.png",
    title: "SUPPORT",
    description: "Description for Item 3",
    detail:
      "Take care of the part that they created and helping customers such as fixing bugs, fixing or adding various features in the system and including helping customers to give advice on how to use it.",
  },
];

export const AboutUs = () => {
  return (
    <div>
      <div
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <div style={{ width: "60%" }}>
          <Typography style={{ fontSize: "36px" }}>
            About UTOTECH COMPANY LIMITED
          </Typography>
        </div>
        <Row
          justify="center"
          style={{
            paddingTop: "30px",
            paddingLeft: "25%",
            paddingRight: "25%",
            paddingBottom: "60px",
          }}
        >
          <Typography style={{ fontSize: "20px", color: "grey" }}>
            "Utotech is a web design & coding studio based in Bangkok. We help
            you create and enhance your brand through smart, distinct and
            meaningful digital experience design."
          </Typography>
        </Row>
      </div>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOxgXTO4Kc4XORUFvZembSzymC7B6RYupJLQ&usqp=CAU"
        width="100%"
        preview={false}
      />
      <div
        style={{
          marginTop: "120px",
          marginBottom: "120px",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Typography style={{ fontSize: "36px" }}>INFORMATION</Typography>
          <Typography style={{ fontSize: "20px", color: "grey" }}>
            Details of work performed at the internship
          </Typography>
        </div>
        <Row gutter={16}>
          {mockData.map((item) => (
            <Col key={item.id} span={24}>
              <Card>
                <Row justify="space-around" align="middle">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "250px",
                    }}
                  >
                    <Image src={item.image} width="200px" preview={false} />
                    <h2>{item.title}</h2>
                  </div>
                  <div style={{ width: "250px" }}>
                    <Typography style={{ fontSize: "20px", color: "grey" }}>
                      {item.description}
                    </Typography>
                  </div>
                  <div style={{ width: "300px" }}>
                    <Typography style={{ fontSize: "20px", color: "grey" }}>
                      {item.detail}
                    </Typography>
                  </div>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

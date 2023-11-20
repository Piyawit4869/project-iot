import { Image, Row, Typography } from "antd";
import { useParams } from "react-router-dom";

export const SingleOption = () => {
  const { id } = useParams();

  return (
    <div
      style={{ paddingTop: "60px", paddingLeft: "10%", paddingRight: "10%" }}
    >
      <Row justify="space-around">
        <Image
          width={350}
          preview={false}
          src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
          style={{ marginBottom: "30px" }}
        />

        <div style={{ width: "350px" }}>
          <Typography style={{ fontSize: "36px", marginBottom: "10px" }}>
            Title {id}
          </Typography>
          <Typography
            style={{ fontSize: "20px", color: "grey", marginBottom: "30px" }}
          >
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced
            below for those interested. Sections 1.10.32 and 1.10.33 from "de
            Finibus Bonorum et Malorum" by Cicero are also reproduced in their
            exact original form, accompanied by English versions from the 1914
            translation by H. Rackham.
          </Typography>
        </div>
      </Row>
    </div>
  );
};

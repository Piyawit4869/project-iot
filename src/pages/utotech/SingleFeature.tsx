import { Image, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import * as API from "../../apis";

export async function featureLoader({ params }: any) {
  console.log(params);

  try {
    const { data } = await API.features.get(params.id);

    console.log(data);

    return { data: data };
  } catch (error) {
    return { data: null };
  }
}

export const SingleFeature = () => {
  const { data } = useLoaderData() as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // console.log(data);

  return (
    <div style={styles.mainBox}>
      <Row justify="space-around">
        <Image
          width={350}
          preview={false}
          src={data.imageUrl}
          style={{ marginBottom: "30px" }}
        />

        <div style={styles.textBox}>
          <Title level={3}>{data.title}</Title>
          <Typography style={{ color: "grey" }}>{data.description}</Typography>
        </div>
      </Row>
    </div>
  );
};

const styles = {
  mainBox: {
    paddingTop: "60px",
    marginBottom: "30px",
    paddingLeft: "10%",
    paddingRight: "10%",
  } as React.CSSProperties,
  textBox: { width: "350px" } as React.CSSProperties,
};

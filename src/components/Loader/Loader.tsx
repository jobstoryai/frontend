import React from "react";
import { Row, Spin } from "antd";

export const Loader = () => (
  <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
    <Spin />
  </Row>
);

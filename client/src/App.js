import React from "react";
import { Typography } from "antd";
import { AndroidOutlined } from "@ant-design/icons";
import Chatbot from "./component/Chatbot";

const { Title } = Typography;

function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Title level={2}>
          Hello chat bot~
          <AndroidOutlined />
        </Title>{" "}
      </div>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Chatbot />
      </div>{" "}
    </div>
  );
}

export default App;

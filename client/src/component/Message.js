import React from "react";
import { List, Avatar } from "antd";

export default function Message(props) {
  return (
    <List.Item key={props.key} style={{ padding: "1rem" }}>
      <List.Item.Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={props.who}
        description={props.text}
      />
    </List.Item>
  );
}

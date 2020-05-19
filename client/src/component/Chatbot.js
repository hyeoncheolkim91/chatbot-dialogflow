import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import saveMessage from "../_actions/save_message";
import Message from "./Message";

const Chatbot = () => {
  const dispatch = useDispatch();
  const messageFromRedux = useSelector((state) => state.message);
  useEffect(() => {
    eventQuery("WelcomeEvent");
  }, []);

  const textQuery = async (text) => {
    let talk = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };
    dispatch(saveMessage(talk));

    const textQueryVariable = {
      text,
    };
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/dialogflow/textQuery",
        textQueryVariable
      );
      const content = response.data.fulfillmentMessages[0];
      let talk = {
        who: "Chatbot",
        content: content,
      };
      dispatch(saveMessage(talk));
    } catch (error) {
      let talk = {
        who: "Chatbot",
        content: {
          text: {
            text: "Unknown error occured.",
          },
        },
      };
      dispatch(saveMessage(talk));
    }
  };
  const eventQuery = async (event) => {
    const eventQueryVariable = {
      event,
    };
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/dialogflow/eventQuery",
        eventQueryVariable
      );
      const content = response.data.fulfillmentMessages[0];

      let talk = {
        who: "Chatbot",
        content: content,
      };
      dispatch(saveMessage(talk));
    } catch (error) {
      let talk = {
        who: "Chatbot",
        content: {
          text: {
            text: "Unknown error occured.",
          },
        },
      };
      dispatch(saveMessage(talk));
    }
  };
  const keyPressHandle = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        alert("you need to type something");
      }

      textQuery(event.target.value);
    }
  };

  const renderOneMessage = (message, i) => {
    return (
      <Message
        key={i}
        who={message.who}
        text={message.content.text.text}
      ></Message>
    );
  };

  const renderMessages = (returnedMessage) => {
    if (returnedMessage) {
      return returnedMessage.map((message, i) => {
        return renderOneMessage(message, i);
      });
    }
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div
        style={{
          height: 644,
          width: "100%",
          overflow: "auto",
        }}
      >
        {renderMessages(messageFromRedux)}
      </div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        type="text"
        onKeyPress={keyPressHandle}
      ></input>
    </div>
  );
};

export default Chatbot;

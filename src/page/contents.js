import React, { useState, useEffect, useRef } from "react";
import ChatMessages from "./chat";

function Contents(props) {
  const [data, setData] = useState([]);
  let url;
  if (props.options) {
    url =
      "https://d9wqfr-8000.csb.app/claude/history_conversation_contents?conversation_uuid=" +
      props.options;
  }
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        setData(data.chat_messages.sort((a, b) => a.index - b.index))
      )
      .catch((error) => console.info(error));
  }, [url]);

  const handleMessage = (Message) => {
    setData((prev) => [...prev, Message]);
  };
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollTo(0, divRef.current.scrollHeight);
  }, [data]);
  let width = "70%";
  let left = '15%';
  let height = '75vh';
  if (
    navigator.userAgent.match(/(iPhone|iPad|iPod|Android|Windows Phone|Mobile|BlackBerry|Palm|Tablet|iPad)/) ) {
     // eslint-disable-next-line no-const-assign
     width = "90%";
     left = '0'
     height = '65vh'   
  } 
  return (
    <div>
      <div
        ref={divRef}
        style={{
          height: height,
          overflowY: "auto",
          // border: "1px solid black",
          padding: "10px",
          backgroundColor: "white",
          fontSize: "large",
          width: width,
          left: left,
          position: "relative",
        }}
      >
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          什么都可以问我哦！
        </p>
        {data.map((item) => {
          let replacedText = item.text;

          // const html = marked(replacedText);

          // console.log(html);
          if (item.sender === "human") {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ display: "inline-block" }}>
                  <p
                    style={{
                      background: "#dfd6c8",
                      maxWidth: "100%",
                      wordBreak: "break-all",
                      whiteSpace: "pre-wrap",
                      padding: "2px 5px",
                      borderRadius: "10px",
                    }}
                  >
                    {replacedText}
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div>
                <p
                  style={{
                    background: "#e6e8eb",
                    maxWidth: "100%",
                    wordBreak: "break-all",
                    whiteSpace: "pre-wrap",
                    padding: "2px 5px",
                    borderRadius: "10px",
                  }}
                >
                  {replacedText}
                </p>
              </div>
            );
          }
        })}
      </div>
      <ChatMessages
        onMessage={handleMessage}
        uuid={props.options}
      ></ChatMessages>
    </div>
  );
}
export default Contents;

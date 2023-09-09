import React, { useState, useEffect, useRef } from "react";
import ChatMessages from "./chat";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

function Contents(props) {
  const [data, setData] = useState([]);
  let url;
  if (props.options) {
    url =
      "https://j8lk3p-8000.csb.app/claude/history_conversation_contents?conversation_uuid=" +
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
    if (Message.index === 1 || Message.sender === "human") {
      setData((prev) => [...prev, Message]);
    } else {
      setData((prev) => {
        const newState = [...prev]; // 先拷贝一份
        newState[newState.length - 1] = Message; // 修改副本
        return newState; // 返回新的状态对象
      });
    }
  };
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollTo(0, divRef.current.scrollHeight);
  }, [data]);
  let width = "70%";
  let left = "15%";
  let height = "75vh";
  if (window.matchMedia('(max-width: 600px)').matches) {
    width = "95%";
  } 
  if (
    navigator.userAgent.match(
      /(iPhone|iPad|iPod|Android|Windows Phone|Mobile|BlackBerry|Palm|Tablet|iPad)/
    )
  ) {
    width = "95%";
    left = "0%";
    height = "75vh";
  }

  // 点击事件处理函数
  const copyToClipboard = (replacedText) => {
    navigator.clipboard.writeText(replacedText);
  };

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
          if (item.sender === "human") {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    background: "#dfd6c8",
                    maxWidth: "100%",
                    wordBreak: "break-all",
                    padding: "2px 5px",
                    borderRadius: "10px",
                    display: "inline-block",
                    margin: 0,
                  }}
                >
                  <ReactMarkdown
                    children={replacedText}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            children={String(children).replace(/\n$/, "")}
                            style={dark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  ></ReactMarkdown>
                </div>
              </div>
            );
          } else {
            return (
              <div
                style={{
                  background: "#e6e8eb",
                  wordBreak: "break-all",
                  padding: "2px 5px",
                  borderRadius: "10px",
                  margin: 0,
                }}
              >
                <div style={{ right: "0%", position: "absolute",paddingRight:'14px' }}>
                  <button
                    id="copyBtn"
                    onClick={() => copyToClipboard(replacedText)}
                    
                  >
                    复制
                  </button>
                </div>
                <ReactMarkdown
                  children={replacedText}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, "")}
                          style={dark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                ></ReactMarkdown>
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

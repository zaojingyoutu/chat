import React, { useState } from "react";

function ChatMessages(props) {
  const [inputText, setInputText] = useState("");
  const [status, setStatus] = useState("idle");

  const submitText = () => {
    // let url = `https://d9wqfr-8000.csb.app/claude/append_message?conversation_uuid=${props.uuid}&prompt=${inputText}`;
    let url = "https://d9wqfr-8000.csb.app/claude/append_message";
    props.onMessage({ text: inputText, sender: "human" });
    setInputText("");
    setStatus("pending");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation_uuid: props.uuid,
        prompt: inputText,
      }),
    };
    fetch(url, options)
    .then(response => {
      // 获取 reader 对象
      const reader = response.body.getReader();
      let index = 0
      // 定义一个解码器
      const decoder = new TextDecoder();
      // 定义一个循环函数
      function read() {
        // 读取数据块
        reader.read().then(({ value, done }) => {
          // 如果读取完毕，退出循环
          if (done) {
            return;
          }
          // 将数据块转换为字符串
          const chunk = decoder.decode(value);
          // 分割数据块
          const lines = chunk.split('\n');
          // 遍历每一行
          for (const line of lines) {
            // 忽略空行和注释行
            if (line === '' || line.startsWith(':')) {
              continue;
            }
            // 如果是 data 行，打印出来
            if (line.startsWith('data:')) {
              try {
                const json = JSON.parse(line.slice(5));
                props.onMessage({ index: ++index, text:json.completion , sender: "assistant" });
              } catch (error) {
                
              }
            }
          }
          // 继续读取下一个数据块
          read();
        });
      }
      // 开始循环读取
      read();
      setStatus("success");
    }).catch(() => setStatus("error"));
  };
  return (
    <div
      style={{
        display: "flex",
        width: "33%",
        height: "50px",
        justifyContent: "center",
        position: "absolute",
        alignItems: "center",
        left: "31%",
        padding: "10px",
        bottom: "0",
        zIndex: "999",
      }}
    >
      <textarea
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          width: "auto",
          flexGrow: 1,
          minWidth: 200,
          fontSize: "large",
          margin: "5px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            e.ctrlKey === false &&
            e.shiftKey === false &&
            e.altKey === false
          ) {
            submitText();
          }
        }}
      />

      <button onClick={submitText}>发送</button>
      <div style={{ padding: "5px 10px" }}>
        {" "}
        {status === "pending" && <div>等待中...</div>}
        {status === "success" && <div>发送成功!</div>}
        {status === "error" && <div>发送失败!</div>}
      </div>
    </div>
  );
}

export default ChatMessages;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";

function CreateChat(props) {
  const [showModal, setShowModal] = useState(false);
  const setData = props.options;

  return (
    <>
      <button onClick={() => setShowModal(true)}>设置</button>

      {showModal && (
        <Modal
          onConfirm={(e) => {
            setShowModal(false);
            fetch(
              "https://4cvprt-8000.csb.app/claude/chat_conversation?name=" + e
            )
              .then((res) => res.json())
              .then((data) => {
                setData((prev) => [...prev, { name: e, uuid: data.data }]);
                props.onChange(data.data);
                props.onNameChange(e);
              })
              .catch((error) => console.info(error));
          }}
          onCancel={() => setShowModal(false)}
          uuid={props.uuid}
        />
      )}
    </>
  );
}

function Modal({ onConfirm, onCancel, uuid }) {
  const [input, setInput] = useState("");
  const [creat, setcreat] = useState("none");

  return (
    <div
      className="modal"
      style={{
        zIndex: 1,
        position: "absolute",
        left: "20%",
        top: "20%",
        width: "20vh",
        height: "20vh",
        backgroundColor: "aliceblue",
      }}
    >
      <span
        onClick={() => {
          if (creat === "none") {
            setcreat("block");
          } else {
            setcreat("none");
          }
        }}
      >
        <a style={{ cursor: 'pointer'}} >新建会话</a>
      </span>
      <br />
      
      <div style={{ display: creat }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => onConfirm(input) } style={{position: 'absolute', right: "0%"}}>创建</button>
      </div>
      <span 
        onClick={() => {
          fetch("https://4cvprt-8000.csb.app/claude/" + uuid, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.status === 200) {
              alert("删除成功");
              window.location.reload()
            } else alert("删除失败");
          });
        }}
      >
        <a style={{ cursor: 'pointer'}} >删除</a>
      </span>

      <button
        onClick={onCancel}
        style={{ bottom: 0, position: "absolute", right: "0%" }}
      >
        关闭
      </button>
    </div>
    
  );
}


export default CreateChat;

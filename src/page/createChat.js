import { useState } from "react";

function CreateChat(props) {
  const [showModal, setShowModal] = useState(false);
  const setData = props.options;

  return (
    <>
      <button onClick={() => setShowModal(true)}>新建会话</button>

      {showModal && (
        <Modal
          onConfirm={(e) => {
            setShowModal(false);
            fetch(
              "https://d9wqfr-8001.csb.app/claude/chat_conversation?name=" + e
            )
              .then((res) => res.json())
              .then((data) => {
                setData((prev) => [...prev, { name: e, uuid: data.data }]);
                props.onChange(data.data)
                props.onNameChange(e);
              })
              .catch((error) => console.info(error));
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

function Modal({ onConfirm, onCancel }) {
  const [input, setInput] = useState("");

  return (
    <div className="modal">
      <input value={input} onChange={(e) => setInput(e.target.value)} />

      <button onClick={() => onConfirm(input)}>创建</button>

      <button onClick={onCancel}>关闭</button>
    </div>
  );
}

export default CreateChat;

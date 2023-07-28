import React, { useState } from 'react';

function ChatMessages(props) {

  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('idle');

  const submitText = () => {
    // let url = `https://d9wqfr-8000.csb.app/claude/append_message?conversation_uuid=${props.uuid}&prompt=${inputText}`;
    let url ='https://d9wqfr-8000.csb.app/claude/chat_message'
    props.onMessage({'text':inputText,'sender':'human'})
    setInputText('')
    setStatus('pending'); 
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({conversation_uuid:props.uuid,prompt:inputText})
    };
    fetch(url,options)
      .then(res => res.json())
      .then(data => {props.onMessage({'text':data.data,'sender':'assistant'}) ;setStatus('success'); }
      )
      .catch(() => setStatus('error'));
     
  }
  return (
    <div style={{
        display: 'flex',
        width:'33%',
        height:'35px',
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        left: '31%',
        padding:'10px'
      }}>
      <textarea 
        type="text" 
        value={inputText}
        onChange={e => setInputText(e.target.value)} 
        style={{
            width: 'auto',
            flexGrow: 1, 
            minWidth: 200,
            fontSize:'large',
            margin:'5px'
          }}
      />

      <button onClick={submitText}>发送</button> 
      <div style={{padding: '5px 10px'}}> {status === 'pending' && <div>等待中...</div>}
      {status === 'success' && <div>发送成功!</div>}
      {status === 'error' && <div>发送失败!</div>}</div>
      
    </div>
  );

}

export default ChatMessages;
import React, { useState } from 'react';

function ChatMessages(props) {

  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('idle');

  const submitText = () => {
    let url = `https://d9wqfr-8001.csb.app/claude/append_message?conversation_uuid=${props.uuid}&prompt=${inputText}`;
    props.onMessage({'text':inputText,'sender':'human'})
    setInputText('')
    setStatus('pending'); 
    fetch(url)
      .then(res => res.json())
      .then(data => {props.onMessage({'text':data.data,'sender':'assistant'}) ;setStatus('success'); }
      )
      .catch(() => setStatus('error'));
     
  }
  return (
    <div style={{
        display: 'flex',
        width:'100%',
        height:'35px',
        // left: '33%',
        position: 'absolute',
      }}>
      <textarea 
        type="text" 
        value={inputText}
        onChange={e => setInputText(e.target.value)} 
        style={{
            width: 'auto',
            flexGrow: 1, 
            minWidth: 200,
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
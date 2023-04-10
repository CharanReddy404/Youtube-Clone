import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomMessage, generateRandomName } from '../utils/helper';

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState('');

  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      //API Polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMessage(),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className='w-full h-[560px] bg-slate-100 rounded-lg ml-2 p-2 border border-black overflow-y-scroll flex flex-col-reverse'>
        {chatMessages.map((c, i) => (
          <ChatMessage name={c.name} message={c.message} key={i} />
        ))}
      </div>
      <form
        className='w-full p-2 ml-2 border border-black'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: 'Charan',
              message: liveMessage,
            })
          );
          setLiveMessage('');
        }}
      >
        <input
          className='w-64 p-1'
          type='text'
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className='px-2 py-1 mx-2 bg-slate-200 rounded-sm'>Send</button>
      </form>
    </>
  );
};

export default LiveChat;

import { useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomMessage, generateRandomName } from '../utils/helper';

const LiveChat = () => {
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
    }, 1000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className='w-full h-[560px] bg-slate-100 rounded-lg ml-2 p-2 border border-black overflow-y-scroll flex flex-col-reverse'>
      {chatMessages.map((c, i) => (
        <ChatMessage name={c.name} message={c.message} key={i} />
      ))}
    </div>
  );
};

export default LiveChat;

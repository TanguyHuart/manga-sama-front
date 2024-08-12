import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { clearMessages } from '../../store/reducers/loading';
import './Message.scss';

type MessageProps = {
  messageContent: string;
};

function Message({ messageContent }: MessageProps) {
  const dispatch = useAppDispatch();
  function handleCloseMessageModal() {
    dispatch(clearMessages());
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="dialogMessage">
      <button
        onClick={handleCloseMessageModal}
        className="dialogMessage__close-btn"
        type="button"
      >
        <img src="/assets/icons/add.png" alt="close icon" />
      </button>
      <p> {messageContent} </p>
    </div>
  );
}

export default Message;

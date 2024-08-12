import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';

import { clearMessages } from '../../store/reducers/loading';
import './ErrorMessage.scss';

type ErrorMessageState = {
  errorContent: string;
};

function ErrorMessage({ errorContent }: ErrorMessageState) {
  const dispatch = useAppDispatch();

  function handleCloseErrorMessageModal() {
    dispatch(clearMessages());
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);
  return (
    <div className="dialogError">
      <button
        onClick={handleCloseErrorMessageModal}
        className="dialogError__close-btn"
        type="button"
      >
        <img src="/assets/icons/add.png" alt="close icon" />
      </button>
      <p> {errorContent} </p>
    </div>
  );
}

export default ErrorMessage;

import React, { useState } from "react";

type LoginButtonProps = {
  buttonText: string;
};

const LoginButton: React.FC<LoginButtonProps> = ({ buttonText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="login-button" onClick={handleButtonClick}>
        {buttonText}
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Login Form</h2>
            <form>
              <label>
                Username:
                <input type="text" />
              </label>
              <label>
                Password:
                <input type="password" />
              </label>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;

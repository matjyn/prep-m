import { useState } from "react";
import { useUserStore } from "../../stores/user";
import { Modal } from "../ui/Modal/Modal";
import LoginForm from "./LoginForm";

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [isOpen, setIsOpen] = useState(false);

  const showLoginModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    setUser({ email: data.email });
    setIsOpen(false);
  };

  return (
    <>
      <div>{user ? user.email : <button onClick={showLoginModal}>Login</button>}</div>

      <Modal
        isOpen={isOpen}
        onClose={showLoginModal}
      >
        <LoginForm onSubmit={handleLoginSubmit} />
      </Modal>
    </>
  );
};

export { UserInfo };

import { useState } from "react";
import { useUserStore } from "../../stores/user";
import { Modal } from "../ui/Modal/Modal";
import LoginForm from "./LoginForm";
import Button from "../ui/Button/Button";

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
      <div>{user ? user.email : <Button onClick={showLoginModal}>Login</Button>}</div>

      <Modal
        isOpen={isOpen}
        onClose={showLoginModal}
        className="w-full"
      >
        <LoginForm onSubmit={handleLoginSubmit} />
      </Modal>
    </>
  );
};

export { UserInfo };

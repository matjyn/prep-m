import { useState } from "react";
import { useUserStore } from "../../stores/user";
import { Modal } from "../ui/Modal/Modal";
import { LoginForm } from "./LoginForm";
import { Button } from "../ui/Button/Button";

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const [isOpen, setIsOpen] = useState(false);

  const showLoginModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    setUser({ email: data.email });
    setIsOpen(false);
  };

  const handleLogout = () => {
    clearUser();
  };

  return (
    <>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="flex align-center">{user.email}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button onClick={showLoginModal}>Login</Button>
        )}
      </div>

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

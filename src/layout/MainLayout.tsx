import { Outlet } from "react-router";
import { Header } from "../components/layout/Header";
import { useUserStore } from "../stores/user";
import { Modal } from "../components/ui/Modal/Modal";
import { UserInfo } from "../components/common/UserInfo";

const MainLayout = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="p-3">
      <Header />

      <div className="py-3">
        {user ? (
          <Outlet />
        ) : (
          <Modal
            isOpen={true}
            onClose={() => {}}
          >
            <div className="flex flex-column justify-center align-center gap-2 p-4">
              <p className="text-center m-0">You must login first!</p>
              <UserInfo />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export { MainLayout };

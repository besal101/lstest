import Modal from "@features/modal/modal";
import dynamic from "next/dynamic";
import { useAppSelector } from "@hooks/useRedux";
import { CloseModal } from "@features/modal/modalSlice";

const DeliveryAddresses = dynamic(
  () => import("@features/address/Delivery-address")
);
const LoginView = dynamic(() => import("@features/auth/Login"));
const SignUp = dynamic(() => import("@features/auth/Signup"));
const ForgetPasswordForm = dynamic(
  () => import("@features/auth/ForgetPassword")
);

const ManagedModal: React.FC = () => {
  const { isOpen, view } = useAppSelector((state) => state.modal);

  return (
    <Modal open={isOpen} onClose={CloseModal}>
      {view === "DELIVERY_VIEW" && <DeliveryAddresses />}
      {view === "LOGIN_VIEW" && <LoginView />}
      {view === "SIGN_UP_VIEW" && <SignUp />}
      {view === "FORGET_PASSWORD" && <ForgetPasswordForm />}
    </Modal>
  );
};

export default ManagedModal;

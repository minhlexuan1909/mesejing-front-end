import Binh from "../Binh";
import AuthPage from "../features/auth/pages/AuthPage/AuthPage";
import ForgotResetPassPage from "../features/auth/pages/ForgotResetPassPage/ForgotResetPassPage";
import OtpPage from "../features/auth/pages/OtpPage/OtpPage";
import MinhChatPage from "../features/chat/pages/MinhChatPage";
import ContactPage from "../features/profile/pages/ContactPage/ContactPage";
import Minh from "../Minh";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const routes = [
  {
    path: "/minh",
    element: <Minh />,
  },
  {
    path: "/binh",
    element: <Binh />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/otp",
    element: <OtpPage />,
  },
  {
    path: "/chat",
    element: <PrivateRoutes component={<MinhChatPage />} />,
  },
  {
    path: "/reset-password",
    element: <ForgotResetPassPage />,
  },
  {
    path: "/contacts",
    element: <ContactPage />,
  },
];

export default routes;

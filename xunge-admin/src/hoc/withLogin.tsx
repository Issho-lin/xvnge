import { useLoginStatus } from "@/hooks/useLoginStatus";
import { Navigate } from "react-router-dom";

const withLogin = <P extends object>(Component: React.FC<P>) => {
  return (props: P) => {
    const { isLogin } = useLoginStatus();
    if (!isLogin) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
};
export default withLogin;
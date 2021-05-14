import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { TOKEN_KEY } from "../config";

export const AuthContext = React.createContext<{
  token: string | null;
  setToken: any;
}>({ token: "", setToken: undefined });

const AuthProvider: React.FunctionComponent<{ children: any }> = ({
  children,
}) => {
  /**
   * History hook
   */
  const history = useHistory();

  /**
   * Get pathname
   */
  const { pathname } = useLocation();

  /**
   * Flag for checking is application loaded
   */
  const [ready, setReady] = React.useState(false);

  /**
   * Token
   */
  const [token, setToken] = React.useState<string | null>(null);

  /**
   * When the first mount this component will check is there a token exists on disk
   */
  React.useEffect(() => {
    function checkToken() {
      const diskToken = localStorage.getItem(TOKEN_KEY);
      setReady(true);
      if (!diskToken && pathname !== "login") {
        return history.push("/login");
      }
      setToken(diskToken);
    }

    if (!ready) {
      checkToken();
    }
  }, [ready]);

  /**
   * Token will only change when user login success or logout
   */
  React.useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);

      if (pathname === "/login") history.push("/");
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  /**
   * Show a loading if we are currently checking token on disk
   */
  if (!ready) return <h1>We are checking your authorization!...</h1>;

  return (
    //@ts-ignore
    <AuthContext.Provider value={{ setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

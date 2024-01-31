import { RecoilRoot } from "recoil";
import "./App.css";
import { UserProvider } from "./providers/UserProvider";
import { Router } from "./router/Router";

export const App = () => {
  return (
    <RecoilRoot>
      <UserProvider>
        <Router />;
      </UserProvider>
    </RecoilRoot>
  );
};

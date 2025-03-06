import { MainPage } from "./pages/MainPage/MainPage";
import { Settings } from "./components/Settings/Settings";

export const App = () => {
  return (
    <Settings>
      <MainPage />
    </Settings>
  );
};

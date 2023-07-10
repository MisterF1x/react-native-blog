import "react-native-gesture-handler";
import { MainNavigation } from "./src/navigation/MainNavigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};
export default App;

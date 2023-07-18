import "react-native-gesture-handler";
import { MainNavigation } from "./src/navigation/MainNavigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        hidden={false}
        translucent={true}
        barStyle={"dark-content"}
        backgroundColor={"#fff0"}
      />
      <MainNavigation />
    </Provider>
  );
};
export default App;

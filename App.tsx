import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/navigation/stacks/RootStack";

function App() {
  return <NavigationContainer>
    <RootStack />
  </NavigationContainer>
}

export default App;

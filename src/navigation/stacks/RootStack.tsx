import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppTabStack, type AppTabStackParamList } from "./AppStack";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { LoginScreen } from "../screens/LoginScreen";

export type RootStackParamsList = {
    WelcomeScreen:undefined;
    LoginScreen:undefined;
    AppTabStack:NavigatorScreenParams<AppTabStackParamList>;
};

const Root = createNativeStackNavigator<RootStackParamsList>()

export const RootStack: React.FC = () => {
    return (<Root.Navigator screenOptions={{
        contentStyle:{
            backgroundColor:'#fff',

        },
        animation:'ios_from_right',
    }}>
        <Root.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown:false}}/>
        <Root.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
        <Root.Screen name="AppTabStack" component={AppTabStack} options={{headerShown:false}}/>
    </Root.Navigator>
)};
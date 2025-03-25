import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTab } from "../screens/AppTab/HomeTab";
import { NotificationsTab } from "../screens/AppTab/NotificationsTab";
import { ExploreTab } from "../screens/AppTab/ExploreTab";
import { ProfileTab } from "../screens/AppTab/ProfileTab";
import Ionicons from 'react-native-vector-icons/Ionicons';

export type AppTabStackParamList = {
    HomeTab: undefined;
    NotificationsTab: {nombre: string};
    ExploreTab: undefined;
    ProfileTab: undefined;
}

const Tab = createBottomTabNavigator<AppTabStackParamList>();

export const AppTabStack: React.FC = () => {
    return <Tab.Navigator screenOptions={{animation:'shift', sceneStyle:{backgroundColor: '#eef0f4'}}}>
                <Tab.Screen name= 'HomeTab' component={HomeTab} options={{title: 'POKEDEX', headerShadowVisible: false, 
                    tabBarIcon({color, focused, size}) {
                        return (
                        <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={size}
                                color={color}
                        />
                        );
                    },
                }}/>
                <Tab.Screen name= 'NotificationsTab' component={NotificationsTab} options={{title: 'Detalles', headerShadowVisible: false, 
                    tabBarIcon({color, focused, size}) {
                        return (
                        <Ionicons
                                name={focused ? 'notifications' : 'notifications-outline'}
                                size={size}
                                color={color}
                        />
                        );
                    },
                }}/>
                <Tab.Screen name= 'ExploreTab' component={ExploreTab} options={{title: 'Explore', headerShadowVisible: false, 
                    tabBarIcon({color, focused, size}) {
                        return (
                        <Ionicons
                                name={focused ? 'telescope' : 'telescope-outline'}
                                size={size}
                                color={color}
                        />
                        );
                    },
                }}/>
                <Tab.Screen name= 'ProfileTab' component={ProfileTab} options={{title: 'Profile', headerShadowVisible: false, 
                    tabBarIcon({color, focused, size}) {
                        return (
                        <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                size={size}
                                color={color}
                        />
                        );
                    },
                }}/>
        </Tab.Navigator>;
};
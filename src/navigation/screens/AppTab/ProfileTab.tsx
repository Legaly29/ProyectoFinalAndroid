import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../stacks/RootStack";

export const ProfileTab: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("loggedUser");
            setUsername(storedUser);
        };
        loadUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("loggedUser");
        navigation.replace("LoginScreen");
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Perfil</Text>
            {username && <Text style={{ fontSize: 18, marginVertical: 10 }}>👤 {username}</Text>}
            <TouchableOpacity 
                onPress={handleLogout} 
                style={{ backgroundColor: "red", padding: 12, borderRadius: 8, marginTop: 20 }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};
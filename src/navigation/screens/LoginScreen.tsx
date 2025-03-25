import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { StatusBar } from "react-native";
import { useState } from "react";
import { RootStackParamsList } from "../stacks/RootStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
const APPLOGO = require('../../assets/logo.png');

type Props = NativeStackScreenProps<RootStackParamsList, 'LoginScreen'>

const users: Record<string, string> = {
    "Admin": "Admin",
    "Ivance29": "Awerewe1",
    "IDAT": "IDAT2025"
};


export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const onLoginPress = async () => {
    if (users.hasOwnProperty(username) && users[username] === password) {
        await AsyncStorage.setItem("loggedUser", username); 
        navigation.replace("AppTabStack", { screen: "HomeTab" });
    } else {
            Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
};
    

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={APPLOGO} style={{ width: 100, height: 100 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
                    Login
                </Text>
            </View>
            <View style={{ paddingHorizontal: 24, gap: 8, paddingBottom: 32 }}>
                <TextInput 
                    placeholder="Usuario" 
                    style={{ backgroundColor: '#f2f2f2', borderRadius: 8, padding: 10, marginBottom: 10 }}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput 
                    placeholder="Contraseña" 
                    style={{ backgroundColor: '#f2f2f2', borderRadius: 8, padding: 10 }}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity 
                    onPress={onLoginPress} 
                    activeOpacity={0.8} 
                    style={{ backgroundColor: '#000', borderRadius: 100, alignItems: 'center', justifyContent: 'center', padding: 12, marginTop: 20 }}>
                    <Text style={{ color: "#fff", fontWeight: '500', fontSize: 18 }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
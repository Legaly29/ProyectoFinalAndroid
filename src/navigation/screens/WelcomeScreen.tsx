import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar,Text, View, Image, TouchableOpacity } from "react-native";
import { RootStackParamsList } from "../stacks/RootStack";

const APPLOGO = require('../../assets/logo.png');

type Props = NativeStackScreenProps<RootStackParamsList, 'WelcomeScreen'>

export const WelcomeScreen:React.FC<Props> = ({navigation}) => {
    const OnSignInPress = () =>{
        navigation.replace('LoginScreen')
    }

    return (
        <View style={{backgroundColor:"#fff", flex:1}}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content"/>

            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Image source={APPLOGO} style={{width:100, height:100}}/>
            </View>

            <View style={{padding: 24, gap:8}}>
                <TouchableOpacity onPress = {OnSignInPress} activeOpacity={0.8} style={{backgroundColor:'#000', borderRadius: 100, alignItems: 'center', justifyContent:'center',padding: 12,}}>
                    <Text style={{color:"#fff", fontWeight:'500', fontSize:18}}>
                        Iniciar Sesion
                    </Text>   
                </TouchableOpacity>

                <Text style={{textAlign:'center',fontSize: 15, fontWeight: 300}}>
                    Iniciando Sesion aceptas los terminos y condiciones
                </Text>    
            </View>
        </View>
    );
};
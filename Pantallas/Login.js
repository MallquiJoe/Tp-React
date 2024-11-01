import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, width, Dimensions} from 'react-native';
import React, { useState } from 'react';
import Svg, { Path, Defs, Pattern, Use, Image} from 'react-native-svg';
import ButtonGradient from '../Componentes/ButtonGradient';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import Registro from './Registro';
import { useNavigation } from '@react-navigation/native';
import ButtonRegistrar from '../Componentes/ButtonRegistrar';

const auth = getAuth(appFirebase);

export default function Login(props) {
  const navigation = useNavigation();
    //crearmo variables de estado
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logueo = async() => {
      if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return; }
        try {
        await signInWithEmailAndPassword(auth,email,password)
        Alert.alert('Iniciando sesion','Cargando....')
        props.navigation.navigate('Inicio') }
        catch (error){
            console.log(error);
            Alert.alert('Error','Usuario o Cotraseña incorrectos')
        }  
    } ;
    const creaRegistro =() => {
      props.navigation.navigate('Registro');
    }
 function SvgTop() {
  return(
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    width="100%"
    height={250}
    viewBox='0 0 180 222'
  >
    <Path fill="url(#a)" d="M0 0h180v222H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.00556 .0045)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={180}
        height={222}
      />
    </Defs>
  </Svg>)
 }
  return (
    <View style={styles.marginContainer}>
      <View style={styles.containerSVG}>
          <SvgTop/>
       </View>
        <View style={styles.container}>
             <Text style={styles.titulo}>Trabajo Practico</Text>
             <Text style={styles.subtitulo}>Sing in to your occount</Text>
             <TextInput
              placeholder='Usuario@gmail.com' style={styles.TextInput}
             onChangeText={(text)=>setEmail(text)}/>
             <TextInput
              placeholder='Contraseña' style={styles.TextInput}
              onChangeText={(text)=>setPassword(text)}
             secureTextEntry={true}/>
             <ButtonGradient onPress={logueo}/>
             <ButtonRegistrar onPress={(creaRegistro)} />
             <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marginContainer:{
    backgroundColor: '#f1f1f1',
    flex:1,
    
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSVG:{
    width: '100%',
    justifyContent:'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize:50,
    color:'#34434D',
    fontWeight:'bold'
  },
  subtitulo:{
    fontSize:20,
    color: 'gray',
  },
  TextInput:{
    padding:10,
    paddingStart:30,
    width:'80%',
    height:50,
    marginTop:20,
    borderRadius:30,
    backgroundColor:'#fff',
    shadowOffset:{
        width:0,
        height:2
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,
  },
  creaCuenta:{
    marginTop: 100,
    fontSize:15,
    color: 'gray',
  },
  Button: {

  },
});

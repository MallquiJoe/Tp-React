import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import Login from './Pantallas/Login';
import Registro from './Pantallas/Registro';
import Inicio from './Pantallas/Inicio';
import Editar from './Pantallas/Editar.js';
import AddHabitos from './Pantallas/AddHabitos.js';
import { registerVersion } from 'firebase/app';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Inicio" component={Inicio} />
         <Stack.Screen name="Registro" component={Registro} />
         <Stack.Screen name="AddHabitos" component={AddHabitos} />
         <Stack.Screen name="Editar" component={Editar} />
        {/* Aquí puedes agregar más pantallas */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


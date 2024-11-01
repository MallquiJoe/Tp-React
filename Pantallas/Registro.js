import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../Componentes/ButtonGradient';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

export default function Registro(props) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async () => {
        const { username, email, password, phone } = formData;

        // Validaciones de datos
        if (!username || !email || !password || !phone) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Alert.alert('Error', 'Formato de email inválido');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true); // Mostrar el indicador de carga

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Cuenta creada', 'Tu cuenta ha sido creada exitosamente');
            props.navigation.navigate('Login');
        } catch (error) {
            // Manejo de errores específicos de Firebase
            switch (error.code) {
                case 'auth/email-already-in-use':
                    Alert.alert('Error', 'Este email ya está en uso');
                    break;
                case 'auth/invalid-email':
                    Alert.alert('Error', 'El email no válido');
                    break;
                case 'auth/weak-password':
                    Alert.alert('Error', 'La contraseña es demasiado débil');
                    break;
                default:
                    Alert.alert('Error', 'Al crear la cuenta');
                    break;
            }
        } finally {
            setLoading(false); // Ocultar el indicador de carga
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.marginContainer}>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Crear cuenta</Text>
                    
                    <View style={styles.inputContainer}>
                        <Icon name="person" size={24} color="gray" style={styles.icon} />
                        <TextInput 
                            placeholder="Nombre y Apellido" 
                            style={styles.TextInput}
                            onChangeText={(text) => handleChange('username', text)} 
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={24} color="gray" style={styles.icon} />
                        <TextInput 
                            placeholder="Contraseña" 
                            style={styles.TextInput}
                            onChangeText={(text) => handleChange('password', text)}
                            secureTextEntry={true} 
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="email" size={24} color="gray" style={styles.icon} />
                        <TextInput 
                            placeholder="Usuario@gmail.com" 
                            style={styles.TextInput}
                            onChangeText={(text) => handleChange('email', text)} 
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="phone" size={24} color="gray" style={styles.icon} />
                        <TextInput 
                            placeholder="Celular" 
                            style={styles.TextInput}
                            onChangeText={(text) => handleChange('phone', text)} 
                        />
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <ButtonGradient 
                            onPress={handleRegister} 
                            text="Crear" 
                            icon="arrow-forward" 
                            disabled={loading} // Deshabilitar el botón si está cargando
                        />
                    )}

                    <StatusBar style="auto" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    marginContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 50,
        color: '#34434D',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        paddingHorizontal: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    TextInput: {
        flex: 1,
        padding: 10,
        color: '#000',
    },
    icon: {
        marginRight: 10,
    },
});

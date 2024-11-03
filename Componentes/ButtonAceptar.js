import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonAceptar({ onPress }) {  // Cambié el nombre aquí
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient
                colors={['#FF6347', '#FF7F7F', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
            >
                <Text style={styles.text}>Aceptar</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    button: {
        marginTop: 30,
        width: '80%',
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

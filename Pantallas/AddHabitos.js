import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddHabitos = ({ navigation }) => {
  const [habitName, setHabitName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const saveHabit = async () => {
    if (!habitName || !category) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    // Validación de categoría
    const validCategories = ['bueno', 'malo', 'regular'];
    if (!validCategories.includes(category.toLowerCase())) {
      Alert.alert('Error', 'La categoría debe ser "Bueno", "Malo" o "Regular"');
      return;
    }

    setLoading(true); // Mostrar indicador de carga

    try {
      const newHabit = { name: habitName, category };
      const storedHabits = await AsyncStorage.getItem('habitos');
      const habitsArray = storedHabits ? JSON.parse(storedHabits) : [];
      habitsArray.push(newHabit);
      await AsyncStorage.setItem('habitos', JSON.stringify(habitsArray));
      Alert.alert('Éxito', 'Hábito agregado correctamente');
      setHabitName(''); // Limpiar campo de nombre
      setCategory(''); // Limpiar campo de categoría
      navigation.goBack(); // Regresa a la pantalla anterior (Inicio)
    } catch (error) {
      console.error('Error al guardar el hábito:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el hábito.');
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar un nuevo hábito</Text>
      <TextInput
        placeholder="Nombre del hábito"
        style={styles.input}
        value={habitName}
        onChangeText={setHabitName}
      />
      <TextInput
        placeholder="Categoría (bueno, malo, regular)"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={saveHabit}>
          <Text style={styles.saveButtonText}>Guardar hábito</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#FF7F7F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default AddHabitos;

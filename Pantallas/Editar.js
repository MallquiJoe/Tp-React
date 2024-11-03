import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonEditar from '../Componentes/ButtonEditar'; 
import ButtonEliminar from '../Componentes/ButtonEliminar'; 

const Editar = ({ route, navigation }) => {
  const { habit } = route.params || {};
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setCategory(habit.category);
    }
  }, [habit]);

  const isValidCategory = (category) => {
    return ['bueno', 'malo', 'regular'].includes(category.toLowerCase());
  };

  const handleSave = async () => {
    if (!name || !category) {
      Alert.alert("Error", "Por favor, completa ambos campos.");
      return;
    }

    if (!isValidCategory(category)) {
      setCategoryError("Por favor, ingresa una categoría válida (bueno, malo, regular).");
      return;
    } else {
      setCategoryError('');
    }

    setLoading(true);
    try {
      const storedHabits = await AsyncStorage.getItem('habitos');
      const habits = storedHabits ? JSON.parse(storedHabits) : [];

      const updatedHabits = habits.map((h) => {
        if (h.name === habit.name) {
          return { ...h, name, category };
        }
        return h;
      });

      await AsyncStorage.setItem('habitos', JSON.stringify(updatedHabits));
      Alert.alert('Éxito', 'Hábito actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el hábito:', error);
      Alert.alert('Error', 'Hubo un problema al guardar el hábito.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este hábito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const storedHabits = await AsyncStorage.getItem('habitos');
              const habits = storedHabits ? JSON.parse(storedHabits) : [];

              const updatedHabits = habits.filter((h) => h.name !== habit.name);

              await AsyncStorage.setItem('habitos', JSON.stringify(updatedHabits));
              Alert.alert('Éxito', 'Hábito eliminado correctamente');
              navigation.goBack();
            } catch (error) {
              console.error('Error al eliminar el hábito:', error);
              Alert.alert('Error', 'Hubo un problema al eliminar el hábito.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Hábito</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingrese el nombre del hábito"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={[styles.input, categoryError ? styles.inputError : null]}
        value={category}
        onChangeText={setCategory}
        placeholder="Ingrese una categoría (bueno, malo, regular)"
        placeholderTextColor="#aaa"
      />
      {categoryError ? <Text style={styles.error}>{categoryError}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.buttonContainer}>
          <ButtonEditar onPress={handleSave} />
          <ButtonEliminar onPress={handleDelete} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 2,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Editar;

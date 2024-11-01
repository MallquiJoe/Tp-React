import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Inicio = ({ navigation }) => {
  const [habitos, setHabitos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Cargar hábitos desde AsyncStorage
  const loadHabits = async () => {
    setLoading(true); // Mostrar indicador de carga
    try {
      const storedHabits = await AsyncStorage.getItem('habitos');
      if (storedHabits) {
        const parsedHabits = JSON.parse(storedHabits);
        if (Array.isArray(parsedHabits)) {
          setHabitos(parsedHabits);
        } else {
          Alert.alert('Error', 'Los datos de hábitos son inválidos');
        }
      }
    } catch (error) {
      console.error('Error al cargar hábitos:', error);
      Alert.alert('Error', 'No se pudo cargar los hábitos.');
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHabits();
    }, [])
  );

  const handleAddHabit = () => {
    navigation.navigate('AddHabitos');
  };

  const handleEditHabit = (habit) => {
    navigation.navigate('Editar', { habit });
  };

  const renderHabit = ({ item }) => (
    <TouchableOpacity style={styles.habitCard} onPress={() => handleEditHabit(item)}>
      <Text style={styles.habitText}>{item.name}</Text>
      <Text style={styles.habitCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Hábitos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={habitos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHabit}
          contentContainerStyle={styles.habitList}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  habitList: {
    paddingBottom: 80,
  },
  habitCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  habitText: {
    fontSize: 18,
    color: '#333',
  },
  habitCategory: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FF7F7F',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFF',
  },
});

export default Inicio;

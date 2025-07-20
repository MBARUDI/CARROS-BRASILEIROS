import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CARS } from '../../src/api/cars';

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = CARS.find((c) => c.id === id);

  if (!car) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Carro não encontrado!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: `${car.brand} ${car.model}` }} />
      <Image source={car.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{`${car.brand} ${car.model}`}</Text>
        <Text style={styles.subtitle}>Ano: {car.year}</Text>
        <Text style={styles.price}>{car.price}</Text>
        <Text style={styles.description}>{car.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
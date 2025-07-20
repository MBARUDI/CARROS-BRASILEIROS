import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import CarCard from '../components/CarCard';
import carsData from '../api/cars';

// A tela agora recebe 'route' como prop da navegação
const CarDetailScreen = ({route, navigation}) => {
  // Pegamos o índice inicial dos parâmetros da rota
  const {initialIndex} = route.params;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Atualiza o título da tela na barra de navegação
  // (Toque legal que atualiza o título ao navegar)
  useEffect(() => {
    navigation.setOptions({title: carsData[currentIndex].nome});
    // A única dependência real é o `currentIndex`. `navigation` e `carsData`
    // são estáveis e não precisam ser listados.
  }, [currentIndex, navigation]);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % carsData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + carsData.length) % carsData.length,
    );
  };

  const currentCar = carsData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.cardWrapper}>
        <CarCard car={currentCar} />
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>
          {currentIndex + 1} / {carsData.length}
        </Text>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default CarDetailScreen;
import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const CarCard = ({car}) => {
  if (!car) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: car.imagemUrl}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{car.nome}</Text>
        <Text style={styles.subtitle}>
          {car.marca} - {car.modelo} ({car.ano})
        </Text>
        <Text style={styles.price}>{car.preco}</Text>
        <Text style={styles.description}>{car.descricao}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007A00',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});

export default CarCard;


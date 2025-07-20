import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import carsData from '../api/cars';

// A tela recebe 'navigation' como prop para poder navegar
const HomeScreen = ({navigation}) => {
  const renderCarItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        // Navega para a tela de detalhes, passando o índice do carro clicado
        navigation.navigate('CarDetail', {initialIndex: index})
      }>
      <Image source={{uri: item.imagemUrl}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.nome}</Text>
        <Text style={styles.itemSubtitle}>
          {item.marca} - {item.ano}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={carsData}
        renderItem={renderCarItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  itemImage: {
    width: 100,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#777',
  },
});

export default HomeScreen;
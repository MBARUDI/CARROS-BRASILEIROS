import { Link, Stack } from 'expo-router';
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { CARS, Car } from '../src/api/cars'; // Import data

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Car>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width]
  );

  const scrollTo = (index: number) => {
    if (flatListRef.current && index >= 0 && index < CARS.length) {
      flatListRef.current.scrollToIndex({ animated: true, index });
      setCurrentIndex(index);
    }
  };

  // Esta função é chamada quando o usuário desliza o dedo e a rolagem termina.
  // Ela calcula o novo índice com base na posição da rolagem e atualiza o estado.
  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const renderCarItem = useCallback(
    ({ item, index }: { item: Car; index: number }) => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];
      const rotateY = scrollX.interpolate({
        inputRange,
        outputRange: ['-45deg', '0deg', '45deg'],
        extrapolate: 'clamp',
      });

      const transform = [{ perspective: 800 }, { rotateY }];

      return (
        <Animated.View style={[styles.cardContainer, { width, transform }]}>
          <Link href={`/cars/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{`${item.brand} ${item.model}`}</Text>
              <Text style={styles.cardSubtitle}>{item.year}</Text>
            </Pressable>
          </Link>
        </Animated.View>
      );
    },
    [width, scrollX] // Recria a função apenas se a largura da tela mudar.
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Carros Brasileiros' }} />
      <Animated.FlatList
        ref={flatListRef}
        data={CARS}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        bounces={false}
      />
      <View style={styles.navButtonContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === 0 && styles.navButtonDisabled,
          ]}
          onPress={() => scrollTo(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === CARS.length - 1 && styles.navButtonDisabled,
          ]}
          onPress={() => scrollTo(currentIndex + 1)}
          disabled={currentIndex === CARS.length - 1}
        >
          <Text style={styles.navButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  cardImage: {
    width: '20%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 16,
    color: 'gray',
  },
  navButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  navButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  navButtonDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

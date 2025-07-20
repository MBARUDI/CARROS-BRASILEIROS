import { ImageSourcePropType } from 'react-native';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  description: string;
  image: ImageSourcePropType;
}

export const CARS: Car[] = [
  {
    id: '1',
    brand: 'Volkswagen',
    model: 'Gol GTI',
    year: 1994,
    price: 'R$ 50.000,00',
    description: 'O primeiro carro nacional com injeção eletrônica, um ícone de esportividade e desempenho nos anos 90. Desejado por colecionadores.',
    // Trocando para imagem local para melhor performance e uso offline.
    image: require('../../assets/images/gol.png'),
  },
  {
    id: '2',
    brand: 'Chevrolet',
    model: 'Opala Diplomata',
    year: 1992,
    price: 'R$ 65.000,00',
    description: 'Sinônimo de luxo e conforto, o Opala Diplomata com motor 4.1 de 6 cilindros é um clássico absoluto, oferecendo um rodar suave e muita potência.',
    image: require('../../assets/images/opala.png'),
  },
  {
    id: '3',
    brand: 'Ford',
    model: 'Escort XR3',
    year: 1991,
    price: 'R$ 40.000,00',
    description: 'Com seu design arrojado e teto conversível, o Escort XR3 foi o sonho de consumo de uma geração, combinando estilo e um toque de esportividade.',
    image: require('../../assets/images/escort.png'),
  },
  {
    id: '4',
    brand: 'Toyota',
    model: 'Corolla',
    year: 1995,
    price: 'R$ 25.000,00',
    description: 'Famoso pela sua incrível durabilidade e confiabilidade, o Corolla dos anos 90 estabeleceu um padrão de qualidade que perdura até hoje.',
    image: require('../../assets/images/corolla.png'),
  },
  {
    id: '5',
    brand: 'Honda',
    model: 'Civic',
    year: 1997,
    price: 'R$ 28.000,00',
    description: 'Um sedan que combinava design moderno, conforto e a lendária confiabilidade japonesa, tornando-se um sucesso de vendas e um carro muito querido.',
    image: require('../../assets/images/honda.png'),
  },
];
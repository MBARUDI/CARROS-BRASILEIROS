// Este arquivo informa ao TypeScript como lidar com importações de arquivos de imagem.
// Para cada tipo de imagem, declaramos um módulo.
// Isso evita erros de "Cannot find module" ao importar imagens.

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
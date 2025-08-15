# 📦 Controle de Materiais

> **🏫 Projeto Social - Faculdade Estácio FARGS (Rio Grande do Sul)**  
> Aplicativo desenvolvido como parte de projeto acadêmico para controle eficiente de materiais em pequenos negócios da comunidade.

Aplicativo React Native para controle de estoque de materiais com interface responsiva e funcionalidades completas de CRUD.

## ✨ Funcionalidades

- **📱 Visualização** de materiais em cards organizados
- **➕ Cadastro** de novos materiais
- **✏️ Edição** de materiais existentes
- **🗑️ Remoção** de materiais
- **📊 Controle de quantidade** (aumentar/diminuir)
- **⚠️ Sistema de alertas** para estoque baixo
- **🏷️ Categorização** de materiais
- **💾 Persistência local** com AsyncStorage
- **🌐 Suporte web** responsivo
- **🎨 Interface personalizada** com paleta vermelha
- **🏢 Logo da empresa** integrado como marca d'água

## 🚀 Tecnologias

- **React Native** 0.73.6
- **Expo SDK** 50.0.0
- **React Navigation** v6
- **React Native Paper** (UI components)
- **AsyncStorage** (banco de dados local)
- **Platform-specific icons** (híbrido web/mobile)

## 📋 Pré-requisitos

- **Node.js** 18+
- **npm** ou **pnpm**
- **Expo CLI** (opcional, pode usar npx)
- **Android Studio** (para build Android)
- **Xcode** (para build iOS, apenas macOS)

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd controle-estudio
```

### 2. Instale as dependências

```bash
npm install
# ou
pnpm install
```

### 3. Verifique as dependências instaladas

```bash
npm list @expo/vector-icons
npm list @react-native-async-storage/async-storage
```

## 🎯 Como Executar

### Desenvolvimento Local

```bash
# Iniciar o projeto
npm start
# ou
npx expo start

# Para web
npm run web
# ou
npx expo start --web

# Para Android
npm run android
# ou
npx expo start --android

# Para iOS (apenas macOS)
npm run ios
# ou
npx expo start --ios
```

### Teste no Dispositivo

1. **Instale o Expo Go** no seu celular
2. **Escaneie o QR Code** que aparece no terminal
3. **App abre** automaticamente no dispositivo

## 📱 Build para Produção

### Android (APK)

```bash
# Build via EAS (recomendado)
npx eas build --platform android --profile preview

# Build local (requer Android Studio)
npx expo run:android --variant release
```

### iOS (IPA)

```bash
# Build via EAS
npx eas build --platform ios --profile preview

# Build local (requer Xcode)
npx expo run:ios --configuration Release
```

### Web

```bash
# Export para web
npx expo export --platform web

# Deploy no Vercel
npx vercel --cwd dist --prod --yes

# Deploy no Netlify
npx netlify deploy --prod --dir dist
```

## 🌐 Deploy Web

### Vercel (Recomendado)

```bash
# Instalar Vercel
npm install -g vercel

# Login (primeira vez)
vercel login

# Deploy
vercel --cwd dist --prod --yes
```

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login (primeira vez)
netlify login

# Deploy
netlify deploy --prod --dir dist
```

### GitHub Pages

```bash
# Instalar gh-pages
npm install -D gh-pages

# Adicionar script no package.json
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

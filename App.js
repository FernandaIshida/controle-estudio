import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { initDatabase } from './src/database/databaseAsync';

export default function App() {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initDatabase();
        setIsReady(true);
      } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
        setIsReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Inicializando...</Text>
      </View>
    );
  }

  return (
    <>
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialProvider } from '../context/MaterialContext';
import HomeScreen from '../screens/HomeScreen';
import MaterialFormScreen from '../screens/MaterialFormScreen';
import colors from '../theme/colors';

const Stack = createStackNavigator();

const CustomHeader = ({ title }) => (
  <View style={styles.customHeader}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const AppNavigator = () => {
  return (
    <PaperProvider>
      <MaterialProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary,
                height: 100,
              },
              headerTintColor: colors.surface,
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: () => <CustomHeader title="Controle de Materiais" />,
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="MaterialForm"
              component={MaterialFormScreen}
              options={({ route }) => ({
                headerTitle: () => (
                  <CustomHeader 
                    title={route.params?.material ? 'Editar Material' : 'Novo Material'} 
                  />
                ),
                headerTitleAlign: 'center',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MaterialProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.surface,
    textAlign: 'left',
  },
});

export default AppNavigator;

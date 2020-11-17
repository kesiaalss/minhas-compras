import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/HomeScreen';
import StartShopScreen from './src/pages/StartShopScreen';
import AddItemScreen from './src/pages/AddItemScreen';
import AddShopScreen from './src/pages/AddShopScreen';
import ListShopScreen from './src/pages/ListShopScreen';
import { LogBox } from 'react-native';



export const Context = createContext({});
const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  const [compras, setCompras] = useState();
  const [produtosDaCompra, setProdutosDaCompra] = useState();
  return (
    <Context.Provider value={{
      compras, setCompras, produtosDaCompra, setProdutosDaCompra
    }} >
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Ações" component={HomeScreen} /> */}
          <Stack.Screen name="ListShopScreen" options={{
            title: 'Compras'
          }} component={ListShopScreen} />
          <Stack.Screen name="StartShopScreen" options={{
            title: 'Items'
          }} component={StartShopScreen} />
          <Stack.Screen name="AddItemScreen" options={{
            title: 'Adicionar Item'
          }} component={AddItemScreen} />
          <Stack.Screen name="AddShopScreen" options={{
            title: 'Adicionar Compra'
          }} component={AddShopScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
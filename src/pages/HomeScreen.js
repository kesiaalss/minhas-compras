import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Inciar Lista de Compra"
        onPress={() => navigation.navigate('StartShopScreen')}
      />
    </View>
  );
}

export default HomeScreen;
import React, {useState, useEffect} from 'react';
import { View, FlatList, Text } from 'react-native';
import { Avatar, ListItem, Button } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../config/firebase';

function StartShopScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { produtos, idCompra } = route.params;
  const [list, setList] = useState(produtos);

  const keyExtractor = (item, index) => index.toString();

  
  useEffect(() => {
    const unsubscribe = db.collection('compras').doc(idCompra).collection('items').onSnapshot(snapshot => {
      const arr = [];
      snapshot.forEach(i => arr.push(i.data()));
      setList(arr);
    });
    return () => unsubscribe()
  }, []);
  

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => navigation.navigate('AddItemScreen', {
      produto: produtos.find(p => p.id === item.id),
    })} >
      <ListItem.Content>
        <ListItem.Title>{item.nome}</ListItem.Title>
        <ListItem.Subtitle>{item.preco}</ListItem.Subtitle>
      </ListItem.Content>
      <Text>Quantidade: {item.quantidade}</Text>
      <Text>Soma: {(item.quantidade * item.preco).toFixed(2)}</Text>
      <ListItem.Chevron/>
    </ListItem>
  )
  
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ marginTop: 15 }}
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
      <Button
        icon={
          <Icon
            name="plus"
            size={15}
            color="white"
          />
        }
        type="solid"
        buttonStyle={{ borderRadius: 36, width: 72, height: 72 }}
        containerStyle={{ position: 'absolute', bottom: 35, right: 35 }}
        onPress={() => navigation.navigate('AddItemScreen', {
          idCompra
        })}
      />
    </View>
  );
}

export default StartShopScreen;
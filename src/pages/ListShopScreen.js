import React, {useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../config/firebase';
import { format } from 'date-fns';


function ListShopScreen() {
  const navigation = useNavigation();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
        const unsubscribe = db.collection('compras')
        .onSnapshot(async (querySnapshot) => {
          const arr = [];
          querySnapshot.forEach(s => {
            const {data, nome, items} = s.data();
              if (data?.seconds) {
                arr.push({data: new Date(1000 * data.seconds), nome, id: s.id, items});
                setCompras(arr);
              }
          });
        }) 
        return () => unsubscribe()  
  }, []);

  
  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => navigation.navigate('StartShopScreen', {
      produtos: compras.find(p => p.id === item.id).items,
      idCompra: compras.find(p => p.id === item.id).id.toString(),
    })}>
      <ListItem.Content>
        <ListItem.Title>{item.nome}</ListItem.Title>
        <ListItem.Subtitle>{format(item.data, 'dd/MM/yyyy')}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )
  
  return (
<View style={{flex: 1}}>
<FlatList
      style={{marginTop: 15}}
      keyExtractor={item => item.id.toString()}
      data={compras}
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
    buttonStyle={{ borderRadius: 36, width: 72, height: 72}}
    containerStyle={{position: 'absolute', bottom: 35, right: 35}}
    onPress={() => navigation.navigate('AddShopScreen')}
  />
</View>
  );
}

export default ListShopScreen;
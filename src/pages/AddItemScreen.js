import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { db } from '../config/firebase';
import { Controller, useForm } from 'react-hook-form';

function AddItemScreen() {
  const navigation = useNavigation();
  const { produto, idCompra } = useRoute().params;
  const { control, handleSubmit, errors } = useForm();




  function onSubmit(data) {
    const preco = Number(data.valor.replace('R$','').replace(',','.'));
    const quantidade =  Number(data.quantidade);
    const nome = data.nome;
    db.collection('compras')
    .doc(idCompra)
    .collection('items')
    .add({nome, quantidade, preco}).then(() => navigation.goBack());
  }

  useEffect(() => {
    if (produto) {
      console.log(produto)
      const { nome: d, valor: v, quantidade: q } = produto;
      setNome(d);
      setValor(v);
      setQuantidade(q.toString());
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 }}>
      <Controller
        control={control}
        name="nome"
        rules={{
          required: {
            value: true,
            message: 'Nome é obrigatorio'
          }
        }}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Nome"
            onChangeText={value => onChange(value)}
            value={value}
            errorMessage={errors.nome ? errors.nome.message : ''}
            onBlur={onBlur}
          />
        )}
      />
      {console.log(errors)}

      <Controller
        control={control}
        name="quantidade"
        rules={{
          required: {
            value: true,
            message: 'Quantidade é obrigatoria'
          }
        }}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Quantidade"
            onChangeText={value => onChange(value)}
            value={value}
            errorMessage={errors.quantidade ? errors.quantidade.message : ''}
            onBlur={onBlur}
          />
        )}
      />
      <Text
        style={{
          "alignSelf": "center",
          "color": "#86939e",
          "fontSize": 22,
          "minHeight": 40,
          paddingTop: 30,

        }}
      >Valor</Text>
      <Controller
        control={control}
        name="valor"
        rules={{
          required: {
            value: true,
            message: 'Valor é obrigatorio'
          }
        }}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextInputMask
            onChangeText={text => onChange(text)}
            value={value}
            onBlur={onBlur}
            type={'money'}
            style={{
              "alignSelf": "center",
              "color": "#86939e",
              "fontSize": 18,
              "minHeight": 40,
              marginBottom: 20,
            }}
          />
        )}
      />

      {errors.valor && <Text style={{ color: 'red' }}>{errors.valor.message}</Text>}
      <Button
        title="Salvar"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

export default AddItemScreen;
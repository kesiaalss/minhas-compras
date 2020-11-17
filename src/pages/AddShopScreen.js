import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { db } from '../config/firebase';
import { Controller, useForm } from 'react-hook-form';
import firebase from 'firebase';

function AddItemScreen() {
  const navigation = useNavigation();
  const { control, handleSubmit, errors } = useForm();




  function onSubmit(d) {
    const data = firebase.firestore.Timestamp.fromDate(new Date());
    const nome = d.nome;
    db.collection('compras')
    .add({data, nome}).then(() => navigation.goBack());
  }

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
      <Button
        title="Salvar"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

export default AddItemScreen;
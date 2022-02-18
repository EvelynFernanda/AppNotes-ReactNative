import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../components/styles';

export default function NotaAberta(props) {
  const navigation = useNavigation();
  const {nota} = props.route.params;

  const deletarNota = async () => {
    try {
      const result = await AsyncStorage.getItem('notas');
      let notes = [];
      if (result !== null) {
        notes = JSON.parse(result);
      }

      const newNotes = notes.filter(n => n.id !== nota.id);
      await AsyncStorage.setItem('notas', JSON.stringify(newNotes));
    } catch (error) {
      console.warn(error);
    }
  };

  const deleteAlert = () => {
    Alert.alert(
      'Tem certeza que deseja excluir esta nota?',
      'Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          onPress: () => navigation.navigate('NotasCriadas'),
        },
        {
          text: 'Excluir',
          onPress: deletarNota,
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView style={{flexGrow: 1}} nestedScrollEnabled={true}>
        <View style={styles.header}>
          <View style={styles.voltar}>
            <Icon.Button
              name="chevron-left"
              onPress={() => navigation.navigate('HomeSemNota')}
              backgroundColor="#0F62FE"
              size={25}
            />
            <Text style={styles.textHeaderNotaAberta}>Voltar</Text>
          </View>
          <View style={styles.editar}>
            <Icon.Button
              name="trash-2"
              onPress={deleteAlert}
              backgroundColor="#0F62FE"
              size={25}
            />
            <Text style={styles.textHeaderNotaAberta}>Editar</Text>
          </View>
        </View>

        <View style={styles.containerNotasAbertas}>
          {nota.nome.length > 0 ? (
            <View>
              <Text style={styles.textCinza}>Nome </Text>
              <Text style={styles.textNotaAbertaGrande}>{nota.nome}</Text>
            </View>
          ) : null}

          {nota.descricao.length > 0 ? (
            <View>
              <Text style={styles.textCinza}>Descrição </Text>
              <Text style={styles.textNotaAberta}>{nota.descricao}</Text>
            </View>
          ) : null}

          {nota.data.length > 0 ? (
            <View>
              <Text style={styles.textCinza}>Data </Text>
              <Text style={styles.textNotaAberta}>{nota.data}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

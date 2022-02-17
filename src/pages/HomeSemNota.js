import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import styles from '../components/styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotasCriadas from './NotasCriadas';

const Home = ({}) => {
  const navigation = useNavigation();

  const [notes, setNotes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    findNotes();
  }, [notes, isFocused]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notas');
    if (result !== null) {
      setNotes(JSON.parse(result));
    }
  };

  const openNote = nota => {
    navigation.navigate('NotaAberta', {nota});
  };

  return (
    <View style={styles.home}>
      {!notes.length ? (
        <>
          <Image
            source={require('../img/ImagemNotas.png')}
            style={{width: 90}}
          />
          <Text style={styles.textHomeP}>Não tem nenhuma nota aqui</Text>
          <Text style={styles.textHomeS}>
            Crie notas e você poderá vê-las aqui.
          </Text>
          <View style={styles.buttonHeader}>
            <Icon.Button
              name="plus"
              onPress={() => navigation.navigate('CriarNota')}
              backgroundColor="#0F62FE"
              size={30}
            />
          </View>
        </>
      ) : (
        <FlatList
          data={notes}
          numColumns={2}
          columnWrapperStyle={{marginBottom: 15}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <NotasCriadas onPress={() => openNote(item)} item={item} />
          )}
        />
      )}
    </View>
  );
};

export default Home;

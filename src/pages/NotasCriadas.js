import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from '../components/styles';

export default ({item, onPress}) => {
  const {id, nome, descricao, data} = item;
  const dateForm = ms => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();

    return `${day}/${month}/${year} - ${hrs}:${min}`;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flexGrow: 1}} nestedScrollEnabled={true}>
        <TouchableOpacity onPress={onPress}>
          <View
            //eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              borderRadius: 4,
              borderColor: '#f2f2f2',
              borderWidth: 1,
              padding: 10,
              flexWrap: 'wrap',
            }}>
            <View style={styles.containerNotas}>
              <Text style={styles.tituloNotas} numberOfLines={3}>
                {nome}
              </Text>
              <Text style={styles.textNotas} numberOfLines={10}>
                {descricao}
              </Text>
              <Text numberOfLines={1}>{dateForm(id)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

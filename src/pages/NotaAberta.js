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
    const result = await AsyncStorage.getItem('notas');
    let notes = [];
    if (result !== null) {
      notes = JSON.parse(result);
    }

    const newNotes = notes.filter(n => n.id !== nota.id);
    await AsyncStorage.setItem('notas', JSON.stringify(newNotes));
    navigation.dispatch(StackActions.popToTop());
  };

  const deleteAlert = () => {
    Alert.alert(
      'Alerta',
      'Tem certeza que deseja excluir esta nota? Essa ação não poderá ser desfeita',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('cancelar'),
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
    <View style={{flex: 1}}>
      <ScrollView style={{flexGrow: 1}} nestedScrollEnabled={true}>
        <View>
          <View style={styles.ButtonVoltar}>
            <Icon.Button
              name="chevron-left"
              onPress={deleteAlert}
              backgroundColor="#0F62FE"
              size={30}
            />
            <Text style={styles.textNotaAberta}>Voltar</Text>
          </View>
          <Icon.Button
            name="trash-2"
            onPress={deleteAlert}
            backgroundColor="#0F62FE"
            size={30}
          />

          <View>
            <Text>Nome </Text>
            <Text>{nota.nomeNota}</Text>

            {nota.descricao.length > 0 ? (
              <View>
                <Text>Descrição </Text>
                <Text>{nota.descricao}</Text>
              </View>
            ) : null}

            {nota.data.length > 0 ? (
              <View>
                <Text>Data </Text>
                <Text>{nota.data}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// import React from 'react';
// import {View, Text, TouchableOpacity, Alert} from 'react-native';
// import Icon from 'react-native-vector-icons/EvilIcons';
// import styles from '../components/styles';
// import {StackActions} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
// import {data} from './CriarNota';

// const NotaAberta = ({props}) => {
//   const navigation = useNavigation();
//   const {nota} = props.route.params;

//   const deletarNota = async () => {
//     const result = await AsyncStorage.getItem('notas');
//     let notes = [];
//     if (result !== null) {
//       notes = JSON.parse(result);
//     }

//     const newNotes = notes.filter(n => n.nome !== nota.nome);
//     await AsyncStorage.setItem('notas', JSON.stringify(newNotes));
//     navigation.dispatch(StackActions.popToTop());
//   };

//   const deleteAlert = () => {
//     Alert.alert(
//       'Alerta',
//       'Tem certeza que deseja excluir esta nota? Essa ação não poderá ser desfeita',
//       [
//         {
//           text: 'Cancelar',
//           onPress: () => console.log('cancelar'),
//         },
//         {
//           text: 'Excluir',
//           onPress: deletarNota,
//         },
//       ],
//       {
//         cancelable: true,
//       },
//     );
//   };
//   return (
//     <View>
//       <View style={styles.header}>

//         <View style={styles.ButtonVoltar}>
//           <Icon.Button
//             name="trash"
//             onPress={() => navigation.navigate('Home')}
//             backgroundColor="#0F62FE"
//             size={30}
//           />
//           <TouchableOpacity>
//             <Text style={styles.textNotaAberta}>Editar</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <Text style={styles.textHeader}>NOME</Text>
//       <Text style={styles.textHeader}>Sonho de hoje</Text>
//       <Text style={styles.textHeader}>DESCRIÇÃO</Text>
//       <Text>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac dolor
//         consequat, malesuada magna at, rhoncus felis. Duis vitae tortor ante.
//         Proin aliquet ex pulvinar libero faucibus facilisis. Integer vitae purus
//         ac quam dictum porttitor.
//       </Text>
//       <View style={styles.containerDados}>
//         <Text style={styles.textoId} numberOfLines={1}>
//           {`Nota Criada em ${data}`}
//         </Text>

//         <Text style={styles.textoRotulo}>Nome </Text>
//         <Text style={styles.textoNomeNota}>{nota.nomeNota}</Text>

//         {nota.descricao.length > 0 ? (
//           <View>
//             <Text style={styles.textoRotulo}>Descrição </Text>
//             <Text style={styles.textoDescricao}>{nota.descricao}</Text>
//           </View>
//         ) : null}

//         {nota.data.length > 0 ? (
//           <View>
//             <Text style={styles.textoRotulo}>Data </Text>
//             <Text style={styles.dropbox}>{nota.data}</Text>
//           </View>
//         ) : null}
//       </View>
//     </View>
//   );
// };
// export default NotaAberta;

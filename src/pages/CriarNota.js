import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import styles from '../components/styles';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

const CriarNota = navigation => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    findNotes();
  }, [notes]);

  const findNotes = async () => {
    try {
      const result = await AsyncStorage.getItem('notas');
      if (result !== null) {
        setNotes(JSON.parse(result));
      }
    } catch (error) {
      console.warn(error);
    }
  };
  async function storeNotes() {
    const dados = {
      id: Date.now(),
      nome: nome,
      descricao: descricao,
      data: data,
    };
    const updateNotes = [...notes, dados];
    setNotes(updateNotes);
    try {
      await AsyncStorage.setItem('notas', JSON.stringify(updateNotes));
    } catch (error) {
      console.warn(error);
    }
    Alert.alert(null, 'Nota criada com sucesso!');
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Text style={styles.textNota}>Nome da nota (obrigatório)</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setNome(text)}
          value={nome}
          placeholder="Insira"
        />
        <Text style={styles.textNota}>Descrição</Text>
        <TextInput
          style={styles.inputS}
          placeholder="Insira"
          maxLength={240}
          onChangeText={text => setDescricao(text)}
          value={descricao}
        />
        <Text style={styles.textNota}>Prioridade</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="Selecione" value="Selecione" />
          <Picker.Item label="Urgente" value="Urgente" />
          <Picker.Item label="Alta" value="alta" />
          <Picker.Item label="Média" value="media" />
          <Picker.Item label="Baixa" value="baixa" />
        </Picker>
        <Text style={styles.textNota}>Data</Text>
        <View style={styles.calendar}>
          <TextInput
            style={styles.inputData}
            placeholder="mm/ dd/ yyyy"
            keyboardType="numeric"
            onChangeText={setData}
            value={data}
          />
          <Icon
            name="calendar"
            backgroundColor="#EFEFEF"
            color="#000"
            size={30}
          />
        </View>
        <Text style={styles.textNota}>Lista de tarefas</Text>
        <View style={styles.viewCheckBox}>
          <CheckBox style={styles.checkBox} desativado={false} />
          <Text style={styles.texCheckBox}>Novo item</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.buttonAdd}>Adicionar item</Text>
        </TouchableOpacity>

        <Text style={styles.textNota}>Adicionar foto ou arquivo</Text>
        <TouchableOpacity style={styles.buttonFoto}>
          <Text style={styles.textFoto}>Adicione aqui</Text>
        </TouchableOpacity>
        <Text style={styles.textNota}>Cor</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="Escolha" value="Escolha" />
          <Picker.Item label="Básico" value="Básico" />
          <Picker.Item label="Rosa" value="Rosa" style={styles.labelRosa} />
          <Picker.Item label="Azul" value="Azul" style={styles.labelAzul} />
          <Picker.Item
            label="Verde-água"
            value="Verde-água"
            style={styles.labelVerde}
          />
        </Picker>
        <Text style={styles.textNota}>Adicionar Tags</Text>
        <TextInput style={styles.inputTag} placeholder="Sua tag" />
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.buttonNota} onPress={storeNotes}>
          <Text style={styles.buttonCria}>Criar nota</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CriarNota;

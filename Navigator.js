import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import HomeSemNota from './src/pages/HomeSemNota';
import CriarNota from './src/pages/CriarNota';
import NotaAberta from './src/pages/NotaAberta';
import NotasCriadas from './src/pages/NotasCriadas';

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeSemNota"
        screenOptions={screenOptions}>
        <Stack.Screen
          name="HomeSemNota"
          component={HomeSemNota}
          options={({navigation}) => {
            return {
              title: 'Notas',
              headerRight: () => (
                <>
                  <Icon.Button
                    name="search"
                    onPress={() => navigation.navigate('NotasCriadas')}
                    backgroundColor="#0F62FE"
                    size={25}
                  />
                  <Icon.Button
                    name="plus"
                    onPress={() => navigation.navigate('CriarNota')}
                    backgroundColor="#0F62FE"
                    size={30}
                  />
                </>
              ),
            };
          }}
        />
        <Stack.Screen
          name="CriarNota"
          component={CriarNota}
          options={({navigation}) => {
            return {
              title: 'Criar nota',
              headerRight: () => (
                <Icon.Button
                  name="x"
                  onPress={() => navigation.navigate('NotasCriadas')}
                  backgroundColor="#0F62FE"
                  size={25}
                />
              ),
            };
          }}
        />
        <Stack.Screen name="NotasCriadas" component={NotasCriadas} />
        <Stack.Screen
          name="NotaAberta"
          component={NotaAberta}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const screenOptions = {
  headerStyle: {
    backgroundColor: '#0F62FE',
  },
  headerTintColor: '#FFF',
  headerTitleStyle: {
    fontSize: 35,
  },
};
export default Navigator;

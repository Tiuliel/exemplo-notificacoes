import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';

import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () =>{
    return{
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }
  }
});
export default function App() {
  const [dados, setDados] = useState(null);
  useEffect(( ) => {
    async function permissoesIos(){
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
        }
      });
    }

    permissoesIos();

    Notifications.addNotificationResponseReceivedListener(notificacao => {
      console.log(notificacao);
    });

    Notifications.addNotificationResponseReceivedListener(resposta => {
      setDados(resposta.notification.request.content.data);
    });
   }, [ ])
  const enviaMensagem = async () => {
    const mensagem = { 
      title:"Lembrete!😂",
      body: "Não esqueça de estudar muito... senão, reprova! ☠",
      data: {
        usuario: "Chaves",
        cidade: "SP"
      }
    };

    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: {seconds: 5 },
    });
  };
  return (
    <>
    <StatusBar />
    <View style={styles.container}>
      <Text>Exemplo de notificação!</Text>
      <Button title='Disparar notificação' onPress={enviaMensagem}/>

      {dados && (<View style={{marginVertical: 8, backgroundColor: "red"}}>
        <Text>usuario: {dados.usuario}</Text>
        <Text>cidade: {dados.cidade}</Text>
    </View>
    )}
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

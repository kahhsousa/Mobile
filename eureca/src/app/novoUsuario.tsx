import { useState } from 'react'
import { Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NovoUsuario() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const autenticarUsuario = () => {
    Alert.alert(`E-mail: ${email} Senha: ${senha}`)
    console.log(`E-mail: ${email} Senha: ${senha}`)
  }

  return (
    <SafeAreaView style={estilos.conteiner}>
      <Text style={estilos.titulo}>Psico-Acessível</Text>

      <TextInput 
        style={estilos.campo}
        placeholder='E-mail'
        placeholderTextColor='#fff'
        value={email}
        onChangeText={setEmail}
      />

      <TextInput 
        style={estilos.campo}
        placeholder='Senha'
        placeholderTextColor='#fff'
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable 
        style={estilos.botao}
        android_ripple={{color: '#369A49'}}
        onPress={autenticarUsuario}
      >
        <Text style={estilos.rotulo}>Entrar</Text>
      </Pressable>

    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
    conteiner: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#191C22'
    },
    titulo: {
      color: '#369A49',
      fontSize: 32,
      marginVertical: 20
    },
    campo: {
      backgroundColor: '#404756',
      color: '#fff',
      width: 250,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      fontSize: 16,
      marginBottom: 10
    },
    botao: {
      borderColor: '#369A49',
      borderWidth: 2,
      width: 250,
      borderRadius: 8,
      padding: 10,
      alignItems: 'center'
    },
    rotulo: {
      color: '#fff',
      fontSize: 16
    }
})
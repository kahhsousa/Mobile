import { useState } from 'react'
import { Text, StyleSheet, TextInput, Pressable, Alert, Image, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function index() {

  

  return (
    <SafeAreaView style={estilos.conteiner}>
      <Image 
          style={estilos.logo1}
          source={require('../../assets/images/layout/abstrato2.png')}
      />
      <View style={estilos.card1}>
        <Text style={estilos.titulo}>
        Bem-Vindo ao Psico-Acessível 
       </Text>
      </View>

      <Text style={estilos.subtitulo}>
        Sua plataforma de apoio psicológico,acolhimento e informação.
      </Text>
      

      <View style={estilos.card2}>
        <Text style={estilos.texto1}>
          Aqui você encontra o Diário Digital, um espaço
          pessoal para registrar seus pensamentos e sentimentos.        </Text>
      </View>

       <View style={estilos.card3}>
        <Text style={estilos.texto2}>
          Se quiser encontrar informações confiáveis 
          sobre saúde mental, profissionais da região 
          e sugestões de oficinas para o seu bem-estar, 
          consulte o nosso site!      
          </Text>
      </View>
      

       
      
       <Image 
          style={estilos.logo2}
          source={require('../../assets/images/layout/abstrato1.png')}
      />

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
   
    logo1: {
      
    },
    card1: {
      width: 300,
      height: 100,
      backgroundColor: '#343793',
      borderWidth: 2, 
      borderRadius: 5,
      marginTop: 5,
      borderColor: '#DE87FF',
      paddingHorizontal: 40,

      

      
    },
     titulo: {
      color: '#fff',
      fontSize: 29,
      marginVertical: 10,

    },
    subtitulo: {
     marginVertical: 20,
      color: '#fff',


      
    },
    card2: {
       width: 300,
      height: 100,
      backgroundColor: '#343793',
      borderWidth: 2, 
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
            borderColor: '#DE87FF',

      
    },
     card3: {
      width: 250,
      height: 'auto',
      backgroundColor: '#343793',
      borderWidth: 2, 
      borderRadius: 5,
      marginTop: 5,
      borderColor: '#DE87FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      paddingVertical: 10,
          marginLeft: 17,


      
    },
    texto1: {
      fontSize: 15,
      color: '#fff',
       marginLeft: 17,
     


      
    },
     texto2: {
      color: '#fff',
            fontSize: 15,

      
    },
     logo2: {

      
    },
    


   

})
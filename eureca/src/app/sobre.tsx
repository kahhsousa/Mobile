import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Sobre() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_700Bold,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <SafeAreaView style={estilos.container}>
            <LinearGradient
                colors={['#343793', '#10112D']}
                style={estilos.gradient}
            >

                <Image
                    source={require('../../assets/images/layout/abstrato2.png')}
                    style={estilos.abstratoSuperior}
                />

                <Image
                    source={require('../../assets/images/layout/abstrato1.png')}
                    style={estilos.abstratoInferior}
                />

                <ScrollView
                    contentContainerStyle={estilos.conteudo}
                    showsVerticalScrollIndicator={false}
                >

                    <Text style={estilos.titulo}>
                        Sobre o Projeto
                    </Text>

                    <View style={estilos.resumo}>

                        <Text style={estilos.paragrafo}>
                            O <Text style={estilos.negrito}>Psico-Acessível</Text> é uma
                            plataforma desenvolvida como Trabalho de Conclusão de Curso
                            (TCC) com o propósito de tornar as informações sobre saúde
                            mental mais acessíveis, confiáveis e de fácil compreensão
                            para toda a população.
                        </Text>

                        <Text style={estilos.paragrafo}>
                            A plataforma reúne uma biblioteca de conteúdos educativos,
                            perguntas frequentes, informações sobre transtornos
                            psicológicos, oficinas, indicação de profissionais e
                            materiais de apoio, promovendo conscientização, acolhimento
                            e incentivando a busca por ajuda quando necessário.
                        </Text>

                        <Text style={estilos.paragrafoFinal}>
                            Nosso objetivo é contribuir para a redução do preconceito
                            relacionado à saúde mental, aproximando as pessoas de
                            informações de qualidade e oferecendo um ambiente digital
                            acessível, intuitivo e pensado para atender diferentes
                            públicos.
                        </Text>

                    </View>

                    <Text style={estilos.subtitulo}>
                        Integrantes
                    </Text>

                    <View style={estilos.card}>

                        <Image
                            source={require('../../assets/integrantes/integrante1.jpeg')}
                            style={estilos.foto}
                        />

                        <View style={estilos.informacoes}>
                            <Text style={estilos.nome}>
                                Isabela Menezes
                            </Text>

                            <Text style={estilos.funcao}>
                                Desenvolvedora Front-end
                            </Text>
                        </View>

                    </View>

                    <View style={estilos.card}>

                        <Image
                            source={require('../../assets/integrantes/integrante2.jpeg')}
                            style={estilos.foto}
                        />

                        <View style={estilos.informacoes}>
                            <Text style={estilos.nome}>
                                Leticia Rodrigues
                            </Text>

                            <Text style={estilos.funcao}>
                                Desenvolvedora Front-end
                            </Text>
                        </View>

                    </View>

                    <View style={estilos.card}>

                        <Image
                            source={require('../../assets/integrantes/integrante3.jpg')}
                            style={estilos.foto}
                        />

                        <View style={estilos.informacoes}>
                            <Text style={estilos.nome}>
                                Karlene Sousa
                            </Text>

                            <Text style={estilos.funcao}>
                                Desenvolvedora Back-end
                            </Text>
                        </View>

                    </View>

                </ScrollView>

            </LinearGradient>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#10112D',
    },

    gradient: {
        flex: 1,
        overflow: 'hidden',
    },

    conteudo: {
        paddingHorizontal: 20,
        paddingTop: 35,
        paddingBottom: 40,
    },

    titulo: {
        color: '#FFFFFF',
        fontFamily: 'Inter_700Bold',
        fontSize: 28,
        marginBottom: 22,
        textAlign: 'center',
    },

    resumo: {
        backgroundColor: 'rgba(25, 28, 34, 0.78)',
        borderWidth: 1,
        borderColor: 'rgba(222, 135, 255, 0.65)',
        borderRadius: 18,
        padding: 20,
        marginBottom: 28,
    },

    paragrafo: {
        color: '#FFFFFF',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 15,
        textAlign: 'left',
    },

    paragrafoFinal: {
        color: '#FFFFFF',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'left',
    },

    negrito: {
        fontFamily: 'Inter_700Bold',
    },

    subtitulo: {
        color: '#FFFFFF',
        fontFamily: 'Inter_700Bold',
        fontSize: 23,
        marginBottom: 15,
    },

    card: {
        width: '100%',
        minHeight: 125,
        backgroundColor: 'rgba(52, 55, 147, 0.88)',
        borderWidth: 1,
        borderColor: 'rgba(222, 135, 255, 0.7)',
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },

    foto: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginRight: 16,
    },

    informacoes: {
        flex: 1,
    },

    nome: {
        color: '#FFFFFF',
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        marginBottom: 6,
    },

    funcao: {
        color: '#FFFFFF',
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        lineHeight: 18,
    },

    abstratoSuperior: {
        position: 'absolute',
        width: 230,
        height: 230,
        top: -70,
        left: -75,
        opacity: 0.9,
    },

    abstratoInferior: {
        position: 'absolute',
        width: 250,
        height: 250,
        bottom: -75,
        right: -85,
        opacity: 0.9,
    },
})
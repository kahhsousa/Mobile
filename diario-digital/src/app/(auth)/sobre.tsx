import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

export default function Sobre() {
  return (
    <SafeAreaView style={estilos.container}>
      <LinearGradient
        colors={[Cores.fundo2, Cores.fundo1]}
        style={estilos.fundo}
      >
        {/* Bolha superior */}
        <LinearGradient
          colors={[Cores.border1, Cores.border2]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={estilos.bolhaTopo}
          pointerEvents="none"
        />

        {/* Conteúdo da página */}
        <ScrollView
          style={estilos.rolagem}
          contentContainerStyle={estilos.conteudo}
          showsVerticalScrollIndicator={false}
        >
          <Text style={estilos.titulo}>
            Sobre o Projeto
          </Text>

          {/* Resumo do projeto */}
          <View style={estilos.resumo}>
            <Text style={estilos.paragrafo}>
              O{" "}
              <Text style={estilos.negrito}>
                Psico-Acessível
              </Text>{" "}
              é uma plataforma desenvolvida como Trabalho de
              Conclusão de Curso (TCC) com o propósito de tornar
              as informações sobre saúde mental mais acessíveis,
              confiáveis e de fácil compreensão para toda a
              população.
            </Text>

            <Text style={estilos.paragrafo}>
              A plataforma reúne uma biblioteca de conteúdos
              educativos, perguntas frequentes, informações sobre
              transtornos psicológicos, oficinas, indicação de
              profissionais e materiais de apoio, promovendo
              conscientização, acolhimento e incentivando a busca
              por ajuda quando necessário.
            </Text>

            <Text style={estilos.paragrafoFinal}>
              Nosso objetivo é contribuir para a redução do
              preconceito relacionado à saúde mental, aproximando
              as pessoas de informações de qualidade e oferecendo
              um ambiente digital acessível, intuitivo e pensado
              para atender diferentes públicos.
            </Text>
          </View>

          {/* Integrantes */}
          <Text style={estilos.subtitulo}>
            Integrantes
          </Text>

          {/* Integrante 1 */}
          <View style={estilos.card}>
            <Image
              source={require("../../../assets/integrantes/integrante1.jpeg")}
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

          {/* Integrante 2 */}
          <View style={estilos.card}>
            <Image
              source={require("../../../assets/integrantes/integrante2.jpeg")}
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

          {/* Integrante 3 */}
          <View style={estilos.card}>
            <Image
              source={require("../../../assets/integrantes/integrante3.jpg")}
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

        {/* Bolha inferior */}
        <LinearGradient
          colors={[Cores.border2, Cores.border1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={estilos.bolhaBaixo}
          pointerEvents="none"
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundo2,
  },

  fundo: {
    flex: 1,
    position: "relative",
  },

  rolagem: {
    flex: 1,
    width: "100%",
    zIndex: 1,
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 60,
  },

  titulo: {
    color: Cores.basic,
    fontSize: Fontes.grande1,
    fontFamily: Fontes.logo,
    textAlign: "center",
    marginBottom: 22,
  },

  resumo: {
    backgroundColor: Cores.cards,
    borderWidth: 1,
    borderColor: Cores.border2,
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
  },

  paragrafo: {
    color: Cores.basic,
    fontFamily: Fontes.baseRegular,
    fontSize: Fontes.pequeno,
    lineHeight: 21,
    marginBottom: 15,
    textAlign: "left",
  },

  paragrafoFinal: {
    color: Cores.basic,
    fontFamily: Fontes.baseRegular,
    fontSize: Fontes.pequeno,
    lineHeight: 21,
    textAlign: "left",
  },

  negrito: {
    fontFamily: Fontes.baseBold,
    color: Cores.basic,
  },

  subtitulo: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.logo,
    marginBottom: 15,
  },

  card: {
    width: "100%",
    minHeight: 125,
    backgroundColor: Cores.cards,
    borderWidth: 1,
    borderColor: Cores.border2,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
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
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
    marginBottom: 6,
  },

  funcao: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    lineHeight: 18,
  },

  // Decoração superior
  bolhaTopo: {
    position: "absolute",
    top: -70,
    left: -60,
    width: 230,
    height: 180,
    borderBottomRightRadius: 170,
    borderBottomLeftRadius: 90,
    borderTopRightRadius: 80,
    opacity: 0.8,
    zIndex: 0,
  },

  // Decoração inferior
  bolhaBaixo: {
    position: "absolute",
    bottom: -70,
    right: -60,
    width: 230,
    height: 180,
    borderTopLeftRadius: 170,
    borderTopRightRadius: 90,
    borderBottomLeftRadius: 80,
    opacity: 0.8,
    zIndex: 0,
  },
});
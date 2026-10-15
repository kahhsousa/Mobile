import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router, Href } from "expo-router";
import MaterialIcons from "@react-native-vector-icons/material-icons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { useAutenticacao } from "@/hooks/use.Autenticacao";

export default function Perfil() {
  const { usuarioContexto, deslogar, deslogarContexto } =
    useAutenticacao();

  async function sair() {
    const retorno = await deslogar();

    if (retorno === "sucesso") {
      await deslogarContexto();
      router.replace("/login" as Href);
    }
  }

  function confirmarSaida() {
    Alert.alert(
      "Sair da conta",
      "Tem certeza de que deseja sair do Diário Digital?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: sair,
        },
      ]
    );
  }

  function mostrarInformacoes() {
    Alert.alert(
      "Sobre seus dados",
      "O Diário Digital foi desenvolvido para ajudar você a registrar seus sentimentos e acompanhar suas emoções."
    );
  }

  function editarPerfil() {
    router.push("/(auth)/editarPerfil");
  }

  return (
    <SafeAreaView style={estilos.container}>
      <LinearGradient
        colors={[Cores.fundo2, Cores.fundo1]}
        style={estilos.fundo}
      >
        {/* Decoração superior */}
        <LinearGradient
          colors={[Cores.border1, Cores.border2]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={estilos.bolhaTopo}
          pointerEvents="none"
        />

        {/* Conteúdo rolável */}
        <ScrollView
          style={estilos.rolagem}
          contentContainerStyle={estilos.conteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho */}
          <View style={estilos.cabecalho}>
            <Text style={estilos.titulo}>MEU PERFIL</Text>

            <Text style={estilos.subtitulo}>
              Sua conta e suas preferências.
            </Text>
          </View>

          {/* Cartão de usuário */}
          <View style={estilos.cardPerfil}>
            <LinearGradient
              colors={[Cores.border1, Cores.border2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={estilos.areaAvatar}
            >
              <MaterialIcons
                name="person"
                size={45}
                color={Cores.basic}
              />
            </LinearGradient>

            <View style={estilos.dadosUsuario}>
              <Text
                style={estilos.nomeUsuario}
                numberOfLines={2}
              >
                {usuarioContexto?.nome || "Usuário"}
              </Text>

              <Text
                style={estilos.emailUsuario}
                numberOfLines={2}
              >
                {usuarioContexto?.email || "E-mail não disponível"}
              </Text>

              <View style={estilos.identificacao}>
                <MaterialIcons
                  name="verified-user"
                  size={15}
                  color={Cores.border2}
                />

                <Text style={estilos.textoIdentificacao}>
                  Conta conectada
                </Text>
              </View>

              {/* Editar perfil */}
              <Pressable
                onPress={editarPerfil}
                style={({ pressed }) => [
                  estilos.botaoEditar,
                  pressed && estilos.botaoPressionado,
                ]}
                accessibilityRole="button"
              >
                <MaterialIcons
                  name="edit"
                  size={17}
                  color={Cores.border2}
                />

                <Text style={estilos.textoBotaoEditar}>
                  Editar perfil
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Resumo */}
          <Text style={estilos.tituloSecao}>
            SEU DIÁRIO
          </Text>

          <View style={estilos.cardResumo}>
            <View style={estilos.iconeResumo}>
              <MaterialIcons
                name="menu-book"
                size={30}
                color={Cores.border2}
              />
            </View>

            <View style={estilos.textoResumo}>
              <Text style={estilos.tituloResumo}>
                Seus momentos importam
              </Text>

              <Text style={estilos.descricaoResumo}>
                Registre seus pensamentos, reconheça suas emoções
                e acompanhe sua jornada pessoal.
              </Text>
            </View>
          </View>

          {/* Conta e privacidade */}
          <Text style={estilos.tituloSecao}>
            CONTA E PRIVACIDADE
          </Text>

          <View style={estilos.cardOpcoes}>
            <Pressable
              style={estilos.opcao}
              onPress={mostrarInformacoes}
              accessibilityRole="button"
            >
              <View style={estilos.iconeOpcao}>
                <MaterialIcons
                  name="info-outline"
                  size={24}
                  color={Cores.border2}
                />
              </View>

              <View style={estilos.conteudoOpcao}>
                <Text style={estilos.tituloOpcao}>
                  Sobre o Diário Digital
                </Text>

                <Text style={estilos.descricaoOpcao}>
                  Conheça a finalidade do aplicativo.
                </Text>
              </View>

              <MaterialIcons
                name="chevron-right"
                size={25}
                color={Cores.basic}
              />
            </Pressable>

            <View style={estilos.divisor} />

            <View style={estilos.opcao}>
              <View style={estilos.iconeOpcao}>
                <MaterialIcons
                  name="lock-outline"
                  size={24}
                  color={Cores.border2}
                />
              </View>

              <View style={estilos.conteudoOpcao}>
                <Text style={estilos.tituloOpcao}>
                  Seus registros
                </Text>

                <Text style={estilos.descricaoOpcao}>
                  Seus relatos são pessoais. Mantenha seu acesso
                  protegido.
                </Text>
              </View>
            </View>
          </View>

          {/* Botão sair */}
          <Pressable
            onPress={confirmarSaida}
            style={({ pressed }) => [
              estilos.areaBotaoSair,
              pressed && estilos.botaoPressionado,
            ]}
            accessibilityRole="button"
          >
            <MaterialIcons
              name="logout"
              size={22}
              color={Cores.basic}
            />

            <Text style={estilos.textoBotaoSair}>
              Sair da conta
            </Text>
          </Pressable>

          {/* Rodapé */}
          <Text style={estilos.rodape}>
            DIÁRIO DIGITAL
          </Text>
        </ScrollView>

        {/* Decoração inferior */}
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
  // Estrutura principal
  container: {
    flex: 1,
    backgroundColor: Cores.fundo2,
  },

  fundo: {
    flex: 1,
  },

  rolagem: {
    flex: 1,
    zIndex: 1,
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 60,
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
    opacity: 0.7,
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
    opacity: 0.7,
    zIndex: 0,
  },

  // Cabeçalho
  cabecalho: {
    alignItems: "center",
    marginBottom: 25,
  },

  titulo: {
    color: Cores.basic,
    fontSize: Fontes.grande1,
    fontFamily: Fontes.logo,
    textAlign: "center",
    marginBottom: 8,
  },

  subtitulo: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    textAlign: "center",
    opacity: 0.85,
  },

  // Cartão de usuário
  cardPerfil: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Cores.cards,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Cores.border2,
    padding: 18,
    marginBottom: 28,
    gap: 15,
    elevation: 6,
  },

  areaAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  dadosUsuario: {
    flex: 1,
  },

  nomeUsuario: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
    marginBottom: 5,
  },

  emailUsuario: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    opacity: 0.8,
    marginBottom: 9,
  },

  identificacao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  textoIdentificacao: {
    color: Cores.border2,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
  },

  // Botão editar perfil
  botaoEditar: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    marginTop: 12,
    paddingVertical: 6,
  },

  textoBotaoEditar: {
    color: Cores.border2,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
  },

  // Títulos das seções
  tituloSecao: {
    color: Cores.border2,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
    marginBottom: 12,
    marginLeft: 4,
  },

  // Resumo do diário
  cardResumo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Cores.cards,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    padding: 17,
    marginBottom: 28,
    gap: 14,
  },

  iconeResumo: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: Cores.fundo1,
    alignItems: "center",
    justifyContent: "center",
  },

  textoResumo: {
    flex: 1,
  },

  tituloResumo: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
    marginBottom: 7,
  },

  descricaoResumo: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    lineHeight: 19,
    opacity: 0.85,
  },

  // Opções de conta e privacidade
  cardOpcoes: {
    backgroundColor: Cores.cards,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  opcao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    gap: 12,
  },

  iconeOpcao: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: Cores.fundo1,
    alignItems: "center",
    justifyContent: "center",
  },

  conteudoOpcao: {
    flex: 1,
  },

  tituloOpcao: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseBold,
    marginBottom: 5,
  },

  descricaoOpcao: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    lineHeight: 18,
    opacity: 0.8,
  },

  divisor: {
    height: 1,
    backgroundColor: Cores.borderInput,
  },

  // Botão sair
  areaBotaoSair: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Cores.fundo1,
    borderWidth: 1,
    borderColor: Cores.border2,
    borderRadius: 16,
    paddingVertical: 16,
  },

  textoBotaoSair: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  // Rodapé
  rodape: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
    textAlign: "center",
    marginTop: 25,
    opacity: 0.6,
    letterSpacing: 2,
  },
});
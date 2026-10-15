import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams, Href } from "expo-router";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { useAutenticacao } from "@/hooks/use.Autenticacao";
import { excluirRegistro as excluirRegistroBanco } from "@/services/BancoDados";

export default function VisualizarRegistro() {
  const router = useRouter();

  const { usuarioContexto } = useAutenticacao();

  const {
    id,
    data,
    emoji,
    emocao,
    titulo,
    texto,
  } = useLocalSearchParams<{
    id: string;
    data: string;
    emoji: string;
    emocao: string;
    titulo: string;
    texto: string;
  }>();

  const registro = {
    id: id ?? "",
    data: data ?? "",
    icone: emoji ?? "",
    emocao: emocao ?? "",
    titulo: titulo ?? "",
    texto: texto ?? "",
  };

  // Confirmação antes de excluir
  function confirmarExclusao() {
    Alert.alert(
      "Excluir registro",
      "Tem certeza de que deseja excluir este registro? Essa ação não poderá ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: excluir,
        },
      ]
    );
  }

  // Exclui o registro do SQLite
  function excluir() {
    if (!usuarioContexto?.codigo) {
      Alert.alert(
        "Erro",
        "Não foi possível identificar o usuário."
      );
      return;
    }

    const registroId = Number(registro.id);

    if (!Number.isInteger(registroId) || registroId <= 0) {
      Alert.alert(
        "Erro",
        "Não foi possível identificar o registro."
      );
      return;
    }

    try {
      const resultado = excluirRegistroBanco(
        registroId,
        usuarioContexto.codigo
      );

      if (resultado.changes === 0) {
        Alert.alert(
          "Registro não encontrado",
          "Este registro não existe ou não pertence à sua conta."
        );
        return;
      }

      Alert.alert(
        "Registro excluído",
        "O registro foi excluído com sucesso.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/(auth)/registros" as Href);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao excluir registro:", error);

      Alert.alert(
        "Erro",
        "Não foi possível excluir o registro. Tente novamente."
      );
    }
  }

  // Abre a tela de edição com os dados atuais
  function editarRegistro() {
    router.push({
      pathname: "/registrar",
      params: {
        id: registro.id,
        data: registro.data,
        emoji: registro.icone,
        emocao: registro.emocao,
        titulo: registro.titulo,
        texto: registro.texto,
        modo: "editar",
      },
    });
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
        />

        <ScrollView
          style={estilos.rolagem}
          contentContainerStyle={estilos.conteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho com botão de voltar */}
          <View style={estilos.cabecalho}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                estilos.botaoVoltar,
                pressed && estilos.pressionado,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={Cores.basic}
              />
            </Pressable>

            <View style={estilos.textosCabecalho}>
              <Text style={estilos.tituloPagina}>
                MEU REGISTRO
              </Text>

              <Text style={estilos.subtitulo}>
                Um espaço para lembrar e compreender seus sentimentos.
              </Text>
            </View>
          </View>

          {/* Cartão do registro */}
          <View style={estilos.card}>
            {/* Data */}
            <View style={estilos.areaData}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={20}
                color={Cores.border1}
              />

              <Text style={estilos.data}>
                {registro.data}
              </Text>
            </View>

            {/* Emoção */}
            <View style={estilos.areaEmocao}>
              <View style={estilos.circuloEmoji}>
                <Text style={estilos.emoji}>
                  {registro.icone}
                </Text>
              </View>

              <Text style={estilos.nomeEmocao}>
                {registro.emocao}
              </Text>
            </View>

            {/* Título */}
            <Text style={estilos.tituloRegistro}>
              {registro.titulo}
            </Text>

            {/* Divisor */}
            <LinearGradient
              colors={[Cores.border1, Cores.border2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={estilos.divisor}
            />

            {/* Conteúdo */}
            <Text style={estilos.textoRegistro}>
              {registro.texto}
            </Text>
          </View>

          {/* Botão editar */}
          <Pressable
            onPress={editarRegistro}
            style={({ pressed }) => [
              estilos.areaBotao,
              pressed && estilos.pressionado,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Editar registro"
          >
            <LinearGradient
              colors={[Cores.border1, Cores.border2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={estilos.botaoEditar}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={20}
                color={Cores.basic}
              />

              <Text style={estilos.textoBotaoEditar}>
                Editar registro
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Botão excluir */}
          <Pressable
            onPress={confirmarExclusao}
            style={({ pressed }) => [
              estilos.botaoExcluir,
              pressed && estilos.pressionado,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Excluir registro"
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              color={Cores.basic}
            />

            <Text style={estilos.textoBotaoExcluir}>
              Excluir registro
            </Text>
          </Pressable>
        </ScrollView>

        {/* Decoração inferior */}
        <LinearGradient
          colors={[Cores.border2, Cores.border1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={estilos.bolhaBaixo}
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
    zIndex: 1,
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

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
  },

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

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 25,
  },

  botaoVoltar: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: Cores.cards,
    borderWidth: 1,
    borderColor: Cores.border2,
    alignItems: "center",
    justifyContent: "center",
  },

  textosCabecalho: {
    flex: 1,
  },

  tituloPagina: {
    color: Cores.basic,
    fontSize: Fontes.grande1,
    fontFamily: Fontes.logo,
    textAlign: "left",
  },

  subtitulo: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    marginTop: 5,
    opacity: 0.85,
    lineHeight: 22,
  },

  card: {
    backgroundColor: Cores.cards,
    borderWidth: 2,
    borderColor: Cores.border2,
    borderRadius: 24,
    padding: 22,
    marginBottom: 25,
    elevation: 8,
  },

  areaData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 22,
  },

  data: {
    color: Cores.border1,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseBold,
  },

  areaEmocao: {
    alignItems: "center",
    marginBottom: 22,
  },

  circuloEmoji: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Cores.fundo1,
    borderWidth: 2,
    borderColor: Cores.border1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  emoji: {
    fontSize: 43,
  },

  nomeEmocao: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
  },

  tituloRegistro: {
    color: Cores.basic,
    fontSize: Fontes.grande2,
    fontFamily: Fontes.baseBold,
    textAlign: "center",
    marginBottom: 18,
  },

  divisor: {
    height: 2,
    borderRadius: 2,
    marginBottom: 20,
  },

  textoRegistro: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    lineHeight: 26,
    textAlign: "left",
  },

  areaBotao: {
    marginBottom: 14,
  },

  botaoEditar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },

  textoBotaoEditar: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
  },

  botaoExcluir: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Cores.border2,
    backgroundColor: Cores.cards,
  },

  textoBotaoExcluir: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
  },

  pressionado: {
    opacity: 0.7,
  },
});
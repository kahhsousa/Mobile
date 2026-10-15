import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { useAutenticacao } from "@/hooks/use.Autenticacao";
import {
  buscarRegistros,
  RegistroSalvo,
} from "@/services/BancoDados";

type Registro = RegistroSalvo & {
  emocao: string;
};

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

export default function Registros() {
  const router = useRouter();

  const { usuarioContexto } = useAutenticacao();

  const [registros, setRegistros] = useState<Registro[]>([]);

  // Carrega os registros sempre que a página recebe foco.
  useFocusEffect(
    useCallback(() => {
      if (!usuarioContexto?.codigo) {
        setRegistros([]);
        return;
      }

      try {
        const registrosSalvos = buscarRegistros(
          usuarioContexto.codigo
        );

        setRegistros(
          registrosSalvos.map((registro) => ({
            ...registro,
            emocao: registro.emoji,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
        setRegistros([]);
      }
    }, [usuarioContexto?.codigo])
  );

  // Abre a página com os detalhes do registro selecionado.
  function visualizarRegistro(registro: Registro) {
    router.push({
      pathname: "/(auth)/visualizarRegistros",
      params: {
        id: String(registro.id),
        titulo: registro.titulo,
        data: formatarData(registro.data),
        emoji: registro.emoji,
        emocao: registro.emocao,
        texto: registro.texto,
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

        {/* Decoração inferior */}
        <LinearGradient
          colors={[Cores.border2, Cores.border1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={estilos.bolhaBaixo}
        />

        <ScrollView
          style={estilos.rolagem}
          contentContainerStyle={estilos.conteudoRolagem}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho */}
          <View style={estilos.cabecalho}>
            <Text style={estilos.titulo}>MEUS REGISTROS</Text>

            <Text style={estilos.subtitulo}>
              Relembre seus momentos e acompanhe suas emoções.
            </Text>
          </View>

          {/* Lista de registros */}
          {registros.length > 0 ? (
            registros.map((registro) => (
              <View key={registro.id} style={estilos.card}>
                {/* Data e emoção */}
                <View style={estilos.informacoes}>
                  <View style={estilos.dataContainer}>
                    <MaterialCommunityIcons
                      name="calendar-month-outline"
                      size={18}
                      color={Cores.basic}
                    />

                    <Text style={estilos.data}>
                      {formatarData(registro.data)}
                    </Text>
                  </View>

                  <View style={estilos.emocao}>
                    {registro.emoji !== "" && (
                      <Text style={estilos.emoji}>
                        {registro.emoji}
                      </Text>
                    )}

                    <Text style={estilos.nomeEmocao}>
                      {registro.emocao}
                    </Text>
                  </View>
                </View>

                {/* Título */}
                <Text style={estilos.tituloRegistro}>
                  {registro.titulo}
                </Text>

                {/* Prévia do texto */}
                <Text
                  style={estilos.textoRegistro}
                  numberOfLines={3}
                >
                  {registro.texto}
                </Text>

                {/* Botão para visualizar */}
                <Pressable
                  onPress={() => visualizarRegistro(registro)}
                  style={({ pressed }) => [
                    estilos.areaBotao,
                    pressed && estilos.botaoPressionado,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Ler registro: ${registro.titulo}`}
                >
                  <LinearGradient
                    colors={[Cores.border1, Cores.border2]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={estilos.botao}
                  >
                    <View style={estilos.conteudoBotao}>
                      <Text style={estilos.textoBotao}>
                        Ler registro
                      </Text>

                      <MaterialCommunityIcons
                        name="arrow-right"
                        size={22}
                        color={Cores.basic}
                      />
                    </View>
                  </LinearGradient>
                </Pressable>
              </View>
            ))
          ) : (
            /* Mensagem quando não existem registros */
            <View style={estilos.cardVazio}>
              <MaterialCommunityIcons
                name="book-open-page-variant-outline"
                size={45}
                color={Cores.basic}
              />

              <Text style={estilos.tituloVazio}>
                Nenhum registro ainda
              </Text>

              <Text style={estilos.textoVazio}>
                Seus registros aparecerão aqui depois que você
                escrever e salvar suas experiências.
              </Text>
            </View>
          )}

          {/* Mensagem informativa */}
          <View style={estilos.rodapeContainer}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={20}
              color={Cores.basic}
            />

            <Text style={estilos.rodape}>
              Cada registro é uma oportunidade de conhecer melhor
              seus sentimentos.
            </Text>
          </View>
        </ScrollView>
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

  conteudoRolagem: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
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
    marginBottom: 25,
    alignItems: "center",
  },

  titulo: {
    color: Cores.basic,
    fontSize: Fontes.grande1,
    fontFamily: Fontes.logo,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitulo: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.85,
  },

  card: {
    backgroundColor: Cores.cards,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Cores.border2,
    padding: 18,
    marginBottom: 20,
    elevation: 6,
  },

  informacoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },

  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  data: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
  },

  emocao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  emoji: {
    fontSize: 23,
  },

  nomeEmocao: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
  },

  tituloRegistro: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
    marginBottom: 10,
  },

  textoRegistro: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    lineHeight: 22,
    opacity: 0.85,
    marginBottom: 18,
  },

  areaBotao: {
    marginTop: 2,
  },

  botao: {
    width: "100%",
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  conteudoBotao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  textoBotao: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
  },

  botaoPressionado: {
    opacity: 0.75,
  },

  cardVazio: {
    backgroundColor: Cores.cards,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Cores.border2,
    padding: 25,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  tituloVazio: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 8,
  },

  textoVazio: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.85,
  },

  rodapeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 5,
    marginBottom: 20,
  },

  rodape: {
    flex: 1,
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    textAlign: "center",
    lineHeight: 20,
    opacity: 0.8,
  },
});
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter, Href } from "expo-router";

import EmojiPickerModal, {
  emojiData,
} from "@hiraku-ai/react-native-emoji-picker";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

import {
  salvarRegistro as salvarRegistroBanco,
  atualizarRegistro as atualizarRegistroBanco,
} from "@/services/BancoDados";

import { useAutenticacao } from "@/hooks/use.Autenticacao";

export default function Registrar() {
  const { usuarioContexto } = useAutenticacao();

  const router = useRouter();

  const parametros = useLocalSearchParams<{
    id?: string;
    modo?: string;
    data?: string;
    emoji?: string;
    titulo?: string;
    texto?: string;
  }>();

  const modoEdicao = parametros.modo === "editar";

  const [data, setData] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const [emojiSelecionado, setEmojiSelecionado] = useState("");
  const [mostrarEmojis, setMostrarEmojis] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [registro, setRegistro] = useState("");

  // Preenche os campos quando a tela é aberta para editar.
  useEffect(() => {
    if (!modoEdicao) {
      return;
    }

    setTitulo(parametros.titulo ?? "");
    setRegistro(parametros.texto ?? "");
    setEmojiSelecionado(parametros.emoji ?? "");

    if (parametros.data) {
      const partes = parametros.data.split("/");

      let dataConvertida: Date;

      if (partes.length === 3) {
        // Data recebida no formato DD/MM/AAAA.
        const [dia, mes, ano] = partes.map(Number);

        dataConvertida = new Date(ano, mes - 1, dia);
      } else {
        // Também aceita a data no formato AAAA-MM-DD.
        const [ano, mes, dia] = parametros.data.split("-").map(Number);

        dataConvertida = new Date(ano, mes - 1, dia);
      }

      if (!Number.isNaN(dataConvertida.getTime())) {
        setData(dataConvertida);
      }
    }
  }, [
    modoEdicao,
    parametros.id,
    parametros.data,
    parametros.emoji,
    parametros.titulo,
    parametros.texto,
  ]);

  function formatarData(dataSelecionada: Date) {
    return dataSelecionada.toLocaleDateString("pt-BR");
  }

  function alterarData(
    evento: DateTimePickerEvent,
    dataSelecionada?: Date
  ) {
    setMostrarCalendario(false);

    if (evento.type === "set" && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function selecionarEmoji(emoji: string) {
    setEmojiSelecionado(emoji);
    setMostrarEmojis(false);
  }

  function salvarRegistro() {
    if (!emojiSelecionado || !titulo.trim() || !registro.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Selecione um emoji, informe o título e escreva seu registro."
      );
      return;
    }

    if (!usuarioContexto?.codigo) {
      Alert.alert(
        "Erro de autenticação",
        "Não foi possível identificar o usuário conectado."
      );
      return;
    }

    const dadosRegistro = {
      usuario_id: usuarioContexto.codigo,
      titulo: titulo.trim(),
      texto: registro.trim(),
      data: [
        data.getFullYear(),
        String(data.getMonth() + 1).padStart(2, "0"),
        String(data.getDate()).padStart(2, "0"),
      ].join("-"),
      emoji: emojiSelecionado,
    };

    try {
      if (modoEdicao) {
        const idRegistro = Number(parametros.id);

        if (!parametros.id || !Number.isInteger(idRegistro) || idRegistro <= 0) {
          Alert.alert(
            "Erro",
            "Não foi possível identificar o registro que será editado."
          );
          return;
        }

        const resultado = atualizarRegistroBanco(
          idRegistro,
          usuarioContexto.codigo,
          dadosRegistro
        );

        if (resultado.changes === 0) {
          Alert.alert(
            "Registro não atualizado",
            "O registro não foi encontrado ou não pertence ao usuário conectado."
          );
          return;
        }

        Alert.alert(
          "Sucesso!",
          "Seu registro foi atualizado com sucesso.",
          [
            {
              text: "OK",
              onPress: () => {
                router.replace(
                  "/(auth)/registros" as Href
                );
              },
            },
          ]
        );
      } else {
        salvarRegistroBanco(dadosRegistro);

        Alert.alert(
          "Sucesso!",
          "Seu registro foi salvo com sucesso."
        );

        setEmojiSelecionado("");
        setTitulo("");
        setRegistro("");
        setData(new Date());
        setMostrarCalendario(false);
      }
    } catch (erro) {
      console.error("Erro ao salvar ou atualizar registro:", erro);

      Alert.alert(
        "Erro",
        modoEdicao
          ? "Não foi possível atualizar seu registro. Tente novamente."
          : "Não foi possível salvar seu registro. Tente novamente."
      );
    }
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
          contentContainerStyle={estilos.conteudoRolagem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={estilos.card}>
            <Text style={estilos.titulo}>
              {modoEdicao ? "EDITAR REGISTRO" : "NOVO REGISTRO"}
            </Text>

            <Text style={estilos.subtitulo}>
              {modoEdicao
                ? "Atualize as informações do seu registro."
                : "Escreva como você está se sentindo hoje."}
            </Text>

            {/* Data do registro */}
            <Text style={estilos.label}>Data do registro</Text>

            <Pressable
              style={estilos.campoData}
              onPress={() =>
                setMostrarCalendario(!mostrarCalendario)
              }
            >
              <Text style={estilos.iconeData}>5</Text>

              <Text style={estilos.textoData}>
                {formatarData(data)}
              </Text>

              <Text style={estilos.iconeCalendario}></Text>
            </Pressable>

            {mostrarCalendario && (
              <View style={estilos.calendario}>
                <DateTimePicker
                  value={data}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={alterarData}
                />
              </View>
            )}

            {/* Seleção de emoji */}
            <Text style={estilos.label}>
              Como você está se sentindo?
            </Text>

            <Pressable
              style={estilos.seletorEmoji}
              onPress={() => setMostrarEmojis(true)}
              accessibilityRole="button"
              accessibilityLabel="Escolher emoji para representar seu humor"
            >
              <Text style={estilos.emojiSelecionado}>
                {emojiSelecionado || "＋"}
              </Text>

              <View style={estilos.textosEmoji}>
                <Text style={estilos.tituloSeletorEmoji}>
                  {emojiSelecionado
                    ? "Emoji selecionado"
                    : "Escolher emoji"}
                </Text>

                <Text style={estilos.subtituloSeletorEmoji}>
                  Toque para abrir a biblioteca de emojis
                </Text>
              </View>
            </Pressable>

            {/* Biblioteca de emojis */}
            <EmojiPickerModal
              visible={mostrarEmojis}
              onClose={() => setMostrarEmojis(false)}
              onEmojiSelect={selecionarEmoji}
              emojis={emojiData}
            />

            {/* Título */}
            <Text style={estilos.label}>Título</Text>

            <TextInput
              style={estilos.input}
              placeholder="Ex.: Como foi meu dia..."
              placeholderTextColor={Cores.basic}
              value={titulo}
              onChangeText={setTitulo}
              maxLength={100}
            />

            {/* Conteúdo */}
            <Text style={estilos.label}>Registro</Text>

            <TextInput
              style={estilos.inputGrande}
              placeholder="Escreva aqui seus sentimentos, emoções e pensamentos..."
              placeholderTextColor={Cores.basic}
              multiline
              textAlignVertical="top"
              value={registro}
              onChangeText={setRegistro}
              maxLength={5000}
            />

            {/* Botão de salvar ou atualizar */}
            <Pressable
              onPress={salvarRegistro}
              style={estilos.areaBotao}
            >
              <LinearGradient
                colors={[Cores.border1, Cores.border2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={estilos.botao}
              >
                <Text style={estilos.textoBotao}>
                  {modoEdicao ? "Salvar Alterações" : "Salvar Registro"}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
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
  },

  rolagem: {
    flex: 1,
    zIndex: 2,
  },

  conteudoRolagem: {
    flexGrow: 1,
    justifyContent: "center",
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
    zIndex: 1,
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
    zIndex: 1,
  },

  card: {
    width: "100%",
    backgroundColor: Cores.cards,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Cores.border2,
    padding: 20,
    elevation: 8,
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
    marginBottom: 20,
    opacity: 0.85,
  },

  label: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
    marginBottom: 8,
    marginTop: 14,
  },

  campoData: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Cores.fundo1,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  iconeData: {
    fontSize: 20,
    marginRight: 12,
  },

  textoData: {
    flex: 1,
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
  },

  iconeCalendario: {
    color: Cores.basic,
    fontSize: 12,
  },

  calendario: {
    alignItems: "center",
    marginTop: 8,
  },

  seletorEmoji: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Cores.fundo1,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  emojiSelecionado: {
    fontSize: 36,
    marginRight: 14,
    color: Cores.basic,
  },

  textosEmoji: {
    flex: 1,
  },

  tituloSeletorEmoji: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseBold,
  },

  subtituloSeletorEmoji: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    marginTop: 4,
    opacity: 0.8,
  },

  input: {
    backgroundColor: Cores.fundo1,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
  },

  inputGrande: {
    backgroundColor: Cores.fundo1,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    height: 160,
    marginBottom: 12,
  },

  areaBotao: {
    marginTop: 10,
  },

  botao: {
    width: "100%",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotao: {
    color: Cores.basic,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
  },
});
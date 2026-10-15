import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import MaterialIcons from "@react-native-vector-icons/material-icons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";
import { useAutenticacao } from "@/hooks/use.Autenticacao";

export default function EditarPerfil() {
  const router = useRouter();
  const { usuarioContexto } = useAutenticacao();

  // Informações pessoais
  const [nome, setNome] = useState(usuarioContexto?.nome ?? "");
  const [apelido, setApelido] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  // Preferências
  const [lembretes, setLembretes] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [horario, setHorario] = useState("20:00");

  // Validar a data de nascimento
  function validarData(data: string) {
    if (!data.trim()) return true;

    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
      return false;
    }

    const [dia, mes, ano] = data.split("/").map(Number);
    const dataInformada = new Date(ano, mes - 1, dia);

    return (
      dataInformada.getDate() === dia &&
      dataInformada.getMonth() === mes - 1 &&
      dataInformada.getFullYear() === ano &&
      dataInformada <= new Date()
    );
  }

  // Validar o horário do lembrete
  function validarHorario(valor: string) {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(valor);
  }

  // Salvar as alterações
  function salvarAlteracoes() {
    if (!nome.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe seu nome para continuar."
      );
      return;
    }

    if (!validarData(dataNascimento)) {
      Alert.alert(
        "Data inválida",
        "Informe uma data válida no formato DD/MM/AAAA."
      );
      return;
    }

    if (lembretes && !validarHorario(horario)) {
      Alert.alert(
        "Horário inválido",
        "Informe um horário válido, como 20:00."
      );
      return;
    }

    /*
      O próximo passo será integrar o salvamento
      ao Firebase e ao armazenamento das preferências.
    */

    Alert.alert(
      "Validação concluída",
      "Os campos foram validados. O salvamento permanente ainda precisa ser implementado."
    );
  }

  // Cancelar a edição
  function cancelarEdicao() {
    Alert.alert(
      "Cancelar edição",
      "Deseja descartar as alterações realizadas?",
      [
        {
          text: "Continuar editando",
          style: "cancel",
        },
        {
          text: "Descartar",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  }

  // Alterar a foto de perfil
  function alterarFoto() {
    Alert.alert(
      "Foto de perfil",
      "A seleção de imagens será implementada posteriormente."
    );
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
          {/* Cabeçalho */}
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
              <Text style={estilos.titulo}>
                EDITAR PERFIL
              </Text>

              <Text style={estilos.subtitulo}>
                Personalize suas informações.
              </Text>
            </View>
          </View>

          {/* Card da foto de perfil */}
          <View style={estilos.cardFoto}>
            <View style={estilos.avatar}>
              <MaterialIcons
                name="person"
                size={65}
                color={Cores.border2}
              />

              <Pressable
                onPress={alterarFoto}
                style={estilos.botaoCamera}
                accessibilityRole="button"
                accessibilityLabel="Alterar foto"
              >
                <MaterialIcons
                  name="photo-camera"
                  size={18}
                  color={Cores.basic}
                />
              </Pressable>
            </View>

            <Text style={estilos.nomeFoto}>
              Sua foto de perfil
            </Text>

            <Text style={estilos.descricaoFoto}>
              Personalize sua conta
            </Text>

            <Pressable
              onPress={alterarFoto}
              style={({ pressed }) => [
                estilos.botaoFoto,
                pressed && estilos.pressionado,
              ]}
            >
              <MaterialIcons
                name="add-a-photo"
                size={18}
                color={Cores.border1}
              />

              <Text style={estilos.textoBotaoFoto}>
                Alterar foto
              </Text>
            </Pressable>
          </View>

          {/* Informações pessoais */}
          <View style={estilos.card}>
            <View style={estilos.tituloSecao}>
              <MaterialIcons
                name="person-outline"
                size={23}
                color={Cores.border1}
              />

              <Text style={estilos.tituloSecaoTexto}>
                INFORMAÇÕES PESSOAIS
              </Text>
            </View>

            {/* Nome */}
            <Text style={estilos.label}>
              Nome completo
            </Text>

            <View style={estilos.campo}>
              <MaterialIcons
                name="person"
                size={20}
                color={Cores.border2}
              />

              <TextInput
                style={estilos.input}
                placeholder="Digite seu nome"
                placeholderTextColor={Cores.basic}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
                maxLength={100}
                accessibilityLabel="Nome completo"
              />
            </View>

            {/* Apelido */}
            <Text style={estilos.label}>
              Como deseja ser chamado(a)?
            </Text>

            <View style={estilos.campo}>
              <MaterialIcons
                name="face"
                size={20}
                color={Cores.border2}
              />

              <TextInput
                style={estilos.input}
                placeholder="Digite seu apelido"
                placeholderTextColor={Cores.basic}
                value={apelido}
                onChangeText={setApelido}
                autoCapitalize="words"
                maxLength={40}
                accessibilityLabel="Apelido"
              />
            </View>

            {/* Data de nascimento */}
            <Text style={estilos.label}>
              Data de nascimento
            </Text>

            <View style={estilos.campo}>
              <MaterialIcons
                name="calendar-today"
                size={19}
                color={Cores.border2}
              />

              <TextInput
                style={estilos.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={Cores.basic}
                value={dataNascimento}
                onChangeText={setDataNascimento}
                keyboardType="numeric"
                maxLength={10}
                accessibilityLabel="Data de nascimento"
              />
            </View>

            <Text style={estilos.observacao}>
              O preenchimento deste campo é opcional.
            </Text>

            {/* E-mail */}
            <Text style={estilos.label}>
              E-mail da conta
            </Text>

            <View
              style={[
                estilos.campo,
                estilos.campoDesabilitado,
              ]}
            >
              <MaterialIcons
                name="mail-outline"
                size={20}
                color={Cores.border2}
              />

              <TextInput
                style={estilos.input}
                value={usuarioContexto?.email ?? ""}
                editable={false}
                placeholder="E-mail não disponível"
                placeholderTextColor={Cores.basic}
                accessibilityLabel="E-mail da conta"
              />

              <MaterialIcons
                name="lock-outline"
                size={18}
                color={Cores.basic}
              />
            </View>

            <Text style={estilos.observacao}>
              O e-mail é exibido apenas para consulta.
            </Text>
          </View>

          {/* Preferências */}
          <View style={estilos.card}>
            <View style={estilos.tituloSecao}>
              <MaterialIcons
                name="tune"
                size={23}
                color={Cores.border1}
              />

              <Text style={estilos.tituloSecaoTexto}>
                PREFERÊNCIAS
              </Text>
            </View>

            {/* Lembretes */}
            <View style={estilos.itemPreferencia}>
              <View style={estilos.iconePreferencia}>
                <MaterialIcons
                  name="notifications-none"
                  size={24}
                  color={Cores.border2}
                />
              </View>

              <View style={estilos.textoPreferencia}>
                <Text style={estilos.nomePreferencia}>
                  Lembretes diários
                </Text>

                <Text style={estilos.descricaoPreferencia}>
                  Receber lembretes para registrar seu dia.
                </Text>
              </View>

              <Switch
                value={lembretes}
                onValueChange={setLembretes}
                trackColor={{
                  false: Cores.fundo2,
                  true: Cores.border2,
                }}
                thumbColor={Cores.basic}
                accessibilityLabel="Lembretes diários"
              />
            </View>

            <View style={estilos.separador} />

            {/* Tema escuro */}
            <View style={estilos.itemPreferencia}>
              <View style={estilos.iconePreferencia}>
                <MaterialIcons
                  name="dark-mode"
                  size={24}
                  color={Cores.border2}
                />
              </View>

              <View style={estilos.textoPreferencia}>
                <Text style={estilos.nomePreferencia}>
                  Tema escuro
                </Text>

                <Text style={estilos.descricaoPreferencia}>
                  Usar a aparência escura do aplicativo.
                </Text>
              </View>

              <Switch
                value={temaEscuro}
                onValueChange={setTemaEscuro}
                trackColor={{
                  false: Cores.fundo2,
                  true: Cores.border2,
                }}
                thumbColor={Cores.basic}
                accessibilityLabel="Tema escuro"
              />
            </View>

            <View style={estilos.separador} />

            {/* Horário dos lembretes */}
            <Text style={estilos.label}>
              Horário do lembrete
            </Text>

            <View
              style={[
                estilos.campo,
                !lembretes && estilos.campoDesabilitado,
              ]}
            >
              <MaterialIcons
                name="schedule"
                size={21}
                color={Cores.border2}
              />

              <TextInput
                style={estilos.input}
                value={horario}
                onChangeText={setHorario}
                placeholder="20:00"
                placeholderTextColor={Cores.basic}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
                editable={lembretes}
                accessibilityLabel="Horário do lembrete"
              />
            </View>

            <Text style={estilos.observacao}>
              Ative os lembretes para editar o horário.
            </Text>
          </View>

          {/* Privacidade */}
          <View style={estilos.cardPrivacidade}>
            <MaterialIcons
              name="shield"
              size={27}
              color={Cores.border1}
            />

            <View style={estilos.textoPrivacidade}>
              <Text style={estilos.tituloPrivacidade}>
                Sua privacidade importa
              </Text>

              <Text style={estilos.descricaoPrivacidade}>
                Suas informações pessoais devem ser protegidas.
                Mantenha seus dados seguros e utilize o
                aplicativo de forma consciente.
              </Text>
            </View>
          </View>

          {/* Botão salvar */}
          <Pressable
            onPress={salvarAlteracoes}
            style={({ pressed }) => [
              estilos.areaBotao,
              pressed && estilos.pressionado,
            ]}
          >
            <LinearGradient
              colors={[Cores.border1, Cores.border2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={estilos.botaoSalvar}
            >
              <MaterialIcons
                name="check-circle-outline"
                size={23}
                color={Cores.fundo2}
              />

              <Text style={estilos.textoBotaoSalvar}>
                Salvar alterações
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Botão cancelar */}
          <Pressable
            onPress={cancelarEdicao}
            style={({ pressed }) => [
              estilos.botaoCancelar,
              pressed && estilos.pressionado,
            ]}
          >
            <Text style={estilos.textoBotaoCancelar}>
              Cancelar
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
    zIndex: 2,
  },

  conteudoRolagem: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    gap: 18,
  },

  // Decorações
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

  // Cabeçalho
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 2,
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

  titulo: {
    color: Cores.basic,
    fontSize: Fontes.grande1,
    fontFamily: Fontes.logo,
    textAlign: "left",
  },

  subtitulo: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    marginTop: 5,
    opacity: 0.85,
  },

  // Card da foto
  cardFoto: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Cores.cards,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Cores.border2,
    padding: 20,
    elevation: 8,
  },

  avatar: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: Cores.fundo1,
    borderWidth: 2,
    borderColor: Cores.border1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  botaoCamera: {
    position: "absolute",
    right: -4,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Cores.fundo2,
    borderWidth: 1,
    borderColor: Cores.border2,
    alignItems: "center",
    justifyContent: "center",
  },

  nomeFoto: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseBold,
  },

  descricaoFoto: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    opacity: 0.8,
    marginTop: 5,
  },

  botaoFoto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: Cores.border1,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
  },

  textoBotaoFoto: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
  },

  // Cards de informações
  card: {
    width: "100%",
    backgroundColor: Cores.cards,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Cores.border2,
    padding: 20,
    elevation: 8,
  },

  tituloSecao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 8,
  },

  tituloSecaoTexto: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseBold,
    flex: 1,
  },

  // Campos
  label: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
    marginBottom: 8,
    marginTop: 14,
  },

  campo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Cores.fundo1,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 50,
  },

  input: {
    flex: 1,
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseRegular,
    paddingVertical: 12,
  },

  campoDesabilitado: {
    opacity: 0.65,
  },

  observacao: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    opacity: 0.7,
    marginTop: 7,
    lineHeight: 18,
  },

  // Preferências
  itemPreferencia: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },

  iconePreferencia: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: Cores.fundo1,
    borderWidth: 1,
    borderColor: Cores.borderInput,
    alignItems: "center",
    justifyContent: "center",
  },

  textoPreferencia: {
    flex: 1,
  },

  nomePreferencia: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseBold,
  },

  descricaoPreferencia: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    opacity: 0.8,
    marginTop: 4,
    lineHeight: 18,
  },

  separador: {
    height: 1,
    backgroundColor: Cores.borderInput,
    marginVertical: 4,
  },

  // Privacidade
  cardPrivacidade: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: Cores.cards,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Cores.border1,
    padding: 17,
    elevation: 5,
  },

  textoPrivacidade: {
    flex: 1,
  },

  tituloPrivacidade: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseBold,
    marginBottom: 7,
  },

  descricaoPrivacidade: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.baseRegular,
    opacity: 0.85,
    lineHeight: 20,
  },

  // Botões
  areaBotao: {
    marginTop: 2,
  },

  botaoSalvar: {
    width: "100%",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  textoBotaoSalvar: {
    color: Cores.fundo2,
    fontSize: Fontes.medio2,
    fontFamily: Fontes.baseBold,
  },

  botaoCancelar: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Cores.border2,
    backgroundColor: Cores.cards,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoCancelar: {
    color: Cores.basic,
    fontSize: Fontes.medio1,
    fontFamily: Fontes.baseBold,
  },

  pressionado: {
    opacity: 0.7,
  },

  // Rodapé
  rodape: {
    color: Cores.basic,
    fontSize: Fontes.pequeno,
    fontFamily: Fontes.logo,
    textAlign: "center",
    letterSpacing: 2,
    opacity: 0.7,
    marginTop: 3,
  },
});
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@react-native-vector-icons/material-icons";

import { Cores } from "@/constants/Cores";
import { Fontes } from "@/constants/Fontes";

import { useEffect } from "react";
import { criarTabelas } from "@/services/BancoDados";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
  criarTabelas();
}, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,

        tabBarActiveTintColor: Cores.border2,
        tabBarInactiveTintColor: Cores.basic,

        tabBarStyle: {
          backgroundColor: Cores.fundo1,
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: insets.bottom || 12,
          height: 65 + (insets.bottom || 0),
        },

        tabBarLabelStyle: {
          fontFamily: Fontes.baseRegular,
          fontSize: Fontes.pequeno,
        },
      }}
    >
      {/* Registrar */}
      <Tabs.Screen
        name="registrar"
        options={{
          title: "Registrar",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="edit-note"
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* Meus registros */}
      <Tabs.Screen
        name="registros"
        options={{
          title: "Registros",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="menu-book"
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* Sobre */}
      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="info-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* Perfil */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="person-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      {/* Edição de perfil: não aparece no menu */}
<Tabs.Screen
  name="editarPerfil"
  options={{
    href: null,
  }}
/>

      {/* Visualização: não aparece no menu */}
      <Tabs.Screen
        name="visualizarRegistros"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

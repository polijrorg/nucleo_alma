import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native'; 
import { useAuth } from '~/contexts/AuthContext';
import { BottomTabs } from '../components/BottomTabs';
import { getInitials } from '~/utils/auxfunctions';
import { useRouter } from 'expo-router'; 

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(); 
      router.replace('/login'); 
    } catch (error) {
      console.error("Erro ao tentar sair:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1 bg-slate-50">
        <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24, paddingTop: 24 }}>
          
          {/* Card de identificação */}
          <View className="bg-blue-100 w-full rounded-3xl p-6 items-center border border-slate-200 mb-6 shadow-sm shadow-cyan-100">
            <View className="w-24 h-24 bg-blue-500 rounded-full justify-center items-center mb-4 shadow-md shadow-teal-200">
              <Text className="text-white font-bold text-3xl">
                {getInitials(user?.name || "Visitante")}
              </Text>
            </View>
            <Text className="text-xl font-bold text-slate-800 mb-1">
              {user?.name}
            </Text>
            <Text className="text-slate-500 text-sm mb-1">
              ID do Paciente: 
            </Text>
            <Text className="text-slate-400 text-xs">
              Membro desde 
            </Text>
          </View>

          {/* Card progresso */}
          <View className="bg-white w-full rounded-3xl p-6 border border-slate-200 mb-6 shadow-sm shadow-slate-100">
            <Text className="text-lg font-semibold text-slate-800 mb-6">
              Resumo de Progresso
            </Text>
            <View className="flex-row flex-wrap justify-between">
              
              {/* Total de sessões */}
              <View className="w-[48%] items-center mb-6">
                <Text className="text-2xl font-bold text-blue-500 mb-1">X</Text>
                <Text className="text-s text-slate-500 text-center">Total de Sessões</Text>
              </View>

              {/* Pontuação Média */}
              <View className="w-[48%] items-center mb-6">
                <Text className="text-2xl font-bold text-emerald-500 mb-1">X</Text>
                <Text className="text-s text-slate-500 text-center">Pontuação Média</Text>
              </View>

              {/* Sequência */}
              <View className="w-[48%] items-center">
                <Text className="text-2xl font-bold text-emerald-500 mb-1">X</Text>
                <Text className="text-s text-slate-500 text-center">Sequência de Dias</Text>
              </View>

              {/* Tempo Total */}
              <View className="w-[48%] items-center">
                <Text className="text-2xl font-bold text-orange-400 mb-1">X</Text>
                <Text className="text-s text-slate-500 text-center">Tempo Total</Text>
              </View>

            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={handleLogout}
            className="bg-white w-full rounded-2xl p-4 border border-slate-200 flex-row items-center shadow-sm shadow-slate-100"
          >
            <View className="w-10 h-10 bg-cyan-50 rounded-full items-center justify-center mr-4">
              <LogOut size={22} color="#06b6d4" /> 
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-slate-800">
                Sair
              </Text>
              <Text className="text-xs text-slate-500">
                Sair com segurança da sua conta
              </Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
      <BottomTabs activeTab="profile" />
    </SafeAreaView>
  );
}
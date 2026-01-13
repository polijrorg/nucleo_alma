import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Activity, TrendingUp } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '~/contexts/AuthContext';
import { BottomTabs } from '../components/BottomTabs';
import { getInitials } from '~/utils/auxfunctions';

export default function Home() {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : "Visitante";

  // Estado para guardar o vídeo temporariamente 
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const handleRecordMovement = async () => {
    try {
      // Pede permissão de câmera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          "Permissão Negada", 
          "Precisamos de acesso à câmera para gravar seus movimentos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true, 
        quality: 1,
        videoMaxDuration: 60, 
      });

      if (!result.canceled) {
        const recordedVideo = result.assets[0].uri;
        console.log("Vídeo salvo em:", recordedVideo);
        setVideoUri(recordedVideo);
        
        Alert.alert("Sucesso", "Gravação realizada com sucesso!");
        // Falta o back para salvar no banco ou enviar para a API
      }

    } catch (error) {
      console.error("Erro ao abrir câmera:", error);
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1 bg-slate-50">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Cabeçalho */}
          <View className="px-6 pt-6 mb-8 flex-row justify-between items-center">
            {/* Nome */}
            <View className="flex-1 mr-4">
              <Text className="text-2xl font-bold text-slate-800" numberOfLines={1}>
                Bom dia, <Text className="text-slate-800">{firstName}</Text>
              </Text>
              <Text className="text-slate-500 text-sm mt-1">
                Acompanhe seu progresso de reabilitação
              </Text>
            </View>

            {/* Avatar */}
            <View className="w-12 h-12 bg-blue-500 rounded-full justify-center items-center shadow-sm shadow-teal-200">
              <Text className="text-white font-bold text-lg">
                {getInitials(user?.name || "")}
              </Text>
            </View>
          </View>

          {/* Estatísticas */}
          <View className="flex-row justify-between px-6 mb-8">
            {/* Card 1 */}
            <View className="w-[22%] aspect-square bg-blue-50 rounded-2xl justify-center items-center border border-slate-200">
              <Text className="text-xl font-bold text-slate-800 mb-1">2</Text>
              <Text className="text-xs text-slate-800 font-medium">Hoje</Text>
            </View>

            {/* Card 2 */}
            <View className="w-[22%] aspect-square bg-emerald-50 rounded-2xl justify-center items-center border border-slate-200">
              <Text className="text-xl font-bold text-slate-800 mb-1">86%</Text>
              <Text className="text-xs text-slate-800 font-medium">Pontuação</Text>
            </View>

            {/* Card 3 */}
            <View className="w-[22%] aspect-square bg-orange-50 rounded-2xl justify-center items-center border border-slate-200">
              <Text className="text-xl font-bold text-slate-800 mb-1">7</Text>
              <Text className="text-xs text-slate-800 font-medium">Dias</Text>
            </View>

            {/* Card 4 */}
            <View className="w-[22%] aspect-square bg-slate-100 rounded-2xl justify-center items-center border border-slate-200">
              <Text className="text-xl font-bold text-slate-800 mb-1">45m</Text>
              <Text className="text-xs text-slate-800 font-medium">Tempo</Text>
            </View>
          </View>

          {/* Câmera */}
          <View className="justify-center items-center px-6 mb-8">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleRecordMovement}
              className="bg-blue-500 flex-row items-center justify-center py-4 w-full rounded-xl shadow-lg shadow-teal-100"
            >
              <Camera size={24} color="white" style={{ marginRight: 10 }} />
              <Text className="text-white font-bold text-base">
                Iniciar Nova Gravação de Movimento
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mapa de mobilidade */}
          <View className="px-6 mb-8">
            <View className="bg-white border border-slate-200 items-center px-6 py-6 rounded-xl shadow-sm shadow-slate-200">
              <View className="flex-row items-center mb-4">
                <Activity size={24} color="blue" style={{ marginRight: 10 }} />
                <Text className="text-lg font-semibold text-slate-800">
                  Mapa de Mobilidade Corporal
                </Text>
              </View>
              <View className="w-full h-48 bg-slate-100 rounded-xl justify-center items-center">
                <Text className="text-slate-400">[Mapa de Mobilidade]</Text>
              </View>
            </View>
          </View>

          {/* Evolução dos movimentos */}
          <View className="px-6 mb-8">
            <View className="bg-white border border-slate-200 items-center px-6 py-6 rounded-xl shadow-sm shadow-slate-200">
              <View className="flex-row items-center mb-4">
                <TrendingUp size={24} color="blue" style={{ marginRight: 10 }} />
                <Text className="text-lg font-semibold text-slate-800">
                  Evolução dos Movimentos
                </Text>
              </View>
              <View className="w-full h-20 bg-slate-100 rounded-xl px-6 py-4 mb-4">
                <View className="flex-row justify-between">
                  <View className="flex-col justify-between">
                    <Text className="text-slate-800 font-bold">(Movimento)</Text>
                    <Text className="text-slate-500 text-sm mt-1">X sessões</Text>
                  </View>
                  <Text className="text-lime-500 font-bold text-2xl">X%</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomTabs activeTab="home" />
    </SafeAreaView>
  );
}
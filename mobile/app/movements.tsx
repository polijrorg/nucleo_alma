import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'; 

export default function MovementSelection() {
  const [videoUri, setVideoUri] = useState<string | null>(null);

const handleRecordMovement = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permissão Negada", "Precisamos de acesso à câmera.");
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
        
        Alert.alert("Sucesso", "Gravação realizada!");
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
      <View className="flex-1 bg-slate-50">
        <View className="flex-row items-center px-6 pt-6 mb-4">
        <TouchableOpacity onPress={() => router.push('/')}>
          <ArrowLeft size={24} color="#334155" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-slate-800 p-6">Selecionar tipo de movimento</Text>
        </View>

        {/* Opções */}
        <View className="px-6">
          <TouchableOpacity onPress={handleRecordMovement}>
            <View className="bg-white rounded-lg p-6 mb-6 border border-slate-200 shadow-sm shadow-slate-100">
              <Text className="text-lg font-medium text-slate-800">Amplitude do ombro</Text>
              <Text className="text-slate-500 mt-1">Exercícios de amplitude de movimento para reabilitação do ombro</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRecordMovement}>
            <View className="bg-white rounded-lg p-6 mb-6 border border-slate-200 shadow-sm shadow-slate-100">
              <Text className="text-lg font-medium text-slate-800">Flexão do joelho</Text>
              <Text className="text-slate-500 mt-1">Exercícios de dobramento e extensão do joelho</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRecordMovement}>
            <View className="bg-white rounded-lg p-6 mb-6 border border-slate-200 shadow-sm shadow-slate-100">
              <Text className="text-lg font-medium text-slate-800">Mobilidade do tornozelo</Text>
              <Text className="text-slate-500 mt-1">Exercícios de rotação e flexão do tornozelo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRecordMovement}>
            <View className="bg-white rounded-lg p-6 mb-6 border border-slate-200 shadow-sm shadow-slate-100">
              <Text className="text-lg font-medium text-slate-800">Extensão do quadril</Text>
              <Text className="text-slate-500 mt-1">Exercícios de movimento e fortalecimento do quadril</Text>
            </View>
          </TouchableOpacity>

          </View>

      

        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
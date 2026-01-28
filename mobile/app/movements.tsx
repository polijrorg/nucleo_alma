import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search } from 'lucide-react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

const MOVEMENTS_DATA = [
  { title: "Cabeça e Coluna Cervical", description: "Flexão, extensão, inclinação, rotação, protação ou retração cervical" },
  { title: "Tronco e Coluna Toracolombar", description: "Flexão, extensão, inclinação e rotação do tronco, dissociação tronco-pelve, anterversão ou retroversão pélvica" },
  { title: "Articulação do Ombro (Glenoumeral)", description: "Flexão, extensão, abdução, adução, rotação interna e externa do ombro" },
  { title: "Escapulotorácico", description: "Elevação, depressão, protação, retração, rotação superior e inferior da escápula" },
  { title: "Cotovelo e Antebraço", description: "Flexão e extensão do cotovelo, pronação e supinação do antebraço" },
  { title: "Punho e mão", description: "Flexão e extensão do punho, desvio radial e ulnar, flexão e extensão dos dedos, oposição do polegar, pinça" },
  { title: "Quadril", description: "Flexão, extensão, rotação interna e externa, abdução, adução e circundução do quadril" },
  { title: "Joelho", description: "Flexão, extensão, valgo e varo dinâmico do joelho rotação interna e externa da tíbia" },
  { title: "Articulação Talocrural", description: "Dorsiflexão e flexão plantar do tornozelo" },
  { title: "Pé", description: "Inversão, eversão, pronação e supinação do pé, apoio do retropé, mediopé e antepé, controle do arco plantar, flexão e extensão dos dedos" },
  { title: "Padrões Funcionais Globais", description: "Agachamento, afundo, corrida, salto, subida e descida de degrau" },
  { title: "Movimentos em Atividades da Vida Diária", description: "Caminhadas, pegar objeto no solo ou elevar acima da cabeça, carregar carga, levantar-se do chão" },
  { title: "Movimentos Esportivos", description: "Aceleração e desaceleração, chute e gesto de arremesso, saltos e aterrisagens" },
];

export default function MovementSelection() {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredMovements = MOVEMENTS_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1 bg-slate-50">
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

          {/* Cabeçalho */}
          <View className="px-6 pt-6 mb-2">
            <View className="flex-row items-center mb-4">
              <TouchableOpacity onPress={() => router.push('/')}>
                <ArrowLeft size={24} color="#334155" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-slate-800 ml-4">Selecionar movimento</Text>
            </View>

            {/* Barra de Pesquisa */}
            <View className="flex-row items-center bg-white border border-slate-200 rounded-lg px-4 h-12 mb-4 shadow-sm">
                <Search size={20} color="#94a3b8" />
                <TextInput 
                    className="flex-1 ml-3 text-slate-700 text-base"
                    placeholder="Buscar movimento..."
                    placeholderTextColor="#94a3b8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
          </View>

          {/* Opções de Movimentos */}
          <View className="px-6">
            {filteredMovements.length > 0 ? (
                filteredMovements.map((movement, index) => (
                    <TouchableOpacity key={index} onPress={handleRecordMovement}>
                        <View className="bg-white rounded-lg p-6 mb-4 border border-slate-200 shadow-sm shadow-slate-100">
                        <Text className="text-lg font-medium text-slate-800">{movement.title}</Text>
                        <Text className="text-slate-500 mt-1">{movement.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <View className="items-center justify-center py-10">
                    <Text className="text-slate-400 text-center">Nenhum movimento encontrado para "{searchQuery}"</Text>
                </View>
            )}
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
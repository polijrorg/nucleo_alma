import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, PlayCircle, Camera, Image as ImageIcon, CheckCircle, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { dadosDosMovimentos } from '../constants/dadosMovimentos';

export default function VideoScreen() {
  const router = useRouter();
  const { categoria } = useLocalSearchParams();
  const conteudoAtual = dadosDosMovimentos[categoria as keyof typeof dadosDosMovimentos];
  const [selectedVideos, setSelectedVideos] = useState<Record<number, string>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMovementId, setCurrentMovementId] = useState<number | null>(null);

  if (!conteudoAtual) return null;

  // Verifica se todos os movimentos já têm vídeo
  const totalMovimentos = conteudoAtual.movimentos.length;
  const videosGravados = Object.keys(selectedVideos).length;
  const isReadyToSend = videosGravados === totalMovimentos && totalMovimentos > 0;

  const handleOpenOptions = (id: number) => {
    setCurrentMovementId(id);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentMovementId(null);
  };

  // Seleção de mídia
  const saveVideo = (uri: string) => {
    if (currentMovementId) {
      setSelectedVideos(prev => ({
        ...prev,
        [currentMovementId]: uri
      }));
      handleCloseModal();
    }
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permission.status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para gravar o movimento.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled) {
      saveVideo(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled) {
      saveVideo(result.assets[0].uri);
    }
  };

  // Função final de envio
  const handleSendAll = () => {
    if (!isReadyToSend) return;
    
    // Faltam as rotas reais
    console.log("Enviando vídeos:", selectedVideos);
    Alert.alert("Sucesso!", "Todos os vídeos foram enviados para análise.");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Cabeçalho */}
      <View className="px-6 pt-4 pb-4 bg-white border-b border-slate-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft size={24} color="#334155" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800 ml-2 flex-1">
            {conteudoAtual.titulo}
          </Text>
        </View>
        <Text className="text-slate-500 mt-2 text-sm">
          {videosGravados} de {totalMovimentos} vídeos adicionados.
        </Text>
      </View>

      {/*Lista de cards*/}
      <FlatList
        data={conteudoAtual.movimentos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }} 
        renderItem={({ item }) => {
          const hasVideo = !!selectedVideos[item.id];

          return (
            <TouchableOpacity 
              className={`rounded-xl mb-4 border shadow-sm overflow-hidden flex-row p-4 items-center 
                ${hasVideo ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}
              onPress={() => handleOpenOptions(item.id)}
            >
              {/* Placeholder ou Check */}
              <View className={`w-24 h-16 rounded-lg justify-center items-center mr-4 
                ${hasVideo ? 'bg-green-500' : 'bg-slate-800'}`}>
                 {hasVideo ? (
                    <CheckCircle size={28} color="white" />
                 ) : (
                    <PlayCircle size={24} color="white" fill="#ffffff50" />
                 )}
              </View>

              {/* Status de envio */}
              <View className="flex-1">
                <Text className="text-slate-800 font-semibold text-base mb-1">
                  {item.nome}
                </Text>
                <Text className={`${hasVideo ? 'text-green-600' : 'text-blue-500'} text-xs font-bold`}>
                  {hasVideo ? 'VÍDEO PRONTO' : 'Toque para adicionar'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Botão "Enviar Todos" */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100">
        <TouchableOpacity 
          onPress={handleSendAll}
          disabled={!isReadyToSend}
          className={`h-14 rounded-xl flex-row justify-center items-center shadow-sm
            ${isReadyToSend ? 'bg-blue-600 shadow-blue-200' : 'bg-slate-200'}`}
        >
          <Text className={`font-bold text-lg ${isReadyToSend ? 'text-white' : 'text-slate-400'}`}>
            Enviar Todos ({videosGravados}/{totalMovimentos})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pop-Up */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal} 
        statusBarTranslucent={true}      
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View className="flex-1 justify-end bg-black/60">
            <View className="bg-zinc-900 rounded-t-3xl p-6 pb-10">
              
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-lg font-bold">Adicionar Vídeo</Text>
                <TouchableOpacity onPress={handleCloseModal} className="bg-zinc-800 p-2 rounded-full">
                  <X size={20} color="#A1A1AA" />
                </TouchableOpacity>
              </View>

              {/* Opções */}
              <View className="gap-3">
                
                {/* Câmera */}
                <TouchableOpacity 
                  onPress={pickFromCamera}
                  className="bg-zinc-800 p-4 rounded-xl flex-row items-center"
                >
                  <View className="w-10 h-10 rounded-full bg-blue-600/20 items-center justify-center mr-4">
                    <Camera size={24} color="#60A5FA" />
                  </View>
                  <Text className="text-white text-base font-medium">Gravar com Câmera</Text>
                </TouchableOpacity>

                {/* Galeria */}
                <TouchableOpacity 
                  onPress={pickFromGallery}
                  className="bg-zinc-800 p-4 rounded-xl flex-row items-center"
                >
                  <View className="w-10 h-10 rounded-full bg-purple-600/20 items-center justify-center mr-4">
                    <ImageIcon size={24} color="#C084FC" />
                  </View>
                  <Text className="text-white text-base font-medium">Escolher da Galeria</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
}
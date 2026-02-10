import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search } from 'lucide-react-native'; 
import { router } from 'expo-router';

const MOVEMENTS_DATA = [
  { title: "Cabeça e Pescoço", slug: "cabeca_pescoco" },
  { title: "Tronco e Lombar", slug: "tronco_lombar" },
  { title: "Ombro", slug: "ombro" },
  { title: "Escápula", slug: "escapula" },
  { title: "Cotovelo e Antebraço", slug: "cotovelo_antebraco" },
  { title: "Punho e mão", slug: "punho_mao" },
  { title: "Quadril", slug: "quadril" },
  { title: "Joelho", slug: "joelho" },
  { title: "Tornozelo", slug: "artic_talocrural" },
  { title: "Pé", slug: "pe" },
  { title: "Movimentos Integrados", slug: "mov_integrados" },
  { title: "Movimentos do Cotidiano", slug: "mov_cotidiano" },
  { title: "Movimentos Esportivos", slug: "mov_esportivos" },
];

export default function MovementSelection() {
  const [searchQuery, setSearchQuery] = useState('');

 const handleSelectCategory = (categorySlug: string) => {
    router.push(`/video-screen?categoria=${categorySlug}`);
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
              <TouchableOpacity onPress={() => router.back()}>
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
                    <TouchableOpacity 
                      key={index} 
                      onPress={() => handleSelectCategory(movement.slug)} 
                    >
                        <View className="bg-white rounded-lg p-6 mb-4 border border-slate-200 shadow-sm shadow-slate-100">
                          <Text className="text-lg font-medium text-slate-800">{movement.title}</Text>
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
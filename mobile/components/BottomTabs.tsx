import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrendingUp, User } from 'lucide-react-native';
import { useRouter } from 'expo-router'; 

interface BottomTabsProps {
  activeTab: 'home' | 'profile'; 
}

export function BottomTabs({ activeTab }: BottomTabsProps) {
  const router = useRouter(); 
  
  const getIconColor = (tabName: string) => activeTab === tabName ? "#0d9488" : "#64748b"; 
  const getTextColor = (tabName: string) => activeTab === tabName ? "text-teal-600" : "text-slate-500";
  const getFontWeight = (tabName: string) => activeTab === tabName ? "font-bold" : "font-medium";

  const handleNavigation = (route: string) => {
    router.push(route as any); 
  };

  return (
    <View className="w-full bg-white border border-slate-200 flex-row py-3 pb-6">
        
      {/* Início */}
      <TouchableOpacity 
        className="flex-1 items-center justify-center"
        onPress={() => handleNavigation('/')} 
      >
        <TrendingUp size={28} color={getIconColor('home')} />
        <Text className={`${getTextColor('home')} text-xs ${getFontWeight('home')} mt-1`}>
          Início
        </Text>
      </TouchableOpacity>

      {/* Perfil */}
      <TouchableOpacity 
        className="flex-1 items-center justify-center"
        onPress={() => handleNavigation('/profile')} 
      >
        <User size={28} color={getIconColor('profile')} />
        <Text className={`${getTextColor('profile')} text-xs ${getFontWeight('profile')} mt-1`}>
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}
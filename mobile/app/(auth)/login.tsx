import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, Image } from "react-native";
import { useAuth } from "~/contexts/AuthContext";
import { Activity, Mail, Lock, ArrowRight } from "lucide-react-native"; 
import { router } from 'expo-router';

export default function LoginScreen() {
  const { signIn, isLoading: authLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    const result = await signIn(email, password);
    
    if (!result.success) {
      Alert.alert("Falha no Login", result.error || "Ocorreu um erro");
    }
    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#0d9488" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 justify-center px-4">
      <View className="items-center mb-8">
        <View className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl justify-center items-center shadow-lg mb-4">
           <Activity size={40} color="white" />
        </View>

        <Text className="text-3xl font-bold text-slate-800">
          MoviCare
        </Text>
        <Text className="text-slate-500 mt-1 text-center">
          Sua jornada de reabilitação começa aqui
        </Text>
      </View>

      {/* Card de Login */}
      <View className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-300">
        
        <View className="items-center mb-6">
          <Text className="text-xl font-bold text-slate-800">Entrar</Text>
          <Text className="text-slate-400 text-sm mt-1">Acesse sua conta para continuar</Text>
        </View>

        {/* Seção do Email */}
        <View className="mb-4">
          <Text className="text-slate-700 font-medium mb-2 ml-1">Email</Text>
          <View className="flex-row items-center border border-slate-200 rounded-xl px-4 py-3 bg-white focus:border-teal-500">
            <Mail size={20} color="#94a3b8" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="seu@email.com"
              placeholderTextColor="#cbd5e1"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 text-slate-700 text-base"
            />
          </View>
        </View>

        {/* Seção para Senha */}
        <View className="mb-6">
          <Text className="text-slate-700 font-medium mb-2 ml-1">Senha</Text>
          <View className="flex-row items-center border border-slate-200 rounded-xl px-4 py-3 bg-white focus:border-teal-500">
            <Lock size={20} color="#94a3b8" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#cbd5e1"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="flex-1 text-slate-700 text-base"
            />
          </View>
        </View>

        <View className="mb-4 flex-row justify-end">
          <TouchableOpacity onPress={() => router.push('/(auth)/recuperar-senha')}>
            <Text className="text-teal-500 font-medium">Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          className={`flex-row justify-center items-center py-4 rounded-xl mb-6 ${
            isLoading ? "bg-teal-300" : "bg-gradient-to-r from-blue-500 to-green-600"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white font-bold text-lg mr-2">Entrar</Text>
              <ArrowRight size={20} color="white" strokeWidth={3} />
            </>
          )}
        </TouchableOpacity>

        {/* Direcionamento para o cadastro */}
        <View className="flex-row justify-center mt-2">
          <Text className="text-slate-500">Não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/cadastro')}> 
           <Text className="text-teal-500 font-bold">Cadastre-se</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
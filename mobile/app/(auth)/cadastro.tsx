import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "~/contexts/AuthContext";
import { Activity, Mail, Lock, User, ArrowRight } from "lucide-react-native";
import { router } from 'expo-router'; 

export default function SignUpScreen() {
  const { signUp, isLoading: authLoading } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    
    const result = await signUp(name, email, password);
    
    if (!result.success) {
      Alert.alert("Erro no Cadastro", result.error || "Ocorreu um erro ao criar a conta");
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-teal-500 rounded-2xl justify-center items-center shadow-lg mb-4">
             <Activity size={40} color="white" />
          </View>

          <Text className="text-3xl font-bold text-slate-800">
            MoviCare
          </Text>
          <Text className="text-slate-500 mt-1 text-center">
            Sua jornada de reabilitação começa aqui
          </Text>
        </View>

        {/* Card de Cadastro */}
        <View className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-300">
          
          <View className="items-center mb-6">
            <Text className="text-xl font-bold text-slate-800">Criar Conta</Text>
            <Text className="text-slate-400 text-sm mt-1 text-center">
              Cadastre-se para começar sua reabilitação
            </Text>
          </View>

          {/* Seção do Nome */}
          <View className="mb-4">
            <Text className="text-slate-700 font-medium mb-2 ml-1">Nome</Text>
            <View className="flex-row items-center border border-slate-200 rounded-xl px-4 py-3 bg-white focus:border-teal-500">
              <User size={20} color="#94a3b8" style={{ marginRight: 10 }} />
              <TextInput
                placeholder="Seu nome completo"
                placeholderTextColor="#cbd5e1"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                className="flex-1 text-slate-700 text-base"
              />
            </View>
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

          {/* Botão Criar Conta */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className={`flex-row justify-center items-center py-4 rounded-xl mb-6 ${
              isLoading ? "bg-teal-300" : "bg-blue-500"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">Criar Conta</Text>
                <ArrowRight size={20} color="white" strokeWidth={3} />
              </>
            )}
          </TouchableOpacity>

          {/* Direcionamento para o login */}
          <View className="flex-row justify-center mt-2">
            <Text className="text-slate-500">Já tem conta? </Text>
            <TouchableOpacity onPress={() => router.back()}>
     <Text className="text-teal-600 font-bold">Entre</Text>
  </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Activity, Mail, ArrowRight } from "lucide-react-native";
import { router } from 'expo-router'; 
import { useAuth } from "~/contexts/AuthContext";

export default function RecoverPasswordScreen() {
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRecoverPassword = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, digite seu email cadastrado.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(email);
      
      if (result?.success) {
        Alert.alert(
          "Email Enviado", 
          "Verifique sua caixa de entrada para redefinir a senha.",
          [{ text: "OK", onPress: () => router.back() }]
        );
      } else {
        Alert.alert("Erro", result?.error || "Não foi possível enviar o email.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Cabeçalho / Logo */}
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

        {/* Card de Recuperação */}
        <View className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-300">
          
          <View className="items-center mb-6">
            <Text className="text-xl font-bold text-slate-800">Recuperar Senha</Text>
            <Text className="text-slate-400 text-sm mt-1 text-center">
              Enviaremos um link para redefinir sua senha
            </Text>
          </View>

          {/* Input de Email */}
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

          {/* Botão de Enviar */}
          <TouchableOpacity
            onPress={handleRecoverPassword}
            disabled={isLoading}
            className={`flex-row justify-center items-center py-4 rounded-xl mb-6 ${
              isLoading ? "bg-teal-300" : "bg-blue-500"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">
                    Enviar email
                </Text>
                <ArrowRight size={20} color="white" strokeWidth={3} />
              </>
            )}
          </TouchableOpacity>

          {/* Botão Voltar */}
          <View className="flex-row justify-center mt-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-teal-600 font-bold">Voltar para o login</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
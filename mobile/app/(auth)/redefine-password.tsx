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

        {/* Card de Redefinir Senha */}
        <View className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-300">
          
          <View className="items-center mb-6">
            <Text className="text-xl font-bold text-slate-800">Redefinir senha</Text>
            <Text className="text-slate-400 text-sm mt-1 text-center">
              Preencha com a sua nova senha
            </Text>
          </View>

          {/* Seção para Nova Senha */}
          <View className="mb-6">
            <Text className="text-slate-700 font-medium mb-2 ml-1">Nova senha</Text>
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

          {/* Confirmar Nova Senha */}
          <View className="mb-6">
            <Text className="text-slate-700 font-medium mb-2 ml-1">Confirmar nova senha</Text>
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

          {/* Botão Atualizar Senha */}
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
                <Text className="text-white font-bold text-lg mr-2">Atualizar senha</Text>
                <ArrowRight size={20} color="white" strokeWidth={3} />
              </>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
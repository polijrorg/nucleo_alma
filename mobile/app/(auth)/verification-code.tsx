import { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import { Activity, Mail, ArrowRight, KeyRound } from "lucide-react-native";
import { router } from 'expo-router'; 

export default function VerificationCodeScreen() {
  const [code, setCode] = useState("");

  const inputRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-slate-50"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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

        {/* Card de Verificação */}
        <View className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-300">
          
          <View className="items-center mb-6">
            <Text className="text-xl font-bold text-slate-800">Verificar código</Text>
            <Text className="text-slate-500 text-sm mt-1 text-center">
              Digite o código de 6 dígitos enviado para seu email
            </Text>
          </View>

          <View className="items-center mb-6">
          <View className="w-20 h-20 bg-cyan-50 rounded-full items-center justify-center">
              <KeyRound size={40} color="#06b6d4" /> 
            </View>
            <Text className="text-slate-500 text-sm mt-4 text-center px-4">
              Enviamos um código para:
            </Text>
            <Text className="text-slate-800 font-medium mt-1 text-center">
              voce
            </Text>
          </View>
      
        {/* Input do código */}
        <View className="w-full">
            <Pressable 
              className="relative w-full h-14" 
              onPress={() => inputRef.current?.focus()}
            >
              
              <TextInput
                ref={inputRef} 
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                caretHidden={true} 
                className="absolute w-full h-full opacity-0 z-20" 
              />

              <View className="flex-row w-full h-full border border-slate-300 rounded-xl overflow-hidden divide-x divide-slate-300 bg-white pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <View 
                    key={index} 
                    className={`flex-1 justify-center items-center ${
                      code[index] ? "bg-slate-50" : "bg-white"
                    }`}
                  >
                    <Text className="text-xl font-bold text-slate-800">
                      {code[index] || ""}
                    </Text>
                  </View>
                ))}
              </View>

            </Pressable>
          </View>

          {/* Botão de Verificar */}
          <View className="justify-center items-center px-6 mt-6">
          <TouchableOpacity 
            className="bg-blue-500 flex-row items-center justify-center py-4 w-full rounded-xl"
            onPress={() => {
              if (code.length === 6) {
                router.push("/(auth)/redefine-password");
              } else {
                Alert.alert("Código inválido", "Por favor, insira um código de 6 dígitos.");
              }
            }}
          >
            <Text className="text-white font-bold text-center">Verificar Código</Text>
            <ArrowRight  size={24} color="white" style={{ marginLeft: 10 }}/> 
          </TouchableOpacity>
          </View>

          {/* Botão Reenviar Código */}
          <View className="flex-row justify-center mt-6">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-teal-600 font-bold">Reenviar Código</Text>
            </TouchableOpacity>
          </View>

          {/* Botão Voltar */}
          <View className="flex-row justify-center mt-6">
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text className="text-teal-600 font-bold">Voltar para o login</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
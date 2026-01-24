import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Smartphone, Lightbulb, CirclePlay } from 'lucide-react-native'; 
import { router } from 'expo-router'; 

const { width } = Dimensions.get('window');

const STEPS = [
  {
    id: '1',
    title: 'Bem-vindo ao Tutorial!',
    description: 'Vamos te ensinar como gravar seus movimentos de forma perfeita para obter os melhores resultados na sua reabilitação.',
    tips: ['3 passos simples', 'Dicas de posicionamento', 'Configuração ideal'], 
    icon: Camera
  },
  {
    id: '2',
    title: 'Posicione seu Telefone',
    description: 'O posicionamento correto é fundamental para um rastreamento preciso dos seus movimentos.',
    tips: ['Distância: 3-4 pés do corpo', 'Altura: Na altura do peito', 'Use um tripé ou apoio estável'], 
    icon: Smartphone
  },
  {
    id: '3',
    title: 'Verifique a Iluminação',
    description: 'Uma boa iluminação garante que seus movimentos sejam rastreados com precisão.',
    tips: ['Prefira luz natural', 'Evite contraluz', 'Remova obstáculos da vista'], 
    icon: Lightbulb
  },
  {
    id: '4',
    title: 'Pronto para Começar!',
    description: 'Você está preparado para gravar seus movimentos e acompanhar seu progresso.',
    tips: ['Mantenha-se relaxado', 'Complete a amplitude do movimento', 'Você pode regravar se necessário'], 
    icon: CirclePlay
  },
];

interface Props {
  navigation: any;
}

export default function TutorialScreen({ navigation }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentStep + 1 });
    } else {
      router.push('/movements'); 
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      flatListRef.current?.scrollToIndex({ index: currentStep - 1 });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentStep(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: { item: typeof STEPS[0] }) => {
    const IconComponent = item.icon; 

    return (
      <View style={styles.slide}>
        <View style={styles.imagePlaceholder}>
          <IconComponent size={60} color="#3b82f6" /> 
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.card}>
          {item.tips.map((tip, index) => (
            <Text key={index} style={styles.tipText}>✓ {tip}</Text>
          ))}
        </View>
      </View>
    );
  };

const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tutorial de Gravação</Text>
        
        <TouchableOpacity onPress={() => router.push('/movements')}> 
          <Text style={styles.navText}>Pular</Text>
        </TouchableOpacity>
      </View>

      {/* Bolinhas */}
      <View style={styles.dotsContainer}>
        {STEPS.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              { backgroundColor: index === currentStep ? '#3b82f6' : '#E0E0E0' }
            ]} 
          />
        ))}
      </View>

      {/* Carrossel */}
      <FlatList
        ref={flatListRef}
        data={STEPS}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}        
        scrollEventThrottle={32}
      />

  <View style={styles.footer}>
  <View style={styles.buttonRow}>
    
    {/* Botão Voltar */}
    {currentStep > 0 && (
       <TouchableOpacity onPress={handleBack} style={styles.btnSecondary}>
         <Text style={styles.btnSecondaryText}>Voltar</Text>
       </TouchableOpacity>
    )}
    
    {/* Botão Próximo / Começar */}
    <TouchableOpacity onPress={handleNext} style={styles.btnPrimary}>
      <Text style={styles.btnPrimaryText}>
        {currentStep === STEPS.length - 1 ? 'Começar' : 'Próximo →'}
      </Text>
    </TouchableOpacity>

  </View>
  
  <Text style={styles.stepCounter}>
    Passo {currentStep + 1} de {STEPS.length}
  </Text>
</View>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { fontWeight: 'bold', fontSize: 18, color: '#333' },
  navText: { color: '#666', fontSize: 16 },
  
  slide: { width: width, padding: 20, alignItems: 'center' },
  imagePlaceholder: { width: 100, height: 100, backgroundColor: '#E0F2F1', borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30, paddingHorizontal: 10 },
  
  card: { backgroundColor: '#F5F9F8', padding: 20, borderRadius: 15, width: '100%' },
  tipText: { fontSize: 15, color: '#555', marginBottom: 10 },

  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },

  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  buttonRow: { flexDirection: 'row', gap: 15 },
  btnPrimary: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, flex: 1, alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnSecondary: { backgroundColor: '#fff', padding: 16, borderRadius: 12, flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd' },
  btnSecondaryText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  
  stepCounter: { textAlign: 'center', marginTop: 15, color: '#999', fontSize: 12 }
});
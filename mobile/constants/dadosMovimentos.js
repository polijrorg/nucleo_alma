{/* Dados otimizados para a video-screen */}

export const dadosDosMovimentos = {

// 1. Cabeça e Pescoço
  cabeca_pescoco: {
    titulo: "Cabeça e Pescoço",
    movimentos: [
      { id: 1, nome: "Olhar para baixo (Flexão)" }, 
      { id: 2, nome: "Olhar para cima (Extensão)" }, 
      { id: 3, nome: "Inclinar a cabeça (Direita/Esquerda)" }, 
      { id: 4, nome: "Girar a cabeça (Rotação)" }, 
      { id: 5, nome: "Queixo para frente (Protração)" }, 
      { id: 6, nome: "Queixo para dentro (Retração)" },
    ]
  },

  // 2. Tronco e Lombar
  tronco_lombar: {
    titulo: "Tronco e Lombar",
    movimentos: [
      { id: 1, nome: "Dobrar tronco para frente (Flexão)" }, 
      { id: 2, nome: "Inclinar tronco para trás (Extensão)" }, 
      { id: 3, nome: "Inclinar para os lados" }, 
      { id: 4, nome: "Girar o tronco (Rotação)" },
      { id: 5, nome: "Empinar o quadril (Anteversão)" },
      { id: 6, nome: "Encaixar o quadril (Retroversão)" }, 
      { id: 7, nome: "Dissociação tronco-pelve3" },
    ]
  },

  // 3. Ombro 
  ombro: {
    titulo: "Ombro",
    movimentos: [
      { id: 1, nome: "Levantar braço para frente (Flexão)" }, 
      { id: 2, nome: "Levar braço para trás (Extensão)" }, 
      { id: 3, nome: "Abrir o braço (Abdução)" }, 
      { id: 4, nome: "Fechar o braço (Adução)" }, 
      { id: 5, nome: "Mão nas costas (Rotação Interna)" }, 
      { id: 6, nome: "Mão na nuca (Rotação Externa)" },
    ]
  },

  // 4. Escápula 
  escapula: {
    titulo: "Escápula",
    movimentos: [
      { id: 1, nome: "Encolher os ombros (Elevação)" }, 
      { id: 2, nome: "Baixar os ombros (Depressão)" }, 
      { id: 3, nome: "Ombros para frente (Protração)" }, 
      { id: 4, nome: "Estufar o peito (Retração)" },
      { id: 5, nome: "Rotação superior" },
      { id: 6, nome: "Rotação inferior" },
    ]
  },

  // 5. Cotovelo e Antebraço 
  cotovelo_antebraco: {
    titulo: "Cotovelo e Antebraço",
    movimentos: [
      { id: 1, nome: "Dobrar o cotovelo (Flexão)" }, 
      { id: 2, nome: "Esticar o cotovelo (Extensão)" }, 
      { id: 3, nome: "Palma da mão para baixo (Pronação)" }, 
      { id: 4, nome: "Palma da mão para cima (Supinação)" }, 
    ]
  },

  // 6. Punho e Mão 
  punho_mao: {
    titulo: "Punho e Mão",
    movimentos: [
      { id: 1, nome: "Dobrar punho para baixo (Flexão)" }, 
      { id: 2, nome: "Dobrar punho para cima (Extensão)" }, 
      { id: 3, nome: "Desvios laterais" },
      { id: 4, nome: "Fechar a mão (Flexão dedos)" }, 
      { id: 5, nome: "Abrir a mão (Extensão dedos)" }, 
      { id: 6, nome: "Movimento de pinça" }, 
      { id: 7, nome: "Oposição do polegar" }, 
    ]
  },

  // 7. Quadril 
  quadril: {
    titulo: "Quadril",
    movimentos: [
      { id: 1, nome: "Joelho no peito (Flexão)" }, 
      { id: 2, nome: "Perna para trás (Extensão)" }, 
      { id: 3, nome: "Abrir a perna (Abdução)" }, 
      { id: 4, nome: "Fechar a perna (Adução)" }, 
      { id: 5, nome: "Rotação Interna" }, 
      { id: 6, nome: "Rotação Externa" }, 
      { id: 7, nome: "Circundação" }, 
    ]
  },

  // 8. Joelho 
  joelho: {
    titulo: "Joelho",
    movimentos: [
      { id: 1, nome: "Dobrar o joelho (Flexão)" }, 
      { id: 2, nome: "Esticar o joelho (Extensão)" }, 
      { id: 3, nome: "Agachamento" }, 
      { id: 4, nome: "Rotação interna" }, 
      { id: 5, nome: "Rotação externa" }, 
    ]
  },

  // 9. Tornozelo
  artic_talocrural: {
    titulo: "Tornozelo",
    movimentos: [
      { id: 1, nome: "Ponta do pé para cima (Dorsiflexão)" }, 
      { id: 2, nome: "Ponta do pé para baixo (Flexão Plantar)" }, 
    ]
  },

  // 10. Pé 
  pe: {
    titulo: "Pé",
    movimentos: [
      { id: 1, nome: "Virar sola para dentro (Inversão)" }, 
      { id: 2, nome: "Virar sola para fora (Eversão)" }, 
      { id: 3, nome: "Dobrar dedos do pé (Flexão)" }, 
      { id: 4, nome: "Esticar dedos do pé (Supinação)" }, 
      { id: 5, nome: "Calcanhar para dentro (Eversão)" },
      { id: 6, nome: "Calcanhar para fora (Pronação)" },
    ]
  },

  // 11. Movimentos Integrados 
  mov_integrados: {
    titulo: "Movimentos Integrados",
    movimentos: [
      { id: 1, nome: "Agachamento (Squat)" }, 
      { id: 2, nome: "Agachamento com 1 perna" }, 
      { id: 3, nome: "Afundo " }, 
      { id: 4, nome: "Sentar e Levantar" }, 
      { id: 5, nome: "Equilíbrio em 1 pé só" }, 
      { id: 6, nome: "Dobradiça do quadril" },
      { id: 7, nome: "Subir e descer degrau" },
      { id: 8, nome: "Caminhada" },
      { id: 9, nome: "Trote (Corrida)" },
      { id: 10, nome: "Salto vertical" },
      { id: 11, nome: "Salto horizontal" },
      { id: 12, nome: "Mudança de direção" },
      { id: 13, nome: "Aterrissagem (Salto)" },
      { id: 14, nome: "Equilíbrio" },
    ]
  },

  // 12. Movimentos do Cotidiano 
  mov_cotidiano: {
    titulo: "Movimentos do Cotidiano",
    movimentos: [
      { id: 1, nome: "Caminhar em linha reta" },
      { id: 2, nome: "Caminhar em linha curva" },
      { id: 3, nome: "Pegar objeto no chão" }, 
      { id: 4, nome: "Colocar objeto no alto" }, 
      { id: 5, nome: "Subir degrau/escada" }, 
      { id: 6, nome: "Levantar-se do chão" }, 
      { id: 7, nome: "Carregar carga" },
    ]
  },

  // 13. Movimentos Esportivos 
  mov_esportivos: {
    titulo: "Movimentos Esportivos",
    movimentos: [
      { id: 1, nome: "Aceleração e desaceleração" },
      { id: 2, nome: "Saltos repetidos" }, 
      { id: 3, nome: "Corrida máxima" }, 
      { id: 4, nome: "Mudança de direção rápida" }, 
      { id: 5, nome: "Chute e gestos de arremesso" },
      { id: 6, nome: "Gestos de saque/ataque" },
      { id: 7, nome: "Aterrisagem" },
      { id: 8, nome: "Controle do joelho" },
    ]
  }
};
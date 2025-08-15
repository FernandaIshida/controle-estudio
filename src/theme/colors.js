export const colors = {
  // Cores principais
  primary: '#E53E3E',        // Vermelho vibrante
  primaryDark: '#C53030',    // Vermelho escuro
  primaryLight: '#FC8181',   // Vermelho claro
  
  // Cores secundárias
  secondary: '#FF6B35',      // Laranja quente
  secondaryDark: '#E55A2B',  // Laranja escuro
  secondaryLight: '#FF8A65', // Laranja claro
  
  // Cores de acento
  accent: '#FF4757',         // Vermelho coral
  accentDark: '#E63946',     // Vermelho coral escuro
  
  // Cores de alerta
  warning: '#FF6B35',        // Laranja para alertas
  error: '#E53E3E',          // Vermelho para erros
  success: '#38A169',        // Verde para sucesso
  
  // Cores neutras
  background: '#F7FAFC',     // Fundo claro
  surface: '#FFFFFF',         // Superfícies
  card: '#FFFFFF',           // Cards
  
  // Cores de texto
  text: '#2D3748',           // Texto principal
  textSecondary: '#718096',  // Texto secundário
  textLight: '#A0AEC0',      // Texto claro
  
  // Cores de borda
  border: '#E2E8F0',         // Bordas claras
  borderDark: '#CBD5E0',     // Bordas escuras
  
  // Cores de sombra
  shadow: 'rgba(229, 62, 62, 0.1)', // Sombra vermelha sutil
  
  // Gradientes
  gradientPrimary: ['#E53E3E', '#FF6B35'],
  gradientSecondary: ['#FF6B35', '#FF8A65'],
  
  // Cores específicas para materiais
  materialCard: '#FFFFFF',
  materialCardBorder: '#FF6B35',
  materialCardShadow: 'rgba(255, 107, 53, 0.15)',
  
  // Cores para alertas de estoque
  stockLow: '#FF6B35',
  stockCritical: '#E53E3E',
  stockNormal: '#38A169',
  
  // Cores para botões
  buttonPrimary: '#E53E3E',
  buttonSecondary: '#FF6B35',
  buttonSuccess: '#38A169',
  buttonDanger: '#E53E3E',
  
  // Cores para inputs
  inputBorder: '#E2E8F0',
  inputFocus: '#FF6B35',
  inputError: '#E53E3E',
  
  // Cores para chips
  chipPrimary: '#FF6B35',
  chipSecondary: '#E53E3E',
  chipNeutral: '#A0AEC0',
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export default colors;

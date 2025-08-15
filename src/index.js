// Exportações principais
export { default as AppNavigator } from './navigation/AppNavigator';
export { MaterialProvider, useMaterialContext } from './context/MaterialContext';
export { 
  initDatabase, 
  getMateriais, 
  insertMaterial, 
  updateMaterial, 
  deleteMaterial, 
  updateQuantidade 
} from './database/database';

// Exportações das telas
export { default as HomeScreen } from './screens/HomeScreen';
export { default as MaterialFormScreen } from './screens/MaterialFormScreen';

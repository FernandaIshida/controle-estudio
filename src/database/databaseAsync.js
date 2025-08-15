import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'materiais_db';

export const initDatabase = async () => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    if (!existing) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
    console.log('Banco AsyncStorage inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
  }
};

export const getMateriais = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar materiais:', error);
    return [];
  }
};

export const insertMaterial = async (material) => {
  try {
    const materiais = await getMateriais();
    const newMaterial = {
      ...material,
      id: Date.now().toString(),
      dataCadastro: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    };
    materiais.push(newMaterial);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(materiais));
    return newMaterial.id;
  } catch (error) {
    console.error('Erro ao inserir material:', error);
    throw error;
  }
};

export const updateMaterial = async (material) => {
  try {
    const materiais = await getMateriais();
    const index = materiais.findIndex(m => m.id === material.id);
    if (index !== -1) {
      materiais[index] = {
        ...materiais[index],
        ...material,
        dataAtualizacao: new Date().toISOString()
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(materiais));
    }
  } catch (error) {
    console.error('Erro ao atualizar material:', error);
    throw error;
  }
};

export const deleteMaterial = async (id) => {
  try {
    const materiais = await getMateriais();
    const filtered = materiais.filter(m => m.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao deletar material:', error);
    throw error;
  }
};

export const updateQuantidade = async (id, novaQuantidade) => {
  try {
    const materiais = await getMateriais();
    const index = materiais.findIndex(m => m.id === id);
    if (index !== -1) {
      materiais[index].quantidade = novaQuantidade;
      materiais[index].dataAtualizacao = new Date().toISOString();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(materiais));
    }
  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);
    throw error;
  }
};

export default {
  initDatabase,
  getMateriais,
  insertMaterial,
  updateMaterial,
  deleteMaterial,
  updateQuantidade
};

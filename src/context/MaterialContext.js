import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getMateriais, 
  insertMaterial, 
  updateMaterial, 
  deleteMaterial, 
  updateQuantidade 
} from '../database/databaseAsync'; // Mudança aqui: usando databaseAsync

const MaterialContext = createContext();

export const useMaterialContext = () => {
  const context = useContext(MaterialContext);
  if (!context) {
    throw new Error('useMaterialContext deve ser usado dentro de um MaterialProvider');
  }
  return context;
};

export const MaterialProvider = ({ children }) => {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarMateriais = async () => {
    try {
      setLoading(true);
      const data = await getMateriais();
      setMateriais(data);
    } catch (error) {
      console.error('Erro ao carregar materiais:', error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarMaterial = async (material) => {
    try {
      const id = await insertMaterial(material);
      await carregarMateriais();
      return id;
    } catch (error) {
      console.error('Erro ao adicionar material:', error);
      throw error;
    }
  };

  const editarMaterial = async (material) => {
    try {
      await updateMaterial(material);
      await carregarMateriais();
    } catch (error) {
      console.error('Erro ao editar material:', error);
      throw error;
    }
  };

  const removerMaterial = async (id) => {
    try {
      await deleteMaterial(id);
      await carregarMateriais();
    } catch (error) {
      console.error('Erro ao remover material:', error);
      throw error;
    }
  };

  const alterarQuantidade = async (id, novaQuantidade) => {
    try {
      await updateQuantidade(id, novaQuantidade);
      await carregarMateriais();
    } catch (error) {
      console.error('Erro ao alterar quantidade:', error);
      throw error;
    }
  };

  const aumentarQuantidade = async (id, quantidadeAtual) => {
    await alterarQuantidade(id, quantidadeAtual + 1);
  };

  const diminuirQuantidade = async (id, quantidadeAtual) => {
    if (quantidadeAtual > 0) {
      await alterarQuantidade(id, quantidadeAtual - 1);
    }
  };

  const getMateriaisComAlerta = () => {
    return materiais.filter(material => material.quantidade <= material.quantidadeMinima);
  };

  useEffect(() => {
    carregarMateriais();
  }, []);

  const value = {
    materiais,
    loading,
    carregarMateriais,
    adicionarMaterial,
    editarMaterial,
    removerMaterial,
    alterarQuantidade,
    aumentarQuantidade,
    diminuirQuantidade,
    getMateriaisComAlerta
  };

  return (
    <MaterialContext.Provider value={value}>
      {children}
    </MaterialContext.Provider>
  );
};

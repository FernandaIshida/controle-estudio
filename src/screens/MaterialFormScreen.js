import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Title, 
  Text,
  Card,
  HelperText,
  Divider
} from 'react-native-paper';
import { useMaterialContext } from '../context/MaterialContext';
import colors from '../theme/colors';

const MaterialFormScreen = ({ navigation, route }) => {
  const { adicionarMaterial, editarMaterial } = useMaterialContext();
  const material = route.params?.material;
  const isEditing = !!material;

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    quantidade: '0',
    quantidadeMinima: '1',
    unidade: 'un',
    categoria: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (material) {
      setFormData({
        nome: material.nome,
        descricao: material.descricao || '',
        quantidade: material.quantidade.toString(),
        quantidadeMinima: material.quantidadeMinima.toString(),
        unidade: material.unidade || 'un',
        categoria: material.categoria || ''
      });
    }
  }, [material]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    const quantidade = parseInt(formData.quantidade);
    const quantidadeMinima = parseInt(formData.quantidadeMinima);

    if (isNaN(quantidade) || quantidade < 0) {
      newErrors.quantidade = 'Quantidade deve ser um número válido';
    }

    if (isNaN(quantidadeMinima) || quantidadeMinima < 0) {
      newErrors.quantidadeMinima = 'Quantidade mínima deve ser um número válido';
    }

    if (quantidadeMinima > quantidade) {
      newErrors.quantidadeMinima = 'Quantidade mínima não pode ser maior que a quantidade atual';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const materialData = {
        ...formData,
        quantidade: parseInt(formData.quantidade),
        quantidadeMinima: parseInt(formData.quantidadeMinima)
      };

      if (isEditing) {
        await editarMaterial({ ...materialData, id: material.id });
        Alert.alert('Sucesso', 'Material atualizado com sucesso!');
      } else {
        await adicionarMaterial(materialData);
        Alert.alert('Sucesso', 'Material cadastrado com sucesso!');
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o material. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir "${material.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            // A exclusão será tratada na tela anterior
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>
            {isEditing ? 'Editar Material' : 'Novo Material'}
          </Title>
          
          <TextInput
            label="Nome *"
            value={formData.nome}
            onChangeText={(text) => setFormData({ ...formData, nome: text })}
            style={styles.input}
            mode="outlined"
            error={!!errors.nome}
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.inputFocus}
            textColor={colors.text}
          />
          {errors.nome && <HelperText type="error" style={styles.errorText}>{errors.nome}</HelperText>}

          <TextInput
            label="Descrição"
            value={formData.descricao}
            onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.inputFocus}
            textColor={colors.text}
          />

          <View style={styles.row}>
            <TextInput
              label="Quantidade *"
              value={formData.quantidade}
              onChangeText={(text) => setFormData({ ...formData, quantidade: text })}
              style={[styles.input, styles.halfInput]}
              mode="outlined"
              keyboardType="numeric"
              error={!!errors.quantidade}
              outlineColor={colors.inputBorder}
              activeOutlineColor={colors.inputFocus}
              textColor={colors.text}
            />

            <TextInput
              label="Unidade"
              value={formData.unidade}
              onChangeText={(text) => setFormData({ ...formData, unidade: text })}
              style={[styles.input, styles.halfInput]}
              mode="outlined"
              placeholder="un, kg, l, etc"
              outlineColor={colors.inputBorder}
              activeOutlineColor={colors.inputFocus}
              textColor={colors.text}
            />
          </View>
          {errors.quantidade && <HelperText type="error" style={styles.errorText}>{errors.quantidade}</HelperText>}

          <TextInput
            label="Quantidade Mínima *"
            value={formData.quantidadeMinima}
            onChangeText={(text) => setFormData({ ...formData, quantidadeMinima: text })}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
            error={!!errors.quantidadeMinima}
            helperText="Quantidade mínima para gerar alerta de estoque baixo"
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.inputFocus}
            textColor={colors.text}
          />
          {errors.quantidadeMinima && <HelperText type="error" style={styles.errorText}>{errors.quantidadeMinima}</HelperText>}

          <TextInput
            label="Categoria"
            value={formData.categoria}
            onChangeText={(text) => setFormData({ ...formData, categoria: text })}
            style={styles.input}
            mode="outlined"
            placeholder="Ex: Papelaria, Limpeza, etc"
            outlineColor={colors.inputBorder}
            activeOutlineColor={colors.inputFocus}
            textColor={colors.text}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={[styles.button, { backgroundColor: colors.buttonPrimary }]}
              loading={loading}
              disabled={loading}
              buttonColor={colors.buttonPrimary}
            >
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={[styles.button, { borderColor: colors.buttonSecondary }]}
              disabled={loading}
              textColor={colors.buttonSecondary}
            >
              Cancelar
            </Button>
          </View>

          {isEditing && (
            <>
              <Divider style={styles.divider} />
              <Button
                mode="outlined"
                onPress={handleDelete}
                style={[styles.button, styles.deleteButton]}
                textColor={colors.buttonDanger}
                disabled={loading}
                borderColor={colors.buttonDanger}
              >
                Excluir Material
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 8,
    backgroundColor: colors.surface,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    marginVertical: 4,
    borderRadius: 8,
    paddingVertical: 8,
  },
  deleteButton: {
    borderColor: colors.buttonDanger,
  },
  divider: {
    marginVertical: 24,
    backgroundColor: colors.border,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  },
});

export default MaterialFormScreen;

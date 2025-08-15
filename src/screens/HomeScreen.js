import React from 'react';
import { View, StyleSheet, FlatList, Alert, Image, Platform } from 'react-native';
import { 
  FAB, 
  Card, 
  Title, 
  Paragraph, 
  Chip, 
  IconButton, 
  Badge,
  ActivityIndicator,
  Text
} from 'react-native-paper';
import { useMaterialContext } from '../context/MaterialContext';
import { MaterialIcons } from '@expo/vector-icons';
import colors, { shadows } from '../theme/colors';

// Componente híbrido: ícones nativos para mobile, emojis para web
const HybridIcon = ({ icon, size = 20, color, style, onPress, iconName, isFab = false }) => {
  if (Platform.OS === 'web') {
    // Web: usar emojis
    const iconMap = {
      'pencil': '✏️',
      'delete': '🗑️',
      'plus': '➕',
      'minus': '➖',
      'warning': '⚠️',
      'package-variant': '📦',
      'alert-circle': '🔴',
      'tag': '🏷️'
    };
    
    return (
      <Text 
        style={[
          { 
            fontSize: size, 
            color: color,
            textAlign: 'center',
            lineHeight: isFab ? size + 4 : size,
            width: size,
            height: size,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }, 
          style
        ]}
        onPress={onPress}
      >
        {iconMap[icon] || '?'}
      </Text>
    );
  } else {
    // Mobile: usar ícones nativos
    return (
      <MaterialIcons 
        name={iconName || icon} 
        size={size} 
        color={color} 
        style={style}
        onPress={onPress}
      />
    );
  }
};

const HomeScreen = ({ navigation }) => {
  const { 
    materiais, 
    loading, 
    removerMaterial, 
    aumentarQuantidade, 
    diminuirQuantidade,
    getMateriaisComAlerta 
  } = useMaterialContext();

  const materiaisComAlerta = getMateriaisComAlerta();

  const handleDelete = (material) => {
    // Para web, usar confirm() nativo
    if (Platform.OS === 'web') {
      const confirmar = window.confirm(`Deseja realmente excluir "${material.nome}"?`);
      if (confirmar) {
        removerMaterial(material.id);
      }
    } else {
      // Para mobile, usar Alert.alert
      Alert.alert(
        'Confirmar exclusão',
        `Deseja realmente excluir "${material.nome}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Excluir', 
            style: 'destructive',
            onPress: () => {
              removerMaterial(material.id);
            }
          }
        ]
      );
    }
  };

  const renderMaterial = ({ item }) => {
    const temAlerta = item.quantidade <= item.quantidadeMinima;
    
    return (
      <Card style={[styles.card, temAlerta && styles.cardAlerta]}>
        <View style={styles.watermarkContainer}>
          <Image 
            source={require('../../assets/red-spider-logo-peq.png')} 
            style={styles.watermarkLogo}
            resizeMode="contain"
          />
        </View>
        
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{item.nome}</Title>
              {temAlerta && (
                <Text 
                  style={[styles.alertIcon, { fontSize: 24 }]}
                >
                  ⚠️
                </Text>
              )}
            </View>
            <View style={styles.actions}>
              <View style={styles.iconButton}>
                <HybridIcon
                  icon="pencil"
                  size={20}
                  color={colors.secondary}
                  onPress={() => navigation.navigate('MaterialForm', { material: item })}
                  iconName="pencil"
                />
              </View>
              <View style={styles.iconButton}>
                <HybridIcon
                  icon="delete"
                  size={20}
                  color={colors.error}
                  onPress={() => handleDelete(item)}
                  iconName="delete"
                />
              </View>
            </View>
          </View>
          
          {item.descricao && (
            <Paragraph style={styles.descricao}>{item.descricao}</Paragraph>
          )}
          
          <View style={styles.infoContainer}>
            <Chip 
              icon={() => <HybridIcon icon="package-variant" size={16} color={colors.surface} />}
              style={[styles.chip, { backgroundColor: colors.chipPrimary }]}
              textStyle={{ color: colors.surface }}
            >
              {item.quantidade} {item.unidade}
            </Chip>
            
            <Chip 
              icon={() => <HybridIcon icon="alert-circle" size={16} color={colors.surface} />}
              style={[styles.chip, { backgroundColor: colors.chipSecondary }]}
              textStyle={{ color: colors.surface }}
            >
              Mín: {item.quantidadeMinima}
            </Chip>
            
            {item.categoria && (
              <Chip 
                icon={() => <HybridIcon icon="tag" size={16} color={colors.surface} />}
                style={[styles.chip, { backgroundColor: colors.chipNeutral }]}
                textStyle={{ color: colors.surface }}
              >
                {item.categoria}
              </Chip>
            )}
          </View>
          
          <View style={styles.quantidadeContainer}>
            <IconButton
              icon={() => <HybridIcon icon="minus" size={20} color={item.quantidade <= 0 ? colors.textLight : colors.secondary} />}
              size={20}
              onPress={() => diminuirQuantidade(item.id, item.quantidade)}
              disabled={item.quantidade <= 0}
            />
            
            <Text style={styles.quantidadeText}>
              {item.quantidade} {item.unidade}
            </Text>
            
            <IconButton
              icon={() => <HybridIcon icon="plus" size={20} color={colors.primary} />}
              size={20}
              onPress={() => aumentarQuantidade(item.id, item.quantidade)}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando materiais...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {materiaisComAlerta.length > 0 && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>
            ⚠️ {materiaisComAlerta.length} material(is) com estoque baixo
          </Text>
        </View>
      )}
      
      <FlatList
        data={materiais}
        renderItem={renderMaterial}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <FAB
        style={styles.fab}
        icon={() => <HybridIcon icon="plus" size={24} color={colors.surface} isFab />}
        onPress={() => navigation.navigate('MaterialForm')}
        color={colors.surface}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  alertBanner: {
    backgroundColor: colors.warning + '20',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.warning,
  },
  alertText: {
    marginLeft: 8,
    color: colors.warning,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: colors.materialCard,
    borderLeftWidth: 0,
    ...shadows.medium,
  },
  cardAlerta: {
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    backgroundColor: colors.warning + '05',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: colors.text,
  },
  alertIcon: {
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
  },
  descricao: {
    marginBottom: 12,
    color: colors.textSecondary,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 4,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantidadeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    minWidth: 60,
    textAlign: 'center',
    color: colors.text,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
  watermarkContainer: {
    position: 'absolute',
    top: 60,
    right: 8,
    opacity: 0.6,
    zIndex: 0,
  },
  watermarkLogo: {
    width: 100,
    height: 100,
    tintColor: colors.primary,
  },
  iconButton: {
    padding: 8,
  },
});

export default HomeScreen;

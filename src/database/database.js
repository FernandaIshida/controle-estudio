import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('materiais.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS materiais (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          descricao TEXT,
          quantidade INTEGER NOT NULL DEFAULT 0,
          quantidadeMinima INTEGER NOT NULL DEFAULT 1,
          unidade TEXT NOT NULL DEFAULT 'un',
          categoria TEXT,
          dataCadastro TEXT NOT NULL,
          dataAtualizacao TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Tabela materiais criada com sucesso');
          resolve();
        },
        (_, error) => {
          console.error('Erro ao criar tabela:', error);
          reject(error);
        }
      );
    });
  });
};

export const getMateriais = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM materiais ORDER BY nome ASC;',
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const insertMaterial = (material) => {
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO materiais (nome, descricao, quantidade, quantidadeMinima, unidade, categoria, dataCadastro, dataAtualizacao)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          material.nome,
          material.descricao || '',
          material.quantidade || 0,
          material.quantidadeMinima || 1,
          material.unidade || 'un',
          material.categoria || '',
          now,
          now
        ],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const updateMaterial = (material) => {
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE materiais 
         SET nome = ?, descricao = ?, quantidade = ?, quantidadeMinima = ?, unidade = ?, categoria = ?, dataAtualizacao = ?
         WHERE id = ?;`,
        [
          material.nome,
          material.descricao || '',
          material.quantidade || 0,
          material.quantidadeMinima || 1,
          material.unidade || 'un',
          material.categoria || '',
          now,
          material.id
        ],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteMaterial = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM materiais WHERE id = ?;',
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const updateQuantidade = (id, novaQuantidade) => {
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE materiais SET quantidade = ?, dataAtualizacao = ? WHERE id = ?;',
        [novaQuantidade, now, id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export default db;

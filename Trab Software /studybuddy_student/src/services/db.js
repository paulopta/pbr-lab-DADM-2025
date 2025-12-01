// Serviço simples usando expo-sqlite
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('studybuddy.db');

export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, due_date TEXT, done INTEGER DEFAULT 0, created_at TEXT);`,
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
};

export const insertTask = (title, description='') => {
  const created_at = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO tasks (title, description, created_at) VALUES (?, ?, ?);`,
        [title, description, created_at],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tasks ORDER BY created_at DESC;`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

export const markDone = (id, done) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE tasks SET done = ? WHERE id = ?;`,
        [done, id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM tasks WHERE id = ?;`,
        [id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

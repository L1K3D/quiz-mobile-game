import * as SQLite from 'expo-sqlite';

// Abre conexão com o banco
export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuizGame.db');
    return cx;
}

// Cria tabela se não existir
export async function createThemesTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS tbThemes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )
  `;
    const cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

// Retorna todos os registros
export async function getAllThemes() {
    const cx = await getDbConnection();
    const themes = await cx.getAllAsync('SELECT * FROM tbThemes');
    await cx.closeAsync();

    return themes.map(theme => ({
        id: theme.id,
        name: theme.name
    }));
}

// Adiciona um registro
export async function addTheme(theme) {
    const cx = await getDbConnection();
    const query = `
    INSERT INTO tbThemes (name)
    VALUES (?)
  `;
    const result = await cx.runAsync(query, [
        theme.name
    ]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Atualiza um registro existente
export async function changeTheme(theme) {
    const cx = await getDbConnection();
    const query = `
    UPDATE tbThemes
    SET name = ?
    WHERE id = ?
  `;
    const execResult = await cx.runAsync(query, [theme.name, theme.id,]);
    await cx.closeAsync();
    return execResult.changes === 1;
}

// Deleta um registro pelo código
export async function deleteTheme(id) {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbThemes WHERE id = ?';
    const result = await cx.runAsync(query, [id]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta todos os registros
export async function deleteAllThemes() {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbThemes';
    await cx.execAsync(query);
    await cx.closeAsync();
}
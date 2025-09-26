import * as SQLite from 'expo-sqlite';

// Abre conexão com o banco
export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuizGame.db');
    return cx;
}

// Cria tabela se não existir
export async function createResultsTable() {
    const query = `
    CREATE TABLE tbResults (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_theme INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        correct_answers INTEGER NOT NULL,
        game_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_theme) REFERENCES tbThemes(id_theme)
    )
  `;
    const cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

// Retorna todos os registros
export async function getAllResults() {
    const cx = await getDbConnection();
    const results = await cx.getAllAsync('SELECT * FROM tbResults');
    await cx.closeAsync();

    return results.map(result => ({
        id: result.id,
        id_theme: result.id_theme,
        total_questions: result.total_questions,
        correct_answers: result.correct_answers,
        game_date: result.game_date
    }));
}

// Adiciona um registro
export async function addResult(newResult) {
    const cx = await getDbConnection();
    const query = `
    INSERT INTO tbResults (id_theme, total_questions, correct_answers)
    VALUES (?, ?, ?)
  `;
    const execResult = await cx.runAsync(query, [
        newResult.id_theme,
        newResult.total_questions,
        newResult.correct_answers
    ]);
    await cx.closeAsync();
    return execResult.changes === 1;
}

// Deleta um registro pelo código
export async function deleteResult(id) {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbResults WHERE id = ?';
    const result = await cx.runAsync(query, [id]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta todos os registros
export async function deleteAllResults() {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbResults';
    await cx.execAsync(query);
    await cx.closeAsync();
}
import * as SQLite from 'expo-sqlite';

// Abre conexão com o banco
export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuizGame.db');
    return cx;
}

// Cria tabela se não existir
export async function createQuestionsTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS tbQuestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        id_theme INTEGER NOT NULL,
        FOREIGN KEY (id_theme) REFERENCES tbThemes(id) ON DELETE CASCADE
    )
  `;
    const cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

// Retorna todos os registros
export async function getAllQuestions() {
    const cx = await getDbConnection();
    const questions = await cx.getAllAsync('SELECT * FROM tbQuestions');
    await cx.closeAsync();

    return questions.map(question => ({
        id: question.id,
        description: question.description,
        id_theme: question.id_theme
    }));
}

// Retorna todas as questões de um tema
export async function getQuestionsByTheme(id_theme) {
    const cx = await getDbConnection();
    const questions = await cx.getAllAsync('SELECT * FROM tbQuestions WHERE id_theme = ?', [id_theme]);
    await cx.closeAsync();

    return questions.map(question => ({
        id: question.id,
        description: question.description,
        id_theme: question.id_theme
    }));
}

// Retorna uma questão pelo id
export async function getQuestionById(id) {
    const cx = await getDbConnection();
    const question = await cx.getFirstAsync('SELECT * FROM tbQuestions WHERE id = ?', [id]);
    await cx.closeAsync();

    return {
        id: question.id,
        description: question.description,
        id_theme: question.id_theme
    };
}

// Adiciona um registro
export async function addQuestion(question) {
    const cx = await getDbConnection();
    const query = `
    INSERT INTO tbQuestions (description, id_theme)
    VALUES (?, ?)
  `;
    const result = await cx.runAsync(query, [
        question.description,
        question.id_theme
    ]);
    await cx.closeAsync();
    return result.lastInsertRowId;
}

// Atualiza um registro existente
export async function changeQuestion(question) {
    const cx = await getDbConnection();
    const query = `
    UPDATE tbQuestions
    SET description = ?, id_theme = ?
    WHERE id = ?
  `;
    const result = await cx.runAsync(query, [
        question.id,
        question.description,
        question.id_theme
    ]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta um registro pelo código
export async function deleteQuestion(id) {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbQuestions WHERE id = ?';
    const result = await cx.runAsync(query, [id]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta todos os registros
export async function deleteAllQuestions() {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbQuestions';
    await cx.execAsync(query);
    await cx.closeAsync();
}

export async function getQuestionsByTheme(id_theme) {
    const cx = await getDbConnection();
    const query = 'SELECT * FROM tbQuestions WHERE id_theme = ?';
    const questions = await cx.getAllAsync(query, [id_theme]);
    await cx.closeAsync();

    return questions.map(question => ({
        id: question.id,
        description: question.description,
        id_theme: question.id_theme
    }));
}

export async function deleteQuestionsByTheme(id_theme) {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbQuestions WHERE id_theme = ?';
    const result = await cx.runAsync(query, [id_theme]);
    await cx.closeAsync();
    return result.changes;
}
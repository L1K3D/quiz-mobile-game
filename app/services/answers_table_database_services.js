import * as SQLite from 'expo-sqlite';

// Abre conexão com o banco
export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuizGame.db');
    return cx;
}

// Cria tabela se não existir
export async function createAnswersTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS tbAnswers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        answer TEXT NOT NULL,
        status_correct INTEGER NOT NULL CHECK (status_correct IN (0,1)),
        id_question INTEGER NOT NULL,
        FOREIGN KEY (id_question) REFERENCES tbQuestions(id) ON DELETE CASCADE
    )
  `;
    const cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

// Retorna todos os registros
export async function getAllAnswers() {
    const cx = await getDbConnection();
    const answers = await cx.getAllAsync('SELECT * FROM tbAnswers');
    await cx.closeAsync();

    return answers.map(answer => ({
        id: answer.id,
        answer: answer.answer,
        status_correct: answer.status_correct,
        id_question: answer.id_question
    }));
}

// Adiciona um registro
export async function addAnswer(answer) {
    const cx = await getDbConnection();
    const query = `
    INSERT INTO tbAnswers (answer, status_correct, id_question)
    VALUES (?, ?, ?)
  `;
    const result = await cx.runAsync(query, [
        answer.answer,
        answer.status_correct,
        answer.id_question
    ]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Atualiza um registro existente
export async function changeAnswer(answer) {
    const cx = await getDbConnection();
    const query = `
    UPDATE tbAnswers
    SET answer = ?, status_correct = ?, id_question = ?
    WHERE id = ?
  `;
    const result = await cx.runAsync(query, [
        answer.answer,
        answer.status_correct,
        answer.id_question,
        answer.id
    ]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta um registro pelo código
export async function deleteAnswer(id) {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbAnswers WHERE id = ?';
    const result = await cx.runAsync(query, [id]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta todos os registros
export async function deleteAllAnswers() {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbAnswers';
    await cx.execAsync(query);
    await cx.closeAsync();
}
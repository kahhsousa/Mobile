import * as SQLite from "expo-sqlite";

export const bancoDados = SQLite.openDatabaseSync("DiarioDigital.db");

// Tipo dos dados necessários para salvar um registro
export type NovoRegistro = {
  usuario_id: string;
  titulo: string;
  texto: string;
  data: string;
  emoji: string;
};

// Tipo de um registro recuperado do banco de dados
export type RegistroSalvo = NovoRegistro & {
  id: number;
};

// Inicializa as tabelas do banco de dados
export function criarTabelas() {
  bancoDados.execSync(`
    CREATE TABLE IF NOT EXISTS registro_diario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id TEXT NOT NULL,
      titulo TEXT NOT NULL,
      texto TEXT NOT NULL,
      data TEXT NOT NULL,
      emoji TEXT NOT NULL
    );
  `);
}

// Salva um novo registro no banco de dados
export function salvarRegistro(registro: NovoRegistro) {
  const resultado = bancoDados.runSync(
    `INSERT INTO registro_diario
      (usuario_id, titulo, texto, data, emoji)
     VALUES (?, ?, ?, ?, ?);`,
    [
      registro.usuario_id,
      registro.titulo,
      registro.texto,
      registro.data,
      registro.emoji,
    ]
  );

  return resultado.lastInsertRowId;
}

// Busca os registros de um usuário específico
export function buscarRegistros(
  usuarioId: string
): RegistroSalvo[] {
  return bancoDados.getAllSync<RegistroSalvo>(
    `SELECT id, usuario_id, titulo, texto, data, emoji
     FROM registro_diario
     WHERE usuario_id = ?
     ORDER BY data DESC, id DESC;`,
    [usuarioId]
  );
}
// Exclui um registro específico de um usuário
export function excluirRegistro(
  registroId: number,
  usuarioId: string
) {
  return bancoDados.runSync(
    `DELETE FROM registro_diario
     WHERE id = ? AND usuario_id = ?;`,
    [registroId, usuarioId]
  );
}

export function atualizarRegistro(
  registroId: number,
  usuarioId: string,
  registro: NovoRegistro
) {
  return bancoDados.runSync(
    `UPDATE registro_diario
     SET titulo = ?,
         texto = ?,
         data = ?,
         emoji = ?
     WHERE id = ? AND usuario_id = ?;`,
    [
      registro.titulo,
      registro.texto,
      registro.data,
      registro.emoji,
      registroId,
      usuarioId,
    ]
  );
}
export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users")
  return rows
}


export async function getUser(id) {
const [rows] = await pool.query(`
SELECT * 
FROM users
WHERE userID = ?
`, [id])
return rows[0]
}

export async function createUser(nickname, email) {
const [result] = await pool.query(`
INSERT INTO users (nickname, email )
VALUES (?, ?)
`, [nickname, email])
const id = result.insertId
return getUser(id)
}

export async function deleteUser(id) {
const [row] = await pool.query('DELETE FROM users WHERE userID=?', [id])
return row
}
  
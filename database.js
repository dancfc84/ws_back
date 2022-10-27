import mysql from 'mysql2'

//need to install the dotenv library npm i dotenv
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
//will take out the first item returned and store in variable rows
  const [rows] = await pool.query("SELECT * FROM notes")
  return rows
}

//Values with a ? are then stipulated in brackets outside the query - stops sql injection attacks
export async function getNote(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM notes
  WHERE id = ?
  `, [id])
  return rows[0]
}

const notes = await getNotes()
console.log(notes);


export async function createNote(title, contents) {
  const [result] = await pool.query(`
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `, [title, contents])
  const id = result.insertId
  //then returns the inserted record
  return getNote(id)
}

const insert = await createNote('test', 'test')
console.log(insert);
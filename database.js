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



//record functions

export async function getRecords() {
//will take out the first item returned and store in variable rows
  const data = await pool.query("SELECT * FROM records")
  return data[0];
}

//Values with a ? are then stipulated in brackets outside the query - stops sql injection attacks
export async function getRecord(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM records
  WHERE recordID = ?
  `, [id])
  return rows[0]
}

export async function createRecord(speciesID, notes, dateSighted, userID, abundance, sex, lifeStage, basisOfRecord, lat, lng) {
  const [result] = await pool.query(`
  INSERT INTO records (speciesID, notes, dateSighted, userID, abundance, sex, lifeStage, basisOfRecord, lat, lng )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [speciesID, notes, dateSighted, userID, abundance, sex, lifeStage, basisOfRecord, lat, lng])
  const id = result.insertId
  //then returns the inserted record
  return getRecord(id)
}

export async function deleteRecord(id) {
  const [row] = await pool.query('DELETE FROM records WHERE recordID=?', [id])
  return row
}

//user functions

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
    

//species functions

  export async function getSpecies() {
      const [rows] = await pool.query("SELECT * FROM species")
      return rows
    }
    

  export async function getSpeciesOne(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM species
    WHERE speciesID = ?
    `, [id])
    return rows[0]
  }
  
  export async function createSpecies(nickname, email) {
    const [result] = await pool.query(`
    INSERT INTO species (nickname, email )
    VALUES (?, ?)
    `, [nickname, email])
    const id = result.insertId
    //then returns the inserted record
    return getSpecies(id)
  }

  export async function deleteSpecies(id) {
    const [row] = await pool.query('DELETE FROM species WHERE speciesID = ? ', [id])
    return row
}


export default pool;



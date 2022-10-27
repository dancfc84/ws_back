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
  const [rows] = await pool.query("SELECT * FROM records")
  return rows
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

//user functions

export async function getUsers() {
  //will take out the first item returned and store in variable rows
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
  }
  

  //Values with a ? are then stipulated in brackets outside the query - stops sql injection attacks
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
    //then returns the inserted record
    return getUser(id)
  }
  

  //species functions
  

  export async function getSpecies() {
    //will take out the first item returned and store in variable rows
      const [rows] = await pool.query("SELECT * FROM species")
      return rows
    }
    
  
    //Values with a ? are then stipulated in brackets outside the query - stops sql injection attacks
    export async function getSpecie(id) {
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
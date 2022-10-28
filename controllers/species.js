

import { pool } from '../database';

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


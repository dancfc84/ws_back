export async function getRecords() {
  //will take out the first item returned and store in variable rows
  const data = await pool.query("SELECT * FROM records");
  return data[0];
}

//Values with a ? are then stipulated in brackets outside the query - stops sql injection attacks
export async function getRecord(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM records
    WHERE recordID = ?
    `,
    [id]
  );
  return rows[0];
}

export async function createRecord(
  speciesID,
  notes,
  dateSighted,
  userID,
  abundance,
  sex,
  lifeStage,
  basisOfRecord,
  lat,
  lng
) {
  const [result] = await pool.query(
    `
    INSERT INTO records (speciesID, notes, dateSighted, userID, abundance, sex, lifeStage, basisOfRecord, lat, lng )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      speciesID,
      notes,
      dateSighted,
      userID,
      abundance,
      sex,
      lifeStage,
      basisOfRecord,
      lat,
      lng,
    ]
  );
  const id = result.insertId;
  //then returns the inserted record
  return getRecord(id);
}

export async function deleteRecord(id) {
  const [row] = await pool.query("DELETE FROM records WHERE recordID=?", [id]);
  return row;
}


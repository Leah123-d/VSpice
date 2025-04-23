import dbConnection from "../db-connection.js";

export const getSpice = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbConnection.query(
      `SELECT * FROM spices WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404);
    }
    res.json(result.rows);
  } catch (error) {
    console.error("spice not found", error);
  }
};

export const getSpices = async (req, res) => {
  try {
    const result = await dbConnection.query(`SELECT * FROM spices`);
    res.json(result.rows);
  } catch (error) {
    console.error("spices not found", error);
  }
};

export const createSpice = async (req, res) => {
  const {
    name,
    brand,
    full_weight,
    current_weight,
    expiration_date,
    last_purchased,
    notes,
    inactive,
    user_id,
  } = req.body;
  try {
    const result = await dbConnection.query(
      `INSERT INTO spices 
                                              (name, brand, full_weight, current_weight, expiration_date, last_purchased, notes, inactive, user_id) 
                                              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        name,
        brand,
        full_weight,
        current_weight,
        expiration_date,
        last_purchased,
        notes,
        inactive,
        user_id,
      ]
    );

    res.json({ message: `new spice ${result.rows[0].name} was added` });
  } catch (error) {
    console.error("Error creating new spice: ", error);
  }
};

export const updateSpice = async (req, res) => {
  const { id } = req.params;
  const { name, brand, current_weight, last_purchased, notes } = req.body;

  // const inactiveValue = inactive !== undefined ? inactive : false;

  try {
    const result = await dbConnection.query(
      `UPDATE spices 
                                            SET 
                                            name = $1, 
                                            brand= $2, 
                                            current_weight= $3, 
                                            last_purchased= $4, 
                                            notes= $5
                                            WHERE id = $6 RETURNING *`,
      [name, brand, current_weight, last_purchased, notes, id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error updating spice: ", error);
  }
};

export const deleteSpice = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await dbConnection.query(
      `DELETE FROM spices WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.send({ error: "spice not found" });
    }
    res.send(`spice: ${name} has been deleted`);
  } catch (error) {
    console.error(`error deleting spice ${name}`, error);
    res
      .status(500)
      .send({ error: "internal server error while deleting spice." });
  }
};

export const searchSpices = async (req, res) => {
  const { name } = req.params.name.toLowerCase();
  try {
    const result = await dbConnection.query(
      `SELECT * FROM spices WHERE name =  $1`,
      [`%${name}%`]
    );
    if (result.rowCount === 0) {
      return res.send({ error: "spice not found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(`error seraching for spice ${name}`, error);
    res.status(500).send({ error: "internal server error during search" });
  }
};

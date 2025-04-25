import dbConnection from "../db-connection.js";

export const getShoppingList = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbConnection.query(
      `SELECT * FROM shopping_list WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.send({ error: "shopping list not found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(`error getting shopping with id: ${id}`, error);
    res.status(500).send({ error: "internal server error" });
  }
};

export const getPastShoppingLists = async (req, res) => {
  try {
    const result = await dbConnection.query(
      `SELECT * FROM shopping_list ORDER BY shopping_date  `
    );
    if (result.rows.length === 0) {
      return res.send({ error: "shopping list not found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "internal server error" });
  }
};

export const createShoppingList = async (req, res) => {
  const { spice_id, shopping_date, comments } = req.body;
  try {
    const result = await dbConnection.query(
      `INSERT INTO shopping_list
                                              (spice_id, shopping_date, comments) 
                                              VALUES ($1,$2,$3) RETURNING *`,
      [spice_id, shopping_date, comments]
    );

    res.json({ message: `new shopping_list ${result.rows[0]} was added` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "internal server error" });
  }
};

export const deleteShoppingList = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbConnection.query(
      `DELETE FROM shopping_list WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404);
    }
    res.send(`shopping list: ${id} has been deleted`);
  } catch (error) {
    console.error(`error deleting shopping list ${id}`, error);
    res
      .status(500)
      .send({ error: "internal server error" });
  }
};

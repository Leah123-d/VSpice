import dbConnection from "../db-connection.js";

export const getShoppingList = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbConnection.query(
      `SELECT * FROM shopping_list WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404);
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
    res.json(result.rows);
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
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbConnection.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.send({ error: "user not found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(`error getting user with id: ${id}`, error);
    res.status(500).send({ error: "internal server error getting user" });
  }
};

export const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await dbConnection.query(
      `INSERT INTO spices 
                                              (email) 
                                              VALUES ($1) RETURNING *`,
      [email]
    );

    res.json({ message: `new user ${result.rows[0]} was added` });
  } catch (error) {
    console.error(`error creating user`, error);
    res.status(500).send({ error: "internal server error creating user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const result = await dbConnection.query(
      `UPDATE users
                                            SET 
                                            email = $1, 
                                            WHERE id = $2 RETURNING *`,
      [email]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(`error updating user with email: ${email}`, error);
    res.status(500).send({ error: "internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const result = await dbConnection.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.send({ error: "user not found" });
    }
    res.send(`uer: ${email} has been deleted`);
  } catch (error) {
    console.error(`error deleting user ${email}`, error);
    res
      .status(500)
      .send({ error: "internal server error while deleting user." });
  }
};

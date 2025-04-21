import dbConnection from "../db-connection.js";

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

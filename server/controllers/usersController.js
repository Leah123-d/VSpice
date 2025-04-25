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
    console.error("user not found", error);
  }
};

export const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await dbConnection.query(`INSERT INTO users
                                              (email) 
                                              VALUES ($1) RETURNING *`, [email]);
    res.json({ message: `new user ${result.rows[0].name} was added` });
  } catch (error) {
    console.error("Error creating new user: ", error);
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
    console.error("Error updating user: ", error);
  }
};

export const deleteUser = async(req,res) => {
  const { id } = req.params;
  const { email } = req.body;
  try{
    const result = await dbConnection.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    if(result.rowCount === 0){
        return res.send( { "error": "user not found" } );
    }
    res.send(`user: ${email} has been deleted`);
    } catch (error){
        console.error(`could not locate user ${email}`, error);
    }
}
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


import spicesRoute from './routes/spicesRoute.js'
// import shoppingListRoute from './routes'
// import usersRoute from './routes'
import visionRoute from './routes/visiontempRoute.js'
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));

dotenv.config();
app.use(bodyParser.json()) 



//to read the tables
app.use('/spices', spicesRoute); 
// app.use('/shoppingList', shoppingListRoute); 
// app.use('/users', usersRoute); 

app.use('/vision', visionRoute); 


app.get('/', (req,res) => res.send("Hello! This is the homepage!")); //test connection to the home page


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`VSpice server is listening on PORT ${port}`)
})


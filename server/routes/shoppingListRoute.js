import express from 'express';
import{
  getShoppingList,
  getPastShoppingLists,
  createShoppingList,
  deleteShoppingList,
} from '../controllers/spicesController.js';

const router = express.Router();

router.get("/:id", getShoppingList);
router.get("/", getPastShoppingLists);
router.post("/", createShoppingList);
router.delete("/:id", deleteShoppingList);

export default router;
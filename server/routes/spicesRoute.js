import express from 'express';
import{
  getSpice,
  getSpices,
  createSpice,
  updateSpice,
  deleteSpice,
  searchSpices,
} from '../controllers/spicesController.js';

const router = express.Router();

router.get("/search/:name",searchSpices);
router.get("/:id", getSpice);
router.get("/", getSpices);
router.post("/", createSpice);
router.put("/:id", updateSpice);
router.delete("/:id", deleteSpice);

export default router;
import express from "express";
import {
  getAllPlanets,
  getPlanet,
  createPlanet,
  deletePlanet,
  updatePlanet
} from "../controllers/planet.controller.js";
import { createUser } from "../controllers/user.controller.js";
import { createAdmin } from "../controllers/admin.controller.js"

const router = express.Router();

router.get("/", getAllPlanets);
router.get("/:id", getPlanet);
router.post("/", createPlanet);
router.delete("/:id", deletePlanet);
router.put("/:id", updatePlanet);

// Routes pour les utilisateurs
router.post("/users", createUser);

// Routes pour les administrateurs
router.post("/admins", createAdmin);

export default router;

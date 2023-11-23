import {
  getAllPlanet,
  getPlanetById,
  insertPlanet,
  deletePlanetById,
  updatePlanetById
} from "../models/planet.model.js";

const getAllPlanets = (req, res) => {
  getAllPlanet()
    .then(([result]) => {
      if (result.length) {
        res.status(200).send(result);
      } else {
        res.status(404).json({ error: "No planets found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching data", err);
      res.status(500).send("An error occurred while fetching data");
    });
};

const getPlanet = (req, res) => {
  const id = req.params.id;

  getPlanetById(id)
    .then(([result]) => {
      if (result.length) {
        res.status(200).send(result);
      } else {
        res.status(404).send(`The planet with the id ${id} does not exist`);
      }
    })
    .catch((err) => {
      console.error("Error fetching data", err);
      res.status(500).send("An error occurred while fetching data");
    });
};

const createPlanet = (req, res) => {
  const { name, radius, mass, distanceFromSun, image } = req.body;
  console.log("C'est mon body", req.body)

  if (!name) {
    return res.status(404).send("L'un des champs est vide");
  }

  insertPlanet(name, radius, mass, distanceFromSun, image)
    .then(([response]) => {
      if (response.affectedRows) {
        return res.status(201).send(response);
      }
    })
    .catch((err) => {
      console.error("Error creating planet", err);
      res.status(500).send("An error occurred while creating the planet");
    });
};

const deletePlanet = (req, res) => {
  const id = req.params.id;

  deletePlanetById(id)
    .then(() => {
      res.status(200).send(`Planet with id ${id} deleted successfully`);
    })
    .catch((err) => {
      console.error("Error deleting planet", err);
      res.status(500).send("An error occurred while deleting the planet");
    });
};

const updatePlanet = (req, res) => {
  const id = req.params.id;
  const { name, radius, mass, distanceFromSun, image } = req.body;

  updatePlanetById(id, name, radius, mass, distanceFromSun, image)
    .then(() => {
      res.status(200).send(`Planet with id ${id} updated successfully`);
    })
    .catch((err) => {
      console.error("Error updating planet", err);
      res.status(500).send("An error occurred while updating the planet");
    });
};

export {
  getAllPlanets,
  getPlanet,
  createPlanet,
  deletePlanet,
  updatePlanet,
};

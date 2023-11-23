import database from "../datasource.js";

export const getAllPlanet = async () => {
  return await database.query("SELECT * FROM planet");
};

export const getPlanetById = async (id) => {
  return await database.query("SELECT * FROM planet WHERE id = ?", [id]);
};

export const insertPlanet = async (name, radius, mass, distanceFromSun, image) => {
  const query = "INSERT INTO planet (name, radius, mass, distanceFromSun, image) VALUES (?, ?, ?, ?, ?)";
  const values = [name, radius, mass, distanceFromSun, image];

  return await database.query(query, values);
};

export const deletePlanetById = async (id) => {
  const query = "DELETE FROM planet WHERE id = ?";
  const values = [id];

  return await database.query(query, values);
};

export const updatePlanetById = async (id, name, radius, mass, distanceFromSun, image) => {
  const query = "UPDATE planet SET name = ?, radius = ?, mass = ?, distanceFromSun = ?, image = ? WHERE id = ?";
  const values = [name, radius, mass, distanceFromSun, image, id];

  return await database.query(query, values);
};

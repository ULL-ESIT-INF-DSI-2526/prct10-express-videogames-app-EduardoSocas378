import express from 'express';
import fs from 'fs/promises';

const app = express();
app.use(express.json());

app.post('/videogames', async (req, res) => {
  const user = req.query.user as string;
  const game = req.body;

  if (!user) {
    return res.send({ success: false, error: "Falta el parámetro 'user' en la URL" });
  }

  const dirPath = `./data/${user}`;
  const filePath = `${dirPath}/${game.id}.json`;

  try {
    await fs.mkdir(dirPath, { recursive: true });
    
    try {
      await fs.access(filePath);
      return res.send({ success: false, error: `Ya existe un videojuego con el ID ${game.id}` });
    } catch {
      await fs.writeFile(filePath, JSON.stringify(game, null, 2));
      return res.send({ success: true });
    }
  } catch (error) {
    return res.send({ success: false, error: "Error interno del servidor al guardar" });
  }
});

app.patch('/videogames', async (req, res) => {
  const user = req.query.user as string;
  const game = req.body; 

  if (!user) {
    return res.send({ success: false, error: "Falta el parámetro 'user' en la URL" });
  }

  const dirPath = `./data/${user}`;
  const filePath = `${dirPath}/${game.id}.json`;

  try {
    await fs.access(filePath);
    await fs.writeFile(filePath, JSON.stringify(game, null, 2));
    return res.send({ success: true });
  } catch {
    return res.send({ success: false, error: `No se encontró ningún videojuego con el ID ${game.id} para modificar` });
  }
});

app.delete('/videogames', async (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string; 

  if (!user || !id) {
    return res.send({ success: false, error: "Faltan los parámetros 'user' o 'id' en la URL" });
  }

  const filePath = `./data/${user}/${id}.json`;

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    return res.send({ success: true });
  } catch {
    return res.send({ success: false, error: `No se encontró ningún videojuego con el ID ${id} para eliminar` });
  }
});


app.get('/videogames', async (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string; 

  if (!user) {
    return res.send({ success: false, error: "Falta el parámetro 'user' en la URL" });
  }

  const dirPath = `./data/${user}`;

  try {
    await fs.access(dirPath);
    if (id) {
      const filePath = `${dirPath}/${id}.json`;
      try {
        const fileContent = await fs.readFile(filePath);
        const gameData = JSON.parse(fileContent.toString());
        return res.send({ success: true, videogames: [gameData] });
      } catch {
        return res.send({ success: false, error: `No se encontró el videojuego con ID ${id}` });
      }
    } else {
      const files = await fs.readdir(dirPath);
      const allGames = [];

      for (const file of files) {
        const content = await fs.readFile(`${dirPath}/${file}`);
        allGames.push(JSON.parse(content.toString()));
      }

      return res.send({ success: true, videogames: allGames });
    }
  } catch {
    return res.send({ success: false, error: `El usuario ${user} no tiene videojuegos registrados` });
  }
});

app.listen(3000, () => {
  console.log('Servidor Express escuchando en el puerto 3000');
});
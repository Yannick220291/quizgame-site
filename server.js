const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Exemple d'API
  server.get("/api/hello", (req, res) => {
    res.json({ message: "Hello depuis Express 🚀" });
  });

  // Toutes les autres routes Next.js
  server.use((req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Serveur prêt sur http://localhost:${port}`);
  });
});




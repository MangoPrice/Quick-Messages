import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`);
  next();
});

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

let messages = [];

app.get("/", (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render("index", { currentYear, messages: messages, activePage: 'home' });
});

app.post("/submit", (req, res) => {
  const messageContent = req.body.message;
  const currentDay = new Date().toLocaleDateString("pt-BR", { weekday: "short" });
  messages.push({ content: messageContent, day: currentDay });
  console.log("New message added:", messageContent);
  res.redirect("/");
});

app.delete("/delete/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < messages.length) {
    messages.splice(index, 1);
    console.log(`Deleted message at index: ${index}`);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid index" });
  }
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  const message = messages[index];
  const currentYear = new Date().getFullYear();
  res.render("edit", {currentYear, message, index });
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const updatedMessage = req.body.message;
  messages[index].content = updatedMessage;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
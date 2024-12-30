import app from "./app";

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});

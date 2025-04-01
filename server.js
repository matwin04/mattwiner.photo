import postgres from "postgres";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";

dotenv.config();
const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });
const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Fix path issues
app.set("views", path.join(__dirname, "views"));

// ✅ Serve static files from "public"
app.use("/styles", express.static(path.join(__dirname, "public/styles")));
app.use("/scripts", express.static(path.join(__dirname, "public/scripts")));
// ✅ Configure Handlebars
app.engine("html", engine({ extname: ".html", defaultLayout: false }));
app.set("view engine", "html");

// ✅ Ensure the POIs table exists
// ✅ Ensure the Users & POIs Table Exist

// HOME ROUTE
app.get("/", (req, res) => {
    res.render("index", { title: "VISTAPOINT" });
});

if (!process.env.VERCEL && !process.env.NOW_REGION) {
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}

// ✅ Export the Expres
// ✅ Export the app for Vercel
export default app;
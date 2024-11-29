import app from "./app"
import { Config } from "./app/config/server.config";

// // Start the server
const PORT = Config.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

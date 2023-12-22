import { RouterProvider } from "react-router";
import { router } from "./routers";
import "@utils/i18";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

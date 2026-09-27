import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import Toaster from "../components/feedback/Toaster.jsx";

// ບໍ່ຕ້ອງມີ Provider — state ທົ່ວໄປ (auth / theme / toast) ຢູ່ໃນ store + hook
const App = () => (
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);

export default App;

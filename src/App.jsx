import RouterPath from "./router/router";
import { ThemeProvider } from "./config/theme/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Toaster from "./components/Toaster";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterPath />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

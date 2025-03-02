import RouterProvider from "./providers/RouterProvider";
import StoreProvider from "./providers/StoreProvider";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <RouterProvider />
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;

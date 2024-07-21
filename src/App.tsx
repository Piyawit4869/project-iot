import { RouterProvider } from 'react-router';
import { router } from './routers';
import '@utils/i18';
import VConsole from 'vconsole';

function App() {
  const appEnv = import.meta.env.VITE_APP_ENV;
  if (appEnv === 'develop') new VConsole();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { RouterProvider } from 'react-router';
import { router } from './router';

function App() {
  return (
    <div className="h-screen bg-[#F1F1F1]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

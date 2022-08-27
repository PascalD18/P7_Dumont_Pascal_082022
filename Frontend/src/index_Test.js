import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); 
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <MyApp />
   </Provider>
  </React.StrictMode>
);
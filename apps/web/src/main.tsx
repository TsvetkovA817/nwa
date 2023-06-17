import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import App from './app/app';

//  вариант для React 17
// ReactDOM.render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
//   document.getElementById('root')
// );

const container = document.querySelector('#root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
   <StrictMode>
    <BrowserRouter>
       <App />
     </BrowserRouter>
   </StrictMode>
);

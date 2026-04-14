import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import Router from './Router/Router';
import TimeLineContext from './TimeLineContext/TimeLineContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <TimeLineContext>

      <RouterProvider router={Router} />

    </TimeLineContext>

  </StrictMode>,
);

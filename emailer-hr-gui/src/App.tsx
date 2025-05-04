import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Root from 'src/atoms/Root'
import CandidatesPage from 'src/pages/candidates'
import CreateCandidatePage from 'src/pages/candidates/create'
import EditCandidatePage from 'src/pages/candidates/edit'
import TemplatesPage from './pages/templates'
import CreateTemplatePage from './templates/create'
import EditTemplatePage from './pages/templates/edit'
import LogsPage from './pages/logs'
import SendEmailPage from './pages/emails/send'
import LandingPage from './pages/landing-page'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "candidates",
        element: <CandidatesPage />,
      },
      {
        path: "candidates/create",
        element: <CreateCandidatePage />,
      },
      {
        path: "candidates/edit/:id",
        element: <EditCandidatePage />,
      },
      {
        path: "templates",
        element: <TemplatesPage />,
      },
      {
        path: "templates/create",
        element: <CreateTemplatePage />,
      },
      {
        path: "templates/edit/:id",
        element: <EditTemplatePage />,
      },
      {
        path: "logs",
        element: <LogsPage />,
      },
      {
        path: "emails/send",
        element: <SendEmailPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

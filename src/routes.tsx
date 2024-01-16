import CurrentPageProvider from "context/PageContext";
import SearchCharactersProvider from "context/SearchCharacterContext";
import HomePage from "pages/HomePage/HomePage";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "views/MainLayout";

const routes = [
  {
    path: "/",
    element: (
      <CurrentPageProvider>
        <SearchCharactersProvider>
          <MainLayout />
        </SearchCharactersProvider>
      </CurrentPageProvider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;

import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/recipe",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoriteRecipesPage"),
  },
  {
    path: "/my-recipes",
    name: "my-recipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path: "/family-recipes",
    name: "family-recipes",
    component: () => import("./pages/MyFamilyRecipesPage"),
  },
  {
    path: "/preperation",
    name: "preperation",
    component: () => import("./pages/RecipePreperationPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;

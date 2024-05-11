export enum AppRoutes {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  MAIN = 'main',
  CATALOG = 'catalog',
  PROFILE = 'profile',
  BASKET = 'basket',
  ABOUT = 'about',
  NOT_FOUND = '404',
}

export const getRouteLogin = () => '/login';
export const getRouteRegistration = () => '/registration';
export const getRouteMain = () => '/main';
export const getRouteCatalog = () => '/catalog';
export const getRouteCategory = (category: string) => `/catalog${category}`;
export const getRouteProduct = (category: string, id: string) =>
  `/catalog/${category}/${id}`;
export const getRouteProfile = () => '/profile';
export const getRouteBasket = () => '/basket';
export const getRouteAbout = () => '/about';
export const getRouteNotFound = () => '/404';

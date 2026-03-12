import About from './components/pages/About';
import BecomeSeller from './components/pages/BecomeSeller';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import ProductDetail from './components/pages/ProductDetail';
import Products from './components/pages/Products';
import Profile from './components/pages/Profile';
import TrendingProducts from './components/pages/TrendingProducts';
import Wishlist from './components/pages/Wishlist';
import __Layout from './Layout.jsx';

export const PAGES = {
    "About": About,
    "BecomeSeller": BecomeSeller,
    "Cart": Cart,
    "Checkout": Checkout,
    "Contact": Contact,
    "Home": Home,
    "ProductDetail": ProductDetail,
    "Products": Products,
    "Profile": Profile,
    "TrendingProducts": TrendingProducts,
    "Wishlist": Wishlist,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './UserHome'
export {default as Products} from './product-list'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as SingleProduct} from './SingleProduct'
export {default as ViewAllUsers} from './ViewAllUsers'
export {default as ViewOrders} from './ViewOrders'
export {default as UserForm} from './UserForm'
export {default as UpdateUser} from './updateUser'
export {default as ProductManager} from './ProductManager'
export {default as ChangePassword} from './ChangePassword'
export {default as FeaturedCard} from './FeaturedCard'

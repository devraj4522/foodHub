import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { FaShoppingCart } from "react-icons/fa";
import { IMenuItem } from "@/types/Restaurant";
import { toast } from "sonner";
import { addItemToCart } from '@/actions/cart';
import { useRecoilState } from "recoil";
import { cartAtom } from "@/recoil/atoms/cartAtom";

export default function RestaurantCard({item}: {item: IMenuItem}) {

  const [cart, setCart] = useRecoilState(cartAtom);
  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>,  menuItem:IMenuItem) => {
      event.preventDefault();
      if (!cart || !cart.id) {
        toast.error('Cart not found');
        return;
      }

      try {
        const cartItemData = {
          cartId: cart.id,
          quantity: 1,
          menuItem: menuItem,
          menuItemId: menuItem.id,
        };

        // do not allow to order from different restaurant
        if (cart.items.length > 0 &&  cartItemData.menuItem.restaurantId !== cart.items[0].menuItem.restaurantId) {
          toast.error('Order From Different Restaurant? Remove items from your cart');
          return;
        }
        const response = await addItemToCart(cartItemData);
        const {id, cartId, items, quantity} = response;
        if (response && typeof response === 'object' && 'id' in response) {
          toast.success('Item added to cart')
          const newItem = {
            id: id,
            cartId: cartId,
            menuItem: {
              id: cartItemData.menuItemId,
              restaurantId: cartItemData.menuItem.restaurantId,
              name: cartItemData.menuItem.name,
              price: cartItemData.menuItem.price,
            },
            quantity: quantity,
          }
          setCart((prevCart) => {
            if (!prevCart) return null;
            const existingItemIndex = prevCart.items.findIndex(
              (item) => item.cartId === newItem.cartId && item.menuItem.id === newItem.menuItem.id
            );
            if (existingItemIndex !== -1) {
              // Item already exists, update quantity
              const updatedItems = [...prevCart.items];
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + 1
              };
              return { ...prevCart, items: updatedItems };
            } else {
              // Item doesn't exist, add new item
              return { ...prevCart, items: [...prevCart.items, newItem] };
            }
          });
        } else {
          toast.error('Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
  };
  return (
    <Link className='cursor-pointer transition-all duration-300' href={`/food/${item.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:border-gray-200">

        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-56 object-cover"
          />
          <span className="absolute top-2 right-2 flex items-center bg-gray-50 text-yellow-800 px-3 py-1 rounded-full">
            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{item.rating || '4.5'}</span>
          </span>
        </div>
        <div className="p-5">
          <h4 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h4>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">₹{item.price?.toFixed(2)}</span>
            <Button
              onClick={(event) => handleAddToCart(event, item)}
              variant="shadow"
              endContent={<FaShoppingCart className="w-4 h-4" />}
              className="font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

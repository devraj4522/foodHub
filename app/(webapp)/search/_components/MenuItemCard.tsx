import { IMenuSearchResult } from "@/types/Restaurant";
import { FaStar } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Card } from "@nextui-org/card";
import { cartAtom } from "@/recoil/atoms/cartAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ICartState } from "@/types/Cart";
import { userAtom } from "@/recoil/atoms/userAtom";
import { toast } from "sonner";
import { IMenuItem } from "@/types/Restaurant";
import { addItemToCart } from "@/actions/cart";
import Link from "next/link";

interface MenuItemCardProps {
  menuItem: IMenuSearchResult;
  searchTerm: string;
}


export function MenuItemCard({ menuItem, searchTerm }: MenuItemCardProps) {
  const [cart, setCart] = useRecoilState(cartAtom);
  const user = useRecoilValue(userAtom)

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>,  menuItem:Omit<IMenuItem, 'restaurant' | 'category' | 'rating'>) => {
    event.preventDefault();
    if (!cart || !cart.id) {
      toast.error('Login to Proceed');
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
    <Link href={`/food/${menuItem.id}`}>
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex h-full">
        <div className="w-1/4">
          <img src={menuItem.image} alt={menuItem.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">
                {menuItem.name}
              </h3>
              <p className="text-sm text-gray-600">{menuItem.description}</p>
            </div>
            <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded">
              <span className="mr-1">{menuItem.rating}</span>
              <FaStar className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center text-gray-500">
            <p className="text-sm">₹{menuItem.price}</p>
          </div>
          <div className="mt-4">
            <button onClick={(e) => handleAddToCart(e, menuItem)} className="bg-green-500 text-white py-2 px-4 rounded flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
              <FiShoppingBag className="mr-2" />
              Add
            </button>
          </div>
        </div>
      </div>
    </Card>
    </Link>
  );
}
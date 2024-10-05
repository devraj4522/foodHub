"use client"
import { useState, useCallback } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { FaWallet } from "react-icons/fa";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { PaymentMethod, PaymentStatus, OrderStatus } from '@/types/Order';
import { useRecoilState, useRecoilValue } from "recoil";
import { paymentMethodAtom } from "@/recoil/atoms/cartAtom";
import { userAtom } from "@/recoil/atoms/userAtom";
import { cartAtom } from "@/recoil/atoms/cartAtom";
import { toast } from "sonner";
import { selectedAddressAtom } from "@/recoil/atoms/cartAtom";
import { ICreateOrderInput } from "@/types/Order";
import { useRouter } from "next/navigation";
import { showCartAtom } from "@/recoil/atoms/cartAtom";
import { createOrder } from "@/actions/order";
import PlacingOrder from "@/components/Cart/_components/PlacingOrder";

const PaymentSection = () => {
  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentMethodAtom);
  const [isQRVisible, setIsQRVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom)
  const [showCart, setShowCart] = useRecoilState(showCartAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const router = useRouter();
  const user = useRecoilValue(userAtom)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const cartItems = cart?.items || [];

  const totalPrice = cart?.items?.reduce((sum, item) => sum + (item?.menuItem?.price || 0) * (item?.quantity || 0), 0) || 0;

  const handlePaymentMethodChange = useCallback((method: PaymentMethod) => {
    setPaymentMethod(method);
    setIsQRVisible(false);
  }, []);

  const handleCheckout = async () => {
    try {
      if (!user)
      {
        toast.error("User Must Be Sign In.");
        return;
      }
      if (!cart || cart.items.length === 0)
      {
        toast.error("Cart is empty.");
        return;
      }
      if (!user.phone || user.phone === "" || !user.address || user.address === "" || !user.city || user.city === "" || !user.state || user.state === "" || !user.pinCode || user.pinCode === "" || !user.name || user.name === ""){
        router.push("/user-settings");
        toast.error("Please fill in all the required fields in your profile.");
        return;
      }

      if (!selectedAddress || selectedAddress === "")
      {
        toast.error("Must have a delivery address.");
        return;
      }

      setIsLoading(true);
      const orderData: ICreateOrderInput = {
        userId: user.id as string,
        restaurantId: cart?.items[0].menuItem.restaurantId as string,
        totalAmount: totalPrice,
        paymentStatus: PaymentStatus.PENDING,
        paymentVerified: false,
        paymentMethod: paymentMethod,
        orderStatus: OrderStatus.PLACED,
        deliveryAddress: selectedAddress,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
          price: item.menuItem.price,
          specialInstructions: "",
        })),
      };
      const response = await createOrder(orderData);
      toast.success("Order placed successfully!");
      setIsSuccess(true);

      setCart(prevCart => prevCart ? { ...prevCart, items: [] } : null); // Clear the cart items but keep the cart object
      setShowCart(false); // Close the cart modal
      router.push(`/active-order/${response.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      setIsError(true);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Card className="mb-4 shadow-md">
      <CardHeader className="flex gap-3 bg-black text-white">
        <FaWallet size={20} />
        <h2 className="text-lg font-semibold">Payment Method</h2>
      </CardHeader>
      <CardBody>
        <Select 
          label="Select Payment Method" 
          placeholder="Choose a payment method"
          onChange={(e) => handlePaymentMethodChange(e.target.value as PaymentMethod)}
          defaultSelectedKeys={["upi"]}
        >
          <SelectItem key="upi" value="upi">UPI</SelectItem>
          <SelectItem key="cod" value="cod">Cash on Delivery</SelectItem>
        </Select>
        {paymentMethod === 'upi' && (
          <div className="mt-4">
            <p className="mb-2">Pay using UPI</p>
            <div className="relative">
              <Image
                src="https://pngimg.com/uploads/qr_code/qr_code_PNG14.png"
                alt="UPI QR Code"
                width={200}
                height={200}
                className={`w-full h-full object-contain ${isQRVisible ? "" : "blur-[10px] bg-white"}`}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              />
              {!isQRVisible && (
                <Button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white"
                  onClick={() => setIsQRVisible(true)}
                >
                  Scan to Pay
                </Button>
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>

    <Button 
    className="w-full bg-black text-white"
    onClick={handleCheckout}
    disabled={!paymentMethod || (paymentMethod === 'upi' && !isQRVisible)}
    >
    Place Order
    </Button>
    <PlacingOrder isLoading={isLoading} isSuccess={isSuccess} isError={isError}/>
    </>
  );
};

export default PaymentSection;
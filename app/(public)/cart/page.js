import Link from "next/link";
import FormatPrice from "@/helper/FormatPrice";
import { BiArrowBack } from "react-icons/bi";
import CartProduct from "@/components/CartProduct";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ClearCart from "@/components/Buttons/ClearCart";
import CheckoutButton from "@/components/Buttons/CheckoutButton";
import { getUserCart, getCartTotal } from "@/lib/firebase/cart";

export const dynamic = "force-dynamic";

const CartPage = async () => {
  const session = await getServerSession(options);
  let cartproducts = [];
  let totalPrice = 0;

  if (session?.user?.id) {
    try {
      const cartData = await getUserCart(session.user.id);
      console.log("Cart Data from Firebase:", cartData);

      cartproducts = cartData.products || [];
      console.log("Cart Products:", cartproducts);

      totalPrice = await getCartTotal(session.user.id);
      console.log("Cart Total:", totalPrice);
    } catch (error) {
      console.error("Error fetching cart directly from Firebase:", error);
    }
  }

  const isCartEmpty = !cartproducts || cartproducts.length === 0;
  console.log("Is Cart Empty:", isCartEmpty);

  return (
    <div className="snap-y max-w-[90%] m-auto py-12">
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            Shopping Cart
          </h5>
        </div>

        {isCartEmpty ? (
          <div className="snap-start max-w-[90%] m-auto flex flex-col gap-4 items-center justify-center">
            <div className="min-h-[30vh] flex flex-col items-center justify-center">
              <p>Your cart is empty!</p>
              <div>
                <Link href="/products">
                  <div className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1">
                    <BiArrowBack />
                    Go to products
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden snap-start">
                {cartproducts.map((product) => {
                  console.log("Rendering product:", product);
                  return <CartProduct key={product.id} product={product} />;
                })}
              </ul>
            </div>

            <div className="flex self-start mt-5">
              <ClearCart name={"Clear Cart"} />
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>
                  <FormatPrice price={totalPrice} />
                </p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Free Shipping across India!
              </p>
              <div className="mt-6">
                <CheckoutButton
                  products={cartproducts}
                  userId={session?.user?.id}
                />
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p className="flex items-center justify-center gap-2">
                  or
                  <Link href="/products">
                    <button className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1">
                      <BiArrowBack />
                      Continue Shopping
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;

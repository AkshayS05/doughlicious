import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
   const totalPrice = useSelector(getTotalPrice);
   const totalQuantity = useSelector(getTotalQuantity); 

   if(!totalQuantity) return null;

  return (
    <div className="bg-stone-800 text-stone-200 px-4 py-4 sm:px-6 text-sm md:-text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold uppercase space-x-4 sm:space-x-6">
        <span>{totalQuantity} {totalQuantity===1?"pizza": "pizzas"}</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart"> Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;

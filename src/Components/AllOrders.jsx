import { useEffect, useState } from "react";
import OrderStandard from "./OrderStandard";
import { supabase } from "../utils/supabaseClient";

export const styleBtnStatus =
  "text-white px-2 py-1 text-[18px] rounded-lg mx-3 cursor-pointer transition";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'accepted', 'pending'

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`*, halls(phone, price, whatsapp, address , zone), locations(phone, price, whatsapp, address, zone)`)
      .order("id", { ascending: false });
    if (!error) setOrders(data);
  };

  useEffect(() => 
    { fetchOrders(); 
    }, []);

  // تصفية المصفوفة بناءً على الحالة
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <section className="text-center mx-2 p-2 ">
      {/* أزرار الفلترة */}
      <div className="flex justify-center mb-10">
        <button onClick={() => setFilter("all")} className={`${styleBtnStatus} bg-blue-500/50 border border-blue-700 hover:scale-105`}>الكل</button>
        <button onClick={() => setFilter("pending")} className={`${styleBtnStatus} bg-yellow-500/50 border border-yellow-700 hover:scale-105`}>قيد الانتظار</button>
        <button onClick={() => setFilter("accepted")} className={`${styleBtnStatus} bg-green-500/50 border border-green-700 hover:scale-105`}>مقبولة</button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">
        {filteredOrders.map((order) => (
          <OrderStandard key={order.id} orderData={order} onRefresh={fetchOrders} />
        ))}
      </section>
    </section>
  );
}
export default AllOrders;
  
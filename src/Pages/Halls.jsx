import { useState, useMemo } from "react";
import BackgroundImg from "../Components/BackgroundImg";
import CardStandard from "../Components/CardStandard";
import bgImg from "../assets/imgs/halls.jpg";
import { useHallsStore } from "../zustand/hallsStore";

export default function Halls() {
  const { halls } = useHallsStore();
  const [selectedZone, setSelectedZone] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(300000);

  const zones = useMemo(() => {
    const allZones = halls.map((h) => h.zone).filter(Boolean);
    return ["الكل", ...new Set(allZones)];
  }, [halls]);

  const filteredHalls = halls.filter((hall) => {
    const matchZone = selectedZone === "الكل" || hall.zone === selectedZone;
    const matchPrice = hall.price <= maxPrice;
    return matchZone && matchPrice;
  });

  return (
    <div className="min-h-screen ">
      <BackgroundImg img={bgImg} details="" />
    
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 p-6 mt-5 relative z-10">
        
        {/* --- Sidebar (Filtering) --- */}
        <aside className="w-full md:w-[300px] shrink-0 sticky top-24 h-fit">
          <div className="bg-gray-200 backdrop-blur-md p-8 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-purple-700">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-2">
              تصفية النتائج
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
            </h2>

            {/* Filter by Zone */}
            <div className="mb-10">
              <label className="block text-sm font-semibold mb-3 text-gray-600 mr-1">المحافظة</label>
              <select 
                value={selectedZone} 
                onChange={(e) => setSelectedZone(e.target.value)} 
                className="w-full p-3.5 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-purple-700 outline-none transition-all cursor-pointer text-gray-700"
              >
                {zones.map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>

            {/* Filter by Price */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-semibold text-gray-600 mr-1">السعر الأقصى</label>
                <div className="bg-purple-50 px-3 py-1 rounded-lg">
                   <span className="text-purple-600 font-bold text-lg">{maxPrice.toLocaleString()}</span>
                   <span className="text-purple-400 text-xs mr-1">ج.م</span>
                </div>
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="300000" 
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600 transition-all hover:accent-purple-700"
              />
              
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-3 px-1 uppercase tracking-wider">
                <span>0</span>
                <span>50k</span>
                <span>100k+</span>
              </div>
            </div>

            {/* Reset Button */}
            <button 
              onClick={() => { setSelectedZone("الكل"); setMaxPrice(300000); }}
              className="w-full py-4 text-sm font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        </aside>

        {/* --- Main Content (Results) --- */}
        <main className="w-full">
          <div className="flex justify-between items-center mb-8 bg-gray-200 p-4 rounded-2xl border-2 border-purple-700 shadow-sm">
            <h1 className="text-xl md:text-2xl font-black text-gray-800">
              القاعات المتاحة 
              <span className="text-purple-600 mr-2 bg-purple-50 px-3 py-1 rounded-full text-lg">{filteredHalls.length}</span>
            </h1>
            
            {/* Breadcrumb أو Indicator بسيط */}
            <div className="hidden sm:flex gap-2 text-xs font-bold text-gray-400">
              <span>قاعات</span> / <span>{selectedZone}</span>
            </div>
          </div>

          {halls.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 opacity-40">
               <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="font-bold">جاري تحميل القاعات...</p>
            </div>
          ) : filteredHalls.length === 0 ? (
            <div className="text-center py-32 rounded-[2.5rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold text-xl">للأسف، مفيش قاعات بالمواصفات دي حالياً</p>
              <button 
                onClick={() => { setSelectedZone("الكل"); setMaxPrice(100000); }}
                className="mt-4 text-purple-600 underline font-bold"
              >
                جرب تغير الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHalls.map((hall) => (
                <div key={hall.id} className="transform transition-all duration-500 hover:-translate-y-2">
                   <CardStandard btnMassege="عرض" details={hall} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
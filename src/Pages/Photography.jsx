import { useState, useMemo } from "react";
import BackgroundImg from "../Components/BackgroundImg";
import CardStandard from "../Components/CardStandard";
import imgHeader from "../assets/imgs/location.png";
import { useLocatoinsStore } from "../zustand/locationsStore";

export default function Locations() {
  const { locations } = useLocatoinsStore();
  const [selectedZone, setSelectedZone] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(100000);

  // 2. Extract unique zones for the dropdown filter
  const zones = useMemo(() => {
    const allZones = locations.map((loc) => loc.zone).filter(Boolean);
    return ["الكل", ...new Set(allZones)];
  }, [locations]);

  const filteredLocations = locations.filter((loc) => {
    const matchZone = selectedZone === "الكل" || loc.zone === selectedZone;
    const matchPrice = loc.price <= maxPrice;
    return matchZone && matchPrice;
  });

  console.log(locations);
  return (
    <div className="min-h-screen ">
      <BackgroundImg img={imgHeader} details="" />

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
              <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} 
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
                <label className="text-sm font-semibold text-gray-600 mr-1">أقصى سعر للجلسة</label>
                <div className="bg-purple-50 px-3 py-1 rounded-lg">
                  <span className="text-purple-600 font-bold text-lg">{maxPrice.toLocaleString()}</span>
                  <span className="text-purple-400 text-xs mr-1">ج.م</span>
                </div>
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="100000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600 transition-all hover:accent-purple-700"
              />
              
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-wider">
                <span>0</span>
                <span>50k</span>
                <span>100k+</span>
              </div>
            </div>

            {/* Reset Button */}
            <button onClick={() => { setSelectedZone("الكل"); setMaxPrice(100000); }}
              className="w-full py-4 text-sm font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        </aside>

        {/* --- Main Content (Results) --- */}
        <main className="w-full">
          <div className="flex justify-between items-center mb-8 bg-gray-200 p-4 rounded-2xl border-2 border-purple-700 shadow-sm">
            <h1 className="text-xl md:text-2xl font-black text-gray-800">
              المصورين المتاحين 
              <span className="text-purple-600 mr-2 bg-purple-50 px-3 py-1 rounded-full text-lg">{filteredLocations.length}</span>
            </h1>
            
            {/* Indicator */}
            <div className="hidden sm:flex gap-2 text-lg font-bold text-gray-400">
              <span>فوتوجرافر</span> / <span>{selectedZone}</span>
            </div>
          </div>

          {locations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 opacity-40">
               <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="font-bold">جاري تحميل المصورين...</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="text-center py-32  rounded-[2.5rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold text-xl">مفيش مصورين بالمواصفات دي حالياً</p>
              <button onClick={() => { setSelectedZone("الكل"); setMaxPrice(100000); }}
                className="mt-4 text-purple-600 underline font-bold cursor-pointer"
              >
                إظهار الكل
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLocations.map((loc) => (
                <div key={loc.id} className="transform transition-all duration-500 hover:-translate-y-2">
                   <CardStandard btnMassege="عرض" details={loc} />
                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
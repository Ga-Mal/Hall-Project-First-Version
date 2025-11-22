// Maryout Data
import maryoutheader from "../assets/imgs/maryot/maryotHeader.svg";
import maryot1 from "../assets/imgs/maryot/maryot1.png";
import maryot2 from "../assets/imgs/maryot/maryot2.png";
import maryot3 from "../assets/imgs/maryot/maryot3.png";
import maryot4 from "../assets/imgs/maryot/maryot4.png";

// Eros Data
import erosheader from "../assets/imgs/eros/header.svg";
import eros1 from "../assets/imgs/eros/eros1.png";
import eros2 from "../assets/imgs/eros/eros2.png";
import eros3 from "../assets/imgs/eros/eros3.png";
import eros4 from "../assets/imgs/eros/eros4.png";

// Boryfag Data
import boryfagHeader from "../assets/imgs/boryfag/header.svg";
import boryfag1 from "../assets/imgs/boryfag/1.png";
import boryfag2 from "../assets/imgs/boryfag/2.png";
import boryfag3 from "../assets/imgs/boryfag/3.png";
import boryfag4 from "../assets/imgs/boryfag/4.png";

// Kyodeb
import kyodebheader from "../assets/imgs/kyodeb/header.svg";
import kyodeb1 from "../assets/imgs/kyodeb/1.png";
import kyodeb2 from "../assets/imgs/kyodeb/2.png";
import kyodeb3 from "../assets/imgs/kyodeb/3.png";
import kyodeb4 from "../assets/imgs/kyodeb/4.png";

// Le Palase
import lePalaseHeader from "../assets/imgs/le palase/header.svg";
import lePalase1 from "../assets/imgs/le palase/1.png";
import lePalase2 from "../assets/imgs/le palase/2.png";
import lePalase3 from "../assets/imgs/le palase/3.png";
import lePalase4 from "../assets/imgs/le palase/4.png";

// Locations
import loc1header from "../assets/imgs/locations/header.svg";
import loc1 from "../assets/imgs/locations/1.svg";
import loc2 from "../assets/imgs/locations/2.svg";
import loc3 from "../assets/imgs/locations/3.svg";
import loc4 from "../assets/imgs/locations/4.svg";

export const users = [
  { id: 1, name: "gamal", email: "gamal@gmail.com" , password: "5221540" },
  { id: 2, name: "saeed", email: "saeed@gmail.com" , password: "5221541" },
  { id: 3, name: "saad",  email: "saad@gmail.com"  , password: "5221542" },
  { id: 4, name: "ahmed", email: "ahmed@gmail.com" , password: "5221543" },
  { id: 5, name: "admin", email: "admin@gmail.com" , password: "5221544" },
];
 
export const dataHalls = [
  {
    id: 1,
    title: "قاعة افراح ماريوت",
    price: 25000,
    headerImg: maryoutheader,
    urlImgs: [maryot1, maryot2, maryot3, maryot4],
    category: "halls",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    extensions: [
      { name: "جاتوه", peaces: "500", price: 10 },
      { name: "pepsi", peaces: "500", price: 10 },
    ],
    description:
      "قاعة كيوبيد بالزقازيق تُعد من أجمل وأكبر قاعات الأفراح في الشرقية، بتصميم عصري يجمع بين الفخامة والرقي. تتميز بإضاءة مبهرة وخدمة متميزة تهتم بأدق التفاصيل لضمان تجربة فريدة. سواء كان فرحك أو خطوبتك، قاعة كيوبيد هي المكان المثالي ليوم لا يُنسى، وسعة المكان 500 شخص.",
  },
  {
    id: 2,
    title: "قاعة افراح ايروس",
    price: 30000,
    headerImg: erosheader,
    urlImgs: [eros1, eros2, eros3, eros4],
    category: "halls",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    extensions: [
      { name: "جاتوه", peaces: "500", price: 10 },
      { name: "pepsi", peaces: "500", price: 10 },
    ],
    description:
      "قاعة إيروس تُعد من أجمل وأكبر قاعات الأفراح في الشرقية، بتصميم فاخر وخدمة راقية. الإضاءة مبهرة والتفاصيل دقيقة لضمان يوم مميز. سعة المكان 500 شخص.",
  },
  {
    id: 3,
    title: "قاعة افراح كيوبيد",
    price: 15000,
    headerImg: boryfagHeader,
    urlImgs: [boryfag1, boryfag2, boryfag3, boryfag4],
    category: "halls",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    extensions: [
      { name: "جاتوه", peaces: "500", price: 10 },
      { name: "pepsi", peaces: "500", price: 10 },
    ],
    description:
      "قاعة كيوبيد بتصميم فاخر وخدمة ممتازة تناسب المناسبات الخاصة. إضاءة رائعة وسعة المكان 500 شخص.",
  },
  {
    id: 4,
    title: "قاعة افراح البوريفاج",
    price: 20000,
    headerImg: kyodebheader,
    urlImgs: [kyodeb1, kyodeb2, kyodeb3, kyodeb4],
    category: "halls",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    extensions: [
      { name: "جاتوه", peaces: "500", price: 10 },
      { name: "pepsi", peaces: "500", price: 10 },
    ],
    description:
      "قاعة البوريفاج من أشهر القاعات بالزقازيق، بتصميم فاخر وإضاءة جذابة. سعة المكان تصل إلى 500 شخص.",
  },
  {
    id: 5,
    title: "قاعة افراح le palace wedding hall",
    price: 20000,
    headerImg: lePalaseHeader,
    urlImgs: [lePalase1, lePalase2, lePalase3, lePalase4],
    category: "halls",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    extensions: [
      { name: "جاتوه", peaces: "500", price: 10 },
      { name: "pepsi", peaces: "500", price: 10 },
    ],
    description:
      "قاعة Le Palace بتصميم فخم وخدمة ممتازة، واحدة من أفضل القاعات في الشرقية. سعة المكان 500 شخص.",
  },
];

export const photographyData = [
  {
    id: 1,
    title: "البيت الابيض",
    price: 5000,
    headerImg: loc1header,
    urlImgs: [loc1, loc2, loc3, loc4],
    category: "locations",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    description: "تفاصيل عنها",
  },
  {
    id: 2,
    title: "البيت الابيض",
    price: 5000,
    headerImg: loc1header,
    urlImgs: [loc1, loc2, loc3, loc4],
    category: "locations",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    description: "تفاصيل عنها",
  },
];

export const offersData = [
  {
    id: 1,
    title: "البيت الابيض",
    oldPrice: 5000,
    newPrice: 3000,
    headerImg: loc1header,
    urlImgs: [loc1, loc2, loc3, loc4],
    category: "locations",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    description: "تفاصيل عنها",
  },
  {
    id: 2,
    title: "قاعة افراح ايروس",
    oldPrice: 30000,
    newPrice: 25000,
    headerImg: erosheader,
    urlImgs: [eros1, eros2, eros3, eros4],
    category: "halls",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    extensions: [
      { name: "جاتوه", peaces: "500", price: 10 },
      { name: "pepsi", peaces: "500", price: 10 },
    ],
    description:
      "قاعة إيروس تُعد من أجمل وأكبر قاعات الأفراح في الشرقية، بتصميم فاخر وخدمة راقية. الإضاءة مبهرة والتفاصيل دقيقة لضمان يوم مميز. سعة المكان 500 شخص.",
  },
  {
    id: 4,
    title: "قاعة افراح البوريفاج",
    oldPrice: 20000,
    newPrice: 18000,
    headerImg: kyodebheader,
    urlImgs: [kyodeb1, kyodeb2, kyodeb3, kyodeb4],
    category: "halls",
    address: "طريق الاحرار بعد نزلة الكوبرى , Zagazig, Egypt",
    loc: "‏الزقازيق‏، ‏محافظة الشرقية‏، ‏مصر‏",
    phone: "010 40967576",
    whatsapp: "01227814356",
    extensions: [
      { name: "جاتوه", peaces: "500", price: 10 },
      { name: "pepsi", peaces: "500", price: 10 },
    ],
    description:
      "قاعة البوريفاج من أشهر القاعات بالزقازيق، بتصميم فاخر وإضاءة جذابة. سعة المكان تصل إلى 500 شخص.",
  },
];

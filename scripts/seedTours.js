import mongoose from "mongoose";
import Tour from "../model/tour.model.js";

const url = "mongodb+srv://asif:123@cluster0.k4mugdm.mongodb.net/?appName=Cluster0";

const tours = [
  {
    name: "Hunza Valley Tours",
    location: "Hunza",
    description: "Hunza valley tours",
    // price: "PKR 55,000",
    images: ["uploads/deosai.jpg"]
  },
  {
    name: "Naran Valley Tours",
    location: "Naran",
    description: "Naran valley Tours packages",
    //price: "PKR 75,000",
    images: ["uploads/nar1.gif"]
  },

  {
    name: "Peshawar city (4 Days)",
    location: "Fairy Meadows",
    description: "Peshawar Tours packages.",
    //price: "PKR 50,000",
    images: ["uploads/pesh1.jpeg"]
  },

  {
    name: "Lahores Tours",
    description: "Tours packages",
    images: ["uploads/lah1.avif"]
  },
{
  name: "Multan city",
    description: "Tours packages",
    images: ["uploads/mult1.jpg"]
},

{
  name: "Swat valley ",
    description: "Tours packages",
    images: ["uploads/swat1.avif"]
},

{
  name: "Muree valley",
    description: "Tours packages",
    images: ["uploads/pic1.avif"]
},

{
  name: "Chitral Valley",
    description: "Tours packages",
    images: ["uploads/pic2.avif"]
},

{
  name: "Isamabad city",
    description: "Tours packages",
    images: ["uploads/isl1.avif"]
},

{
  name: "Karachi City",
    description: " City of light Tours packages",
    images: ["uploads/kar1.avif"]
}, 
{
  name: "Nellum valley Tours",
    description: "Tours packages",
    images: ["uploads/swat1.avif"]
},
{
  name: "Kalam valley Tours",
    description: "Tours packages",
    images: ["uploads/kalam.png"]
},

//pictures for hunzapage
{
    name: "Peshawar city (4 Days)",
    location: "Fairy Meadows",
    description: "Peshawar Tours packages.",
    price: "PKR 50,000",
    images: ["uploads/hunza1.avif"]
  },

  {
    name: "Peshawar city (4 Days)",
    location: "Fairy Meadows",
    description: "Peshawar Tours packages.",
    price: "PKR 50,000",
    images: ["uploads/hunza1.avif"]
  },

  {
    name: "Peshawar city (4 Days)",
    location: "Fairy Meadows",
    description: "Peshawar Tours packages.",
    price: "PKR 50,000",
    images: ["uploads/hunza1.avif"]
  },

  {
    name: "Peshawar city (4 Days)",
    location: "Fairy Meadows",
    description: "Peshawar Tours packages.",
    price: "PKR 50,000",
    images: ["uploads/hunza1.avif"]
  },




];

async function seedTours() {
  try {
    await mongoose.connect(url);
    await Tour.deleteMany({});
    await Tour.insertMany(tours);
    console.log("Tours seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedTours();








// import mongoose from "mongoose";
// import Tour from "../model/tour.model.js";

// const url = "mongodb+srv://asif:123@cluster0.k4mugdm.mongodb.net/?appName=Cluster0";

// const tours = [
//   {
//     name: "Hunza Valley Deluxe Package (5 Days)",
//     location: "Hunza",
//     description: "Enjoy a 5-day trip including Karimabad, Altit & Baltit Fort, and Attabad Lake.",
//     price: "PKR 55,000",
//     images: ["uploads/deosai.jpg"]
//   },
//   {
//     name: "Hunza & Khunjerab Pass Adventure (7 Days)",
//     location: "Hunza",
//     description: "Full Hunza valley adventure with a trip to Khunjerab Pass, Passu Cones, and Borith Lake.",
//     price: "PKR 75,000",
//     images: ["uploads/mult1.jpg"]
//   },

//   {
//     name: "Hunza & Khunjerab Pass Adventure (7 Days)",
//     location: "Hunza",
//     description: "Full Hunza valley adventure with a trip to Khunjerab Pass, Passu Cones, and Borith Lake.",
//     price: "PKR 75,000",
//     images: ["uploads/mult1.jpg"]
//   },

//   {
//     name: "Hunza & Khunjerab Pass Adventure (7 Days)",
//     location: "Hunza",
//     description: "Full Hunza valley adventure with a trip to Khunjerab Pass, Passu Cones, and Borith Lake.",
//     price: "PKR 75,000",
//     images: ["uploads/mult1.jpg"]
//   },

//   {
//     name: "Hunza & Khunjerab Pass Adventure (7 Days)",
//     location: "Hunza",
//     description: "Full Hunza valley adventure with a trip to Khunjerab Pass, Passu Cones, and Borith Lake.",
//     price: "PKR 75,000",
//     images: ["uploads/mult1.jpg"]
//   },

//   {
//     name: "Hunza & Khunjerab Pass Adventure (7 Days)",
//     location: "Hunza",
//     description: "Full Hunza valley adventure with a trip to Khunjerab Pass, Passu Cones, and Borith Lake.",
//     price: "PKR 75,000",
//     images: ["uploads/mult1.jpg"]
//   },
//   // Add more for each package/image...
// ];

// async function seedTours() {
//   try {
//     await mongoose.connect(url);
//     await Tour.deleteMany({});
//     await Tour.insertMany(tours);
//     console.log("Tours seeded!");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seedTours();
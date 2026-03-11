
import React from 'react';
import { Category, CheatCode, RgsFile } from './types';

export const CHEATS_DATA: CheatCode[] = [
  // Bikes
  { id: 'b1', name: 'Activa / Hero Pleasure', code: '0000', category: Category.BIKES },
  { id: 'b2', name: 'Yamaha R15', code: '0015', category: Category.BIKES },
  { id: 'b3', name: 'KTM', code: '1210', category: Category.BIKES },
  { id: 'b4', name: 'Pulsar', code: '1211', category: Category.BIKES },
  { id: 'b5', name: 'Apache', code: '4050', category: Category.BIKES },
  { id: 'b6', name: 'Duke', code: '4215', category: Category.BIKES },
  { id: 'b7', name: 'Pulsar RS200', code: '5000', category: Category.BIKES },
  { id: 'b8', name: 'Ghost Raider', code: '5555', category: Category.BIKES },
  { id: 'b9', name: 'Super Splendor', code: '6021', category: Category.BIKES },
  { id: 'b10', name: 'Benelli TNT', code: '666', category: Category.BIKES },
  { id: 'b11', name: 'Hayabusa', code: '7000', category: Category.BIKES },
  { id: 'b12', name: 'Ducati Diavel', code: '777', category: Category.BIKES },
  { id: 'b13', name: 'Yamaha FZ10', code: '888', category: Category.BIKES },
  { id: 'b14', name: 'Yamaha Vmax', code: '999', category: Category.BIKES },
  { id: 'b15', name: 'Royal Enfield Bullet', code: '9999', category: Category.BIKES },
  { id: 'b16', name: 'Kawasaki Ninja H2R', code: '3000', category: Category.BIKES },
  { id: 'b17', name: 'Tron Bike', code: '6000', category: Category.BIKES },
  { id: 'b18', name: 'Duke 200', code: '7777', category: Category.BIKES },
  { id: 'b19', name: 'Duke 1290', code: '8888', category: Category.BIKES },
  { id: 'b20', name: 'Flying Bike', code: '9000', category: Category.BIKES },

  // Cars
  { id: 'c1', name: 'Defender', code: '0002', category: Category.CARS },
  { id: 'c2', name: 'Police SUV', code: '101', category: Category.CARS },
  { id: 'c3', name: 'Tarzan', code: '300', category: Category.CARS },
  { id: 'c4', name: 'Nissan GTR', code: '3005', category: Category.CARS },
  { id: 'c5', name: 'Scorpio Classic', code: '333', category: Category.CARS },
  { id: 'c6', name: 'Scorpio S11', code: '444', category: Category.CARS },
  { id: 'c7', name: 'Audi', code: '500', category: Category.CARS },
  { id: 'c8', name: 'Lamborghini v2', code: '700', category: Category.CARS },
  { id: 'c9', name: 'Bugatti v2', code: '800', category: Category.CARS },
  { id: 'c10', name: 'Koenigsegg', code: '900', category: Category.CARS },
  { id: 'c11', name: 'Fortuner', code: '1000', category: Category.CARS },
  { id: 'c12', name: 'Land Cruiser', code: '1820', category: Category.CARS },
  { id: 'c13', name: 'Rolls Royce', code: '2000', category: Category.CARS },
  { id: 'c14', name: 'Endeavour', code: '2020', category: Category.CARS },
  { id: 'c15', name: 'Supra', code: '2244', category: Category.CARS },
  { id: 'c16', name: 'Lamborghini', code: '3333', category: Category.CARS },
  { id: 'c17', name: 'Porsche', code: '4000', category: Category.CARS },
  { id: 'c18', name: 'Cobra / Bugatti Chiron', code: '4444', category: Category.CARS },
  { id: 'c19', name: 'Range Rover / G-Wagon', code: '6666', category: Category.CARS },
  { id: 'c20', name: 'Mustang', code: '8123', category: Category.CARS },
  { id: 'c21', name: 'Rickshaw', code: '8370', category: Category.CARS },
  { id: 'c22', name: 'Hummer', code: '8880', category: Category.CARS },
  { id: 'c23', name: 'Wrangler / Thar Mod', code: '9090', category: Category.CARS },
  { id: 'c24', name: 'Thar', code: '9191', category: Category.CARS },
  { id: 'c25', name: 'Scorpio N', code: '5309', category: Category.CARS },

  // Heavy
  { id: 'h1', name: 'Truck / Pickup', code: '1212', category: Category.HEAVY },
  { id: 'h2', name: 'Truck with Trailer', code: '01212', category: Category.HEAVY },
  { id: 'h3', name: 'Bolero Pickup', code: '3100', category: Category.HEAVY },
  { id: 'h4', name: 'Tank', code: '4040', category: Category.HEAVY },
  { id: 'h5', name: 'Bus', code: '5599', category: Category.HEAVY },
  { id: 'h6', name: 'Tractor', code: '5643', category: Category.HEAVY },
  { id: 'h7', name: 'JCB / Crane', code: '6677', category: Category.HEAVY },
  { id: 'h8', name: 'Fire Truck', code: '606', category: Category.HEAVY },

  // Air / Water
  { id: 'aw1', name: 'Boat', code: '3001', category: Category.AIR_WATER },
  { id: 'aw2', name: 'Jet Pack', code: '320', category: Category.AIR_WATER },
  { id: 'aw3', name: 'Mini Jet Pack', code: '330', category: Category.AIR_WATER },
  { id: 'aw4', name: 'Plane', code: '555', category: Category.AIR_WATER },
  { id: 'aw5', name: 'Helicopter', code: '8000', category: Category.AIR_WATER },
  { id: 'aw6', name: 'UFO', code: '0606', category: Category.AIR_WATER },
  { id: 'aw7', name: 'Hot Air Balloon', code: '0601', category: Category.AIR_WATER },
  { id: 'aw8', name: 'Dragon', code: '0701', category: Category.AIR_WATER },

  // Animals
  { id: 'a1', name: 'Buffalo', code: '6', category: Category.ANIMALS },
  { id: 'a2', name: 'Elephant', code: '10 / 6999', category: Category.ANIMALS },
  { id: 'a3', name: 'Horse', code: '200', category: Category.ANIMALS },
  { id: 'a4', name: 'Dog', code: '600', category: Category.ANIMALS },
  { id: 'a5', name: 'Velociraptor', code: '50', category: Category.ANIMALS },
  { id: 'a6', name: 'T-Rex', code: '51', category: Category.ANIMALS },
  { id: 'a7', name: 'Spinosaurus', code: '52', category: Category.ANIMALS },
  { id: 'a8', name: 'Brachiosaurus', code: '53', category: Category.ANIMALS },
  { id: 'a9', name: 'Dino', code: '5050', category: Category.ANIMALS },
  { id: 'a10', name: 'Dragon', code: '7222', category: Category.ANIMALS },

  // Characters
  { id: 'ch1', name: 'Boy', code: 'boy', category: Category.CHARACTERS },
  { id: 'ch2', name: 'Girl', code: 'girl', category: Category.CHARACTERS },
  { id: 'ch3', name: 'Zombie', code: '2030', category: Category.CHARACTERS },
  { id: 'ch4', name: 'Hulk', code: 'pm10', category: Category.CHARACTERS },
  { id: 'ch5', name: 'Payal RGS', code: 'pm9', category: Category.CHARACTERS },

  // Dance
  { id: 'd1', name: 'Character Dance', code: 'pd1', category: Category.DANCE },
  { id: 'd2', name: 'RGS Tool Dance', code: 'npdance', category: Category.DANCE },

  // Effects
  { id: 'e1', name: 'Fuel / Gas Tank', code: '0 / 00', category: Category.EFFECTS },
  { id: 'e2', name: 'Night Mode', code: '9', category: Category.EFFECTS },
  { id: 'e3', name: 'Slow Motion', code: '1112', category: Category.EFFECTS },
  { id: 'e4', name: 'Skyfall', code: '1120', category: Category.EFFECTS },
  { id: 'e5', name: 'Super Jump', code: '1215', category: Category.EFFECTS },
  { id: 'e6', name: 'Ultra Super Jump', code: '1216', category: Category.EFFECTS },
  { id: 'e7', name: 'More NPCs', code: '12345', category: Category.EFFECTS },
  { id: 'e8', name: 'More Traffic', code: '54321', category: Category.EFFECTS },
  { id: 'e9', name: 'Moon Gravity', code: '7112', category: Category.EFFECTS },
  { id: 'e10', name: 'Infinite Health', code: '9129', category: Category.EFFECTS },
];

export const RGS_FILES_DATA: RgsFile[] = [
  // Characters
  { id: 'rgs_ch1', name: 'Trevor', url: 'https://bikedriving3dcheats.com/game/rgsload/trevor.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch2', name: 'Motu Patlu NPC', url: 'https://bikedriving3dcheats.com/game/rgsload/motupatlunpc.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch3', name: 'BullMen', url: 'https://bikedriving3dcheats.com/game/rgsload/bullmen.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch4', name: 'Doraemon NPC', url: 'https://bikedriving3dcheats.com/game/rgsload/doremon.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch5', name: 'Shinchan NPC', url: 'https://bikedriving3dcheats.com/game/rgsload/shinchan.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch6', name: 'Girl NPC', url: 'https://bikedriving3dcheats.com/game/rgsload/girl.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch7', name: 'Micheal', url: 'https://bikedriving3dcheats.com/game/rgsload/Micheal.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch8', name: 'Pumpkin Boy', url: 'https://bikedriving3dcheats.com/game/rgsload/pumpkinBoy.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch9', name: 'Primo Dancing', url: 'https://bikedriving3dcheats.com/game/rgsload/primo_dancing.glb', category: Category.CHARACTERS },
  { id: 'rgs_ch10', name: 'Dancing Twerk', url: 'https://bikedriving3dcheats.com/game/rgsload/dancing_twerk.glb', category: Category.CHARACTERS },

  // Vehicles / Maps / Props
  { id: 'rgs_v1', name: 'Chevrolet Car', url: 'https://bikedriving3dcheats.com/game/rgsload/ChevroletCar.glb', category: Category.CARS },
  { id: 'rgs_v2', name: 'McQueen Car', url: 'https://bikedriving3dcheats.com/game/rgsload/mcqueencar.glb', category: Category.CARS },
  { id: 'rgs_v3', name: 'Rolls Royce', url: 'https://bikedriving3dcheats.com/game/rgsload/rollsroyce.glb', category: Category.CARS },
  { id: 'rgs_v4', name: 'Bujji Car', url: 'https://bikedriving3dcheats.com/game/rgsload/bujji.glb', category: Category.CARS },
  { id: 'rgs_v5', name: 'Shopping Kart', url: 'https://bikedriving3dcheats.com/game/rgsload/ShopingKart.glb', category: Category.HEAVY },
  { id: 'rgs_v6', name: 'Hover Bike', url: 'https://bikedriving3dcheats.com/game/rgsload/HoverBike.glb', category: Category.BIKES },
  { id: 'rgs_v7', name: 'Buggy', url: 'https://bikedriving3dcheats.com/game/rgsload/Buggy.glb', category: Category.CARS },
  { id: 'rgs_m1', name: 'GTA 5 City Map', url: 'https://bikedriving3dcheats.com/game/rgsload/GTA5CitybyBikeDriving3DCheats-com.glb', category: Category.RGS },
  { id: 'rgs_p1', name: 'Gym Props', url: 'https://bikedriving3dcheats.com/game/rgsload/rgs_63.glb', category: Category.RGS },
  { id: 'rgs_v8', name: 'Royal Enfield Hunter', url: 'https://bikedriving3dcheats.com/game/rgsload/Royal_Enfield_Hunter.glb', category: Category.BIKES },
  { id: 'rgs_v9', name: 'Tung Tung', url: 'https://bikedriving3dcheats.com/game/rgsload/Tung%20Tung.glb', category: Category.BIKES },
  { id: 'rgs_p2', name: 'Dragon Head', url: 'https://bikedriving3dcheats.com/game/rgsload/Dragon_Head.glb', category: Category.RGS },
  { id: 'rgs_v10', name: 'Truck', url: 'https://bikedriving3dcheats.com/game/rgsload/Truck.glb', category: Category.HEAVY },
  { id: 'rgs_v11', name: 'Porsche', url: 'https://bikedriving3dcheats.com/game/rgsload/Poesche.glb', category: Category.CARS },
];

export const CATEGORIES_CONFIG = [
  { name: Category.BIKES, icon: '🏍️', color: 'bg-blue-500' },
  { name: Category.CARS, icon: '🚗', color: 'bg-red-500' },
  { name: Category.HEAVY, icon: '🚛', color: 'bg-yellow-600' },
  { name: Category.ANIMALS, icon: '🐘', color: 'bg-green-500' },
  { name: Category.EFFECTS, icon: '⚡', color: 'bg-purple-500' },
  { name: Category.RGS, icon: '📦', color: 'bg-orange-500' },
];

export const ICONS = {
  Home: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Cheats: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="9" y2="21"/><line x1="15" x2="15" y1="9" y2="21"/>
    </svg>
  ),
  Favorites: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  AI: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
    </svg>
  ),
  Profile: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Search: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Copy: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  ),
  Download: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  ),
  Trash: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
    </svg>
  ),
  ArrowRight: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Logout: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="21" y1="12" y2="12"/><line x1="9" x2="21" y1="12" y2="12"/>
    </svg>
  ),
  Check: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

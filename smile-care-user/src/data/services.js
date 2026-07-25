// Hardcoded in place of the old json-server /services endpoint.
// See src/store/apiSlice.js — getServices reads straight from this array.
export const services = [
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    icon: 'tooth',
    shortDesc: 'Routine check-ups, cleanings, and preventive care.',
    longDesc:
      "Regular check-ups and cleanings are the foundation of a healthy smile. Our general dentistry service covers exams, professional cleaning, cavity detection, and personalized preventive plans so small issues never turn into big ones.",
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    price: 'From Rs. 1,500',
    features: ['Comprehensive oral exam', 'Professional cleaning', 'Cavity screening', 'Oral hygiene plan'],
    fee: 1500,
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    icon: 'smile',
    shortDesc: 'Teeth whitening, veneers, and smile makeovers.',
    longDesc:
      'Enhance your natural beauty with treatments designed around how you want to look and feel. From professional whitening to porcelain veneers, we tailor every plan to your smile goals.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    price: 'From Rs. 8,000',
    features: ['Professional whitening', 'Porcelain veneers', 'Smile design consult', 'Bonding & contouring'],
    fee: 8000,
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    icon: 'tooth-outline',
    shortDesc: 'Permanent solutions for missing teeth.',
    longDesc:
      'Dental implants restore your smile with confidence, functioning and looking just like natural teeth. We guide you through consultation, placement, and aftercare with a focus on long-term comfort.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop',
    price: 'From Rs. 45,000',
    features: ['Single & multiple implants', 'Bone density assessment', 'Custom crown fitting', 'Long-term aftercare'],
    fee: 45000,
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    icon: 'align',
    shortDesc: 'Braces and aligners for a straighter smile.',
    longDesc:
      'Straighten your smile comfortably with traditional braces or clear aligners. We assess your bite and design a treatment timeline that fits your lifestyle.',
    image: 'https://images.unsplash.com/photo-1601945036365-a4295e91ba13?q=80&w=800&auto=format&fit=crop',
    price: 'From Rs. 60,000',
    features: ['Metal & ceramic braces', 'Clear aligners', 'Bite correction', 'Progress tracking'],
    fee: 60000,
  },
  {
    id: 'root-canal-therapy',
    title: 'Root Canal Therapy',
    icon: 'medical',
    shortDesc: 'Relieve pain and save your natural teeth.',
    longDesc:
      "When decay reaches the tooth's pulp, root canal therapy relieves pain and saves the natural tooth from extraction, using modern techniques for a comfortable procedure.",
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    price: 'From Rs. 12,000',
    features: ['Pain relief focus', 'Single-visit option', 'Digital X-ray diagnosis', 'Crown follow-up'],
    fee: 12000,
  },
  {
    id: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    icon: 'child',
    shortDesc: "Specialized care for children's dental health.",
    longDesc:
      'Gentle care for little smiles in a friendly, low-stress environment. We focus on making early dental visits positive experiences that build lifelong habits.',
    image: 'https://images.unsplash.com/photo-1588776814546-ec7dcac54cd5?q=80&w=800&auto=format&fit=crop',
    price: 'From Rs. 1,200',
    features: ['Child-friendly environment', 'Preventive sealants', 'Fluoride treatments', 'Habit counseling'],
    fee: 1200,
  },
];

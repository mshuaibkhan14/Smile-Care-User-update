// Hardcoded in place of the old json-server /dentists endpoint.
// IDs are non-numeric slugs on purpose — keep it that way. When this data
// lived in json-server, numeric-string ids ("1","2"...) broke equality
// filtering because json-server coerced numeric-looking query values to
// actual numbers before comparing. No longer relevant now that filtering
// happens in plain JS (see apiSlice.js), but there's no reason to reintroduce
// numeric-looking ids.
export const dentists = [
  {
    id: 'dr-ayesha-khan',
    name: 'Dr. Ayesha Khan',
    specialization: 'General & Cosmetic Dentistry',
    experience: '12 years experience',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600&auto=format&fit=crop',
    schedule: ['Mon', 'Wed', 'Fri'],
    startTime: '18:00',
    endTime: '21:00',
  },
  {
    id: 'dr-bilal-ahmed',
    name: 'Dr. Bilal Ahmed',
    specialization: 'Orthodontist',
    experience: '9 years experience',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    schedule: ['Tue', 'Thu', 'Sat'],
    startTime: '14:00',
    endTime: '17:00',
  },
  {
    id: 'dr-sana-malik',
    name: 'Dr. Sana Malik',
    specialization: 'Pediatric Dentist',
    experience: '7 years experience',
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=600&auto=format&fit=crop',
    schedule: ['Mon', 'Tue', 'Thu'],
    startTime: '10:00',
    endTime: '13:00',
  },
  {
    id: 'dr-omar-farooq',
    name: 'Dr. Omar Farooq',
    specialization: 'Oral Surgeon & Implants',
    experience: '15 years experience',
    photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=600&auto=format&fit=crop',
    schedule: ['Wed', 'Fri', 'Sat'],
    startTime: '16:00',
    endTime: '19:00',
  },
];

export enum Division {
  DHAKA = 'Dhaka',
  CHITTAGONG = 'Chittagong',
  RAJSHAHI = 'Rajshahi',
  KHULNA = 'Khulna',
  BARISAL = 'Barisal',
  SYLHET = 'Sylhet',
  RANGPUR = 'Rangpur',
  MYMENSINGH = 'Mymensingh',
}

export const DIVISIONS = [
  { value: Division.DHAKA, label: 'Dhaka' },
  { value: Division.CHITTAGONG, label: 'Chittagong' },
  { value: Division.RAJSHAHI, label: 'Rajshahi' },
  { value: Division.KHULNA, label: 'Khulna' },
  { value: Division.BARISAL, label: 'Barisal' },
  { value: Division.SYLHET, label: 'Sylhet' },
  { value: Division.RANGPUR, label: 'Rangpur' },
  { value: Division.MYMENSINGH, label: 'Mymensingh' },
];

export const DISTRICTS_BY_DIVISION: Record<Division, string[]> = {
  [Division.DHAKA]: [
    'Dhaka',
    'Faridpur',
    'Gazipur',
    'Manikganj',
    'Munshiganj',
    'Narayanganj',
    'Tangail',
    'Kishoreganj',
  ],
  [Division.CHITTAGONG]: [
    'Chittagong',
    'Comilla',
    'Noakhali',
    'Feni',
    'Lakshmipur',
    'Cox Bazar',
    'Rangamati',
    'Khagrachari',
  ],
  [Division.RAJSHAHI]: ['Rajshahi', 'Bogura', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna'],
  [Division.KHULNA]: ['Khulna', 'Bagerhat', 'Satkhira', 'Jessore', 'Magura', 'Narail'],
  [Division.BARISAL]: ['Barisal', 'Patuakhali', 'Pirojpur', 'Jhalokati', 'Bhola'],
  [Division.SYLHET]: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  [Division.RANGPUR]: ['Rangpur', 'Dinajpur', 'Thakurgaon', 'Panchagarh', 'Kurigram', 'Gaibandha'],
  [Division.MYMENSINGH]: ['Mymensingh', 'Jamalpur', 'Sherpur', 'Netrokona'],
};

export interface Address {
  id: string;
  userId: string;
  division: string;
  district: string;
  upazila?: string;
  area?: string;
  postalCode?: string;
  detailedAddress: string;
  phone: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  gender?: string;
  dateOfBirth?: Date;
}

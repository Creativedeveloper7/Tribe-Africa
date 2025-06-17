export interface BannerCampaign {
  id: string;
  imageUrl: string;
  altText: string;
  linkUrl?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  priority: number;
}

export const BANNER_CAMPAIGNS: BannerCampaign[] = [
  {
    id: 'main-campaign',
    imageUrl: '/gallery/banner.png',
    altText: 'Tribe Africa - Discover Authentic African Fashion',
    linkUrl: 'https://wa.me/254727399983?text=Hi%20Tribe%20Africa!%20I%20saw%20your%20banner%20and%20I%20want%20to%20explore%20your%20authentic%20African%20fashion%20collection.',
    isActive: true,
    priority: 1
  },
  // Add more banner campaigns here as needed
  // Example seasonal campaign:
  // {
  //   id: 'seasonal-sale',
  //   imageUrl: '/gallery/seasonal-banner.png',
  //   altText: 'Seasonal Sale - Up to 50% Off',
  //   linkUrl: 'https://wa.me/254727399983?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20seasonal%20sale.',
  //   startDate: '2024-06-01',
  //   endDate: '2024-06-30',
  //   isActive: true,
  //   priority: 2
  // },
  // Example new collection campaign:
  // {
  //   id: 'new-collection',
  //   imageUrl: '/gallery/new-collection-banner.png',
  //   altText: 'New Collection - Fresh African Styles',
  //   linkUrl: 'https://wa.me/254727399983?text=Hi!%20I%20want%20to%20see%20your%20new%20collection.',
  //   startDate: '2024-03-01',
  //   endDate: '2024-05-31',
  //   isActive: true,
  //   priority: 3
  // }
];

// Banner configuration settings
export const BANNER_CONFIG = {
  autoRotate: false,
  rotationInterval: 5000, // 5 seconds
  showNavigation: false,
  defaultVisible: true
}; 
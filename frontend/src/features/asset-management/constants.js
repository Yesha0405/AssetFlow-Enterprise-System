export const CATEGORY_OPTIONS = ['Electronics', 'Furniture', 'Office Equipment', 'Mobile Devices', 'Audio/Visual'];

export const STATUS_OPTIONS = ['Available', 'Allocated', 'Maintenance', 'Retired', 'Lost'];

export const DEPARTMENT_OPTIONS = ['IT', 'Operations', 'Finance', 'HR', 'Facilities'];

export const INITIAL_ASSETS = [
  {
    id: 1,
    assetTag: 'AF-0012',
    name: 'Dell Latitude Laptop',
    category: 'Electronics',
    status: 'Allocated',
    location: 'Bengaluru',
    department: 'IT',
    serialNumber: 'DL-1204',
    purchaseDate: '2024-01-16',
    purchaseCost: 1440,
    condition: 'Good',
    description: 'Primary developer workstation',
    bookable: false,
  },
  {
    id: 2,
    assetTag: 'AF-0062',
    name: 'Projector',
    category: 'Audio/Visual',
    status: 'Maintenance',
    location: 'HQ Floor 2',
    department: 'Operations',
    serialNumber: 'PR-2001',
    purchaseDate: '2023-09-02',
    purchaseCost: 890,
    condition: 'Fair',
    description: 'Conference projector for meeting rooms',
    bookable: true,
  },
  {
    id: 3,
    assetTag: 'AF-0201',
    name: 'Office Chair',
    category: 'Furniture',
    status: 'Available',
    location: 'Warehouse',
    department: 'Facilities',
    serialNumber: 'CH-4450',
    purchaseDate: '2022-11-24',
    purchaseCost: 220,
    condition: 'Excellent',
    description: 'Ergonomic office chair',
    bookable: false,
  },
];

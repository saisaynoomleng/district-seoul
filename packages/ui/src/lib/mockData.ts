import { fn } from 'storybook/test';

export const youtubeId = 'I-Y5FHI4JXc';

export const mockImageFile = new File(['hello'], 'image.png', {
  type: 'image/png',
});

export const mockFormAction = fn(async () => {
  return {
    success: true,
    message: 'Submission Successful!',
  };
});

export const mockFormActionError = fn(async () => {
  return {
    success: false,
    message: 'Submission Failed!',
  };
});

export const mockImageUploadAction = fn(async () => {
  return 'image file';
});

export const mockAuthor = {
  bioEn: 'Bio in english',
  bioKo: 'Bio in korean',
  imageAlt: 'image alt text',
  imageAssetId: 'Test Image Id',
  name: 'John Doe',
  slug: 'john-doe-author',
  socialLink: 'https://www.facebook.com',
  specializedIn: 'Fashion',
};

export const mockMilestone = {
  bodyEn: 'Description in english',
  bodyKo: 'Description in korean',
  nameEn: 'Hey English',
  nameKo: 'Hey Korean',
  slug: 'hey-english',
  year: 2025,
};

export const mockBlogCategory = {
  nameEn: 'Fashion in English',
  nameKo: 'Fashion in Korean',
  slug: 'fashion-in-english',
};

export const mockStore = {
  city: 'City',
  country: 'Country',
  email: 'store@mail.com',
  imageAlt: 'image alt text',
  imageAssetId: 'image file',
  isOpened: true,
  latitude: 100,
  longitude: 0,
  nameEn: 'store in english',
  nameKo: 'store in korean',
  phone: '1 234 567 8901',
  reasonForClosingEn: 'Reason in English',
  reasonForClosingKo: 'Reason in Korean',
  slug: 'store-in-english',
  state: 'State',
  storeHours: [
    {
      closingHours: '17:30',
      day: 0,
      openingHours: '08:00',
    },
    {
      closingHours: '17:30',
      day: 1,
      openingHours: '08:00',
    },
    {
      closingHours: '17:30',
      day: 2,
      openingHours: '08:00',
    },
    { closingHours: '17:30', day: 3, openingHours: '08:00' },
    { closingHours: '17:30', day: 4, openingHours: '08:00' },
    { closingHours: '17:30', day: 5, openingHours: '08:00' },
    { closingHours: '17:30', day: 6, openingHours: '08:00' },
  ],
  street: 'Street',
  zip: '100000',
};

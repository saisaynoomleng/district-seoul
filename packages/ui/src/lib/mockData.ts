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

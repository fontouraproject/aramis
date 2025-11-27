
export enum TryOnScreen {
  START,
  CUSTOMER_UPLOAD,
  BUILD_LOOK,
  OPTIONAL_INFO,
  PROCESSING,
  RESULT,
}

export interface ClothingItems {
  top: string | null;
  bottom: string | null;
  shoes: string | null;
}

export type ClothingCategory = keyof ClothingItems;

export const aspectRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"] as const;
export type AspectRatio = typeof aspectRatios[number];

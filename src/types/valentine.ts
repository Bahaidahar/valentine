export interface ValentineCard {
  id: string;
  color: string;
  shape: ValentineShape;
  message: string;
  createdAt: string;
  iat: number;
}

export enum ValentineShape {
  HEART = "heart",
  RECTANGLE = "rectangle",
  CIRCLE = "circle",
}

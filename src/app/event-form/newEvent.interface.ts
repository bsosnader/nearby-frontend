// interfaces help ensure your data is of the right type

export interface newEvent {
  title: string;
  time: string;
  location: string; // there's probably a type for Location
  description: string;
  categories: string[];
  isPlanned: boolean;
  images: File[];

}

// interfaces help ensure your data is of the right type

export interface newEvent {
  title: string;
  description: string;
  lat: string;
  long: string;
  zipcode: string;
  user_email: string;
  comments: Object[];
  upvote_count: number;
  start_time: string;
  end_time: string;
  categories: string[];
}

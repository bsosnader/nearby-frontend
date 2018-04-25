export class Event {
  id: number;
  title: string;
  description: string;
  lat: number;
  lng: number;
  user_email: string;
  time: Date;
  comments: Object;
  upvote_count: number;
}

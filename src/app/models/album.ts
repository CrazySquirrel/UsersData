export class Album {
  userId: number;
  id: number;
  title: string;

  constructor(data) {
    this.userId = data.userId;
    this.id = data.id;
    this.title = data.title;
  }
}

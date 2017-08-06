export class Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;

  constructor(data) {
    this.albumId = data.albumId;
    this.id = data.id;
    this.title = data.title;
    this.url = this.processPhotoLinks(data.url);
    this.thumbnailUrl = this.processPhotoLinks(data.thumbnailUrl);
  }

  private processPhotoLinks(src: string) {
    return src.replace(/^http:/ig, location.protocol);
  }
}

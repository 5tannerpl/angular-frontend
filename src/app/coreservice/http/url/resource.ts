import { UrlLink } from './url';

/**
 * represent a endpoint resource that contains url links
 */
export abstract class Resource {
  constructor(links: UrlLink[] = []) {
    if (links && links instanceof Array && links.length > 0) {
      this._links = links.map(x => new UrlLink(x.rel, x.href));
    }
  }

  _links: UrlLink[];
}

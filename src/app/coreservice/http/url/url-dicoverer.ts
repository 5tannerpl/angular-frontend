import { Injectable } from '@angular/core';
import { Resource } from './resource';
import { UrlLink } from './url';

@Injectable()
export class UrlDiscoverer {
  /**
   * return api link object that represent the resource itself
   * @param resource
   */
  findResourceLink(resource: Resource): UrlLink {
    return this.findLink(resource, 'self');
  }

  /**
   * find api link object with specific name
   * @param resource
   * @param name name of the url link
   */
  findLink(resource: Resource, name: string): UrlLink {
    if (
      !resource ||
      !resource._links ||
      resource._links instanceof Array === false
    ) {
      return;
    }

    for (let i = 0; i < resource._links.length; i++) {
      const link = resource._links[i];

      if (link.rel.toLowerCase() === name.toLowerCase()) {
        return link;
      }
    }

    return;
  }
}

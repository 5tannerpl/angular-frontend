/**
 * parse back end api url in the form of
 * /address/:param where :param is replaced during the runtime
 * @usage: new Url("/form/:formId")
 */
export class Url {
  /**
   * to match url params
   * e.g api/:id where :id is a param
   */
  private readonly _urlParamsRegex = /(\/\:\w+)/gi;

  constructor(private readonly _path: string) {}

  toString(params?: { [key: string]: string | number }): string {
    let urlString = this._path;

    for (const key in params) {
      if (params.hasOwnProperty(key) === false) {
        continue;
      }

      const regex = new RegExp(`\:${key}`, 'i');
      const paramValue = params[key];
      const value =
        typeof paramValue === 'number' ? paramValue.toString() : paramValue;
      urlString = urlString.replace(regex, value);
    }

    /**
     * collapse all unused params
     */
    return urlString.replace(this._urlParamsRegex, '');
  }
}

/**
 * a link that points to a particular endpoint
 */
export class UrlLink {
  constructor(public rel: string, public href: string) {}
}

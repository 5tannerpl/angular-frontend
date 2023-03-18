export class UserRoles {
  static Super = 'Super';
  static CCSuper  = 'CCSuper';
  static CASuper = 'CASuper';
  static CCGroup = 'CCGroup';
}

export class User {
  private _roleSet: Set<string>;

  constructor(username: string,areas:string,authcode:string) {
    this.username = username;
    this.areas = areas;
    this.authcode=authcode;
  }

  username: string;
  areas: string;
  authcode:string;

  hasRole(...roles: string[]) {
    return this.isIn(this._roleSet, roles);
  }

  private isIn<T>(set: Set<T>, values: T[]) {
    for (const val of values) {
      if (set.has(val)) {
        return true;
      }
    }

    return false;
  }
}

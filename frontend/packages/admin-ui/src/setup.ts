export class AdminUIConfig {
  static tokenKey?: string;

  static modules?: string[];

  static setup({
    tokenKey,
    modules,
  }: {
    tokenKey?: string;
    modules?: string[];
  }) {
    this.tokenKey = tokenKey;

    this.modules = modules;
  }
}

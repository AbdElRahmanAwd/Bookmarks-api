// In-memory token blacklist
// For production, use Redis or a database
class TokenBlacklist {
  private blacklist: Set<string>;

  constructor() {
    this.blacklist = new Set();
  }

  add(token: string): void {
    this.blacklist.add(token);
  }

  has(token: string): boolean {
    return this.blacklist.has(token);
  }

  remove(token: string): void {
    this.blacklist.delete(token);
  }

  clear(): void {
    this.blacklist.clear();
  }
}

export const tokenBlacklist = new TokenBlacklist();


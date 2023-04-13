class DIContainer {
  private services: Map<string, any> = new Map();

  register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }

  resolve<T>(key: string): T {
    const instance = this.services.get(key);
    if (!instance) {
      throw new Error(`Service "${key}" not found`);
    }
    return instance as T;
  }
}

export const container = new DIContainer();


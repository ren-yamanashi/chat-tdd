class DIContainer {
  private services: Map<string, any> = new Map();

  register(name: string, instance: any): void {
    this.services.set(name, instance);
  }

  resolve<T>(name: string): T {
    const instance = this.services.get(name);
    if (!instance) {
      throw new Error(`Service "${name}" not found`);
    }
    return instance as T;
  }
}

const container = new DIContainer();
export default container;

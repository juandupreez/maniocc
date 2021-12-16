export interface DependencyInjectionContainer {
    register(dependencyName: string, registerDependency: () => void): void;
    resolve<T>(dependencyName: string, TCreator: { new(): T; }): any

}
type ClassType = { new(...args: any[]): any; };
interface ClassConstructor { new(...args: any[]): any; }
// class ClassConstructor { constructor(...args: any[]): any; }

export class GlobalDependencyInjectionContainer implements DependencyInjectionContainer {

    dependencies: {
        [key: string]: ConfiguredDependency<any>
    } = {}

    register<T>(dependencyName: string, registerDependency: () => T): void {
        const newDependency: ConfiguredDependency<T>
            = new ConfiguredDependency<T>(dependencyName, registerDependency())
        this.dependencies[dependencyName] = newDependency;
    }

    resolve<T>(dependencyName: string, TCreator: { new(...args: any[]): T; }): T {
        const registeredDependency: ConfiguredDependency<T> = this.dependencies[dependencyName];
        if (registeredDependency === undefined) {
            throw new Error('Error resolving dependency with name: '
                + dependencyName
                + ". No such dependency registered");
        }
        if (registeredDependency.dependency instanceof TCreator) {
            return registeredDependency.dependency;
        } else {
            throw new Error('Error resolving dependency with name: '
                + dependencyName
                + ". The type of the registered dependency is incompatable with the desired resoultion type")
        }
    }

}

export class ConfiguredDependency<T> {
    name: string;
    dependency: T;

    constructor(name: string, dependency: T) {
        this.name = name;
        this.dependency = dependency;
    }
}


const container: DependencyInjectionContainer = new GlobalDependencyInjectionContainer()

export default container
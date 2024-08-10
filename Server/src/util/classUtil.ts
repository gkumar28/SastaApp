import { capitalize } from "lodash";
import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

export const Getters = () => <T extends {new(...args:any[]):{}}>(constructor:T) => {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      const props = Reflect.ownKeys(this);
      props.forEach((prop: string | symbol) => {
        const capitalizedKey = capitalize(prop as string);
        const methodName = `get${capitalizedKey}`;
        Object.defineProperty(this, methodName, { value: () => this[prop as keyof this] });
      });
    }
  }
}

export const Setters = () => <T extends {new(...args:any[]):{}}>(constructor:T) => {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      const props = Reflect.ownKeys(this);
      props.forEach((prop: string | symbol) => {
        const capitalizedKey = capitalize(prop as string);
        const methodName = `set${capitalizedKey}`;
        Object.defineProperty(this, methodName, { value: (newValue: any) => { this[prop as keyof this] = newValue } });
      });
    }
  }
}


export function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
 
export function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!;
 
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}
import type { AxiosInstance, AxiosResponse } from 'axios';

type AnyFunction = (...args: any[]) => any;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];
type OverloadedParameters<T> = T extends {
  (...args: infer A): any;
  (...args: infer B): any;
}
  ? A | B
  : T extends (...args: infer A) => any
  ? A
  : never;
type OverloadedReturnType<T> = T extends {
  (...args: any[]): infer A;
  (...args: any[]): infer B;
}
  ? A | B
  : T extends (...args: any[]) => infer A
  ? A
  : never;
type OptionalTuple<T extends any[]> = { [K in keyof T]?: T[K] };
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type CallbackFor<TArgs> = TArgs extends any[] ? (...args: TArgs) => void : never;
type FunctionProps<T> = T extends (...args: any[]) => any
  ? { [K in Exclude<keyof T, keyof Function>]: Mocked<T[K]> }
  : {};
type MockedFunction<T extends AnyFunction> = MockFunction<
  OverloadedParameters<T>,
  T extends AxiosInstance
    ? Promise<AxiosResponse<any, any, {}>>
    : OverloadedReturnType<T>
> &
  T &
  FunctionProps<T>;

interface RepeatControl {
  repeat(times: number): RepeatControl;
  repeatAny(): RepeatControl;
}

interface ExpectationTerminal<R, TArgs extends any[], TOrigArgs extends any[] = TArgs> {
  return(value: R): RepeatControl;
  returnLoose(value?: any): RepeatControl;
  whenCalled(callback: CallbackFor<TOrigArgs>): ExpectationTerminal<R, TArgs, TOrigArgs>;
  repeat(times: number): RepeatControl;
  repeatAny(): RepeatControl;
  throw(error: any): ExpectationTerminal<R, TArgs, TOrigArgs>;
  resolve(value: UnwrapPromise<R>): RepeatControl;
  resolveLoose(value?: any): RepeatControl;
  reject(error: Error): RepeatControl;
}

interface ExpectationChain<TArgs extends any[], R, TOrigArgs extends any[] = TArgs>
  extends ExpectationTerminal<R, TArgs, TOrigArgs> {
  expect(arg?: TArgs[0]): ExpectationChain<Tail<TArgs>, R, TOrigArgs>;
  /** @deprecated Use ignoreAll() instead. */
  expectAnything(): ExpectationChain<any[], R, TOrigArgs>;
  ignoreAll(): ExpectationChain<any[], R, TOrigArgs>;
  expectLoose(...args: any[]): ExpectationChain<any[], any, TOrigArgs>;
  ignore(): ExpectationChain<Tail<TArgs>, R, TOrigArgs>;
  /** @deprecated Use expect() instead. */
  expectArray(
    value?: TArgs[0] extends any[] ? TArgs[0] : any[]
  ): ExpectationChain<Tail<TArgs>, R, TOrigArgs>;
}

interface MockFunction<TArgs extends any[], R> {
  (...args: TArgs): R;
  // Allow any-args calls in addition to the original signature.
  (...args: any[]): any;
  expect(...args: OptionalTuple<TArgs>): ExpectationChain<Tail<TArgs>, R, TArgs>;
  ignore(): ExpectationChain<Tail<TArgs>, R, TArgs>;
  /** @deprecated Use expect() instead. */
  expectArray(
    value?: TArgs[0] extends any[] ? TArgs[0] : any[]
  ): ExpectationChain<Tail<TArgs>, R, TArgs>;
  /** @deprecated Use ignoreAll() instead. */
  expectAnything(): ExpectationChain<any[], R, TArgs>;
  ignoreAll(): ExpectationChain<any[], R, TArgs>;
  // Explicit loose expectations.
  expectLoose(...args: any[]): ExpectationChain<any[], any, TArgs>;
  verify(): true;
  reset(): void;
}

type Mocked<T> = T extends AnyFunction
  ? MockedFunction<T>
  : T extends object
  ? { [K in keyof T]: Mocked<T[K]> } & { verify: () => true }
  : T;

interface RequireExpectation {
  return(value: any): RequireExpectation;
  repeat(times: number): RequireExpectation;
  repeatAny(): RequireExpectation;
  whenCalled(callback: (...args: any[]) => void): RequireExpectation;
}

interface ThenableMock<T = any> {
  (valueToResolveWith?: T | null, errorToFailWith?: any): ThenableMock<T>;
  then<U = T>(
    success?: (value: T) => U | ThenableMock<U> | PromiseLike<U>,
    fail?: (error: any) => U | ThenableMock<U> | PromiseLike<U>
  ): ThenableMock<U>;
  resolve(value?: T): ThenableMock<T>;
  reject(error: any): ThenableMock<never>;
}

declare function mock<T = any[], R = any>(): T extends any[]
  ? MockFunction<T, R>
  : Mocked<T>;
declare function mock<T extends AnyFunction>(
  original: T
): MockedFunction<T>;
declare function mock<T extends object>(subject: T): Mocked<T>;

declare function expectRequire(moduleName: string): RequireExpectation;
declare namespace expectRequire {
  function reset(): void;
}

declare function requireMock<TArgs extends any[] = any[], R = any>(
  moduleName: string
): MockFunction<TArgs, R>;
declare namespace requireMock {
  function reset(): void;
}

declare function promise<T = any>(): ThenableMock<T>;

declare const aMock: {
  mock: typeof mock;
  expectRequire: typeof expectRequire;
  requireMock: typeof requireMock;
  promise: typeof promise;
};

export = aMock;

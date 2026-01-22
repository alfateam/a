type AnyFunction = (...args: any[]) => any;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];
type FunctionProps<T> = T extends (...args: any[]) => any
  ? { [K in Exclude<keyof T, keyof Function>]: Mocked<T[K]> }
  : {};
type MockedFunction<T extends AnyFunction> = MockFunction<
  Parameters<T>,
  ReturnType<T>
> &
  T &
  FunctionProps<T>;

interface RepeatControl {
  repeat(times: number): RepeatControl;
  repeatAny(): RepeatControl;
}

interface ExpectationTerminal<R, TArgs extends any[]> {
  return(value?: R): RepeatControl;
  whenCalled(callback: (...args: TArgs) => void): ExpectationTerminal<R, TArgs>;
  repeat(times: number): RepeatControl;
  repeatAny(): RepeatControl;
  throw(error: unknown): ExpectationTerminal<R, TArgs>;
  resolve(value: any): RepeatControl;
  reject(value: any): RepeatControl;
}

interface ExpectationChain<TArgs extends any[], R>
  extends ExpectationTerminal<R, TArgs> {
  expect(arg: TArgs[0]): ExpectationChain<Tail<TArgs>, R>;
  expectAnything(): ExpectationChain<Tail<TArgs>, R>;
  ignore(): ExpectationChain<Tail<TArgs>, R>;
  expectArray(
    value: TArgs[0] extends any[] ? TArgs[0] : any[]
  ): ExpectationChain<Tail<TArgs>, R>;
}

interface MockFunction<TArgs extends any[], R> {
  (...args: TArgs): R;
  // Allow any-args calls in addition to the original signature.
  (...args: any[]): any;
  expect(): ExpectationTerminal<R, TArgs>;
  expect(...args: TArgs): ExpectationTerminal<R, TArgs>;
  expect(arg: TArgs[0]): ExpectationChain<Tail<TArgs>, R>;
  expectAnything(): ExpectationChain<Tail<TArgs>, R>;
  ignore(): ExpectationChain<Tail<TArgs>, R>;
  expectArray(
    value: TArgs[0] extends any[] ? TArgs[0] : any[]
  ): ExpectationChain<Tail<TArgs>, R>;
  // Allow any-args expectations in addition to typed expectations.
  expect(...args: any[]): ExpectationTerminal<any, any[]>;
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

declare function mock<TArgs extends any[] = any[], R = any>(): MockFunction<
  TArgs,
  R
>;
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

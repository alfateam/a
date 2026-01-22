type AnyFunction = (...args: any[]) => any;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];

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
  expect(): ExpectationTerminal<R, TArgs>;
  expect(...args: TArgs): ExpectationTerminal<R, TArgs>;
  expect(arg: TArgs[0]): ExpectationChain<Tail<TArgs>, R>;
  expectAnything(): ExpectationChain<Tail<TArgs>, R>;
  ignore(): ExpectationChain<Tail<TArgs>, R>;
  expectArray(
    value: TArgs[0] extends any[] ? TArgs[0] : any[]
  ): ExpectationChain<Tail<TArgs>, R>;
  verify(): true;
  reset(): void;
}

type Mocked<T> = T extends (...args: infer A) => infer R
  ? MockFunction<A, R>
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
): MockFunction<Parameters<T>, ReturnType<T>>;
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

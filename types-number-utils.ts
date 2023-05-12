import type { SumArray } from "./types-array-utils";
import type {
  GreaterThanWithStrings,
  Maximum,
  Minimum,
} from "./types-comparisons";
import type { Sum } from "./types-methods-sum";
import type { Minus } from "./types-methods-minus";
import type { ReverseString } from "./types-string-utils";
import type { StringToNumberArrayLarge } from "./types-utils";

type PreMultiply<
  T extends number,
  Y extends number,
  N extends number[] = []
> = N["length"] extends Y ? N : PreMultiply<T, Y, [...N, T]>;

export type Multiply<T extends number, Y extends number> = SumArray<
  PreMultiply<Maximum<T, Y>, Minimum<T, Y>>
>;

export type MultipleByTwo<T extends number> = Multiply<T, 2>;

type EvenNumbers = [0, 2, 4, 6, 8];

export type IsEven<T extends number> =
  ReverseString<`${T}`> extends `${infer A}${infer B}`
    ? A extends `${EvenNumbers[number]}`
      ? true
      : false
    : never;

type PureDivideByTwo<
  T extends number,
  N extends unknown[] = [unknown]
> = Multiply<N["length"], 2> extends infer A
  ? A extends T
    ? N["length"]
    : GreaterThanWithStrings<`${Extract<A, number>}`, `${T}`> extends true
    ? N["length"]
    : PureDivideByTwo<T, [...N, unknown]>
  : never;

export type DivideByTwo<T extends number> = IsEven<T> extends false
  ? [PureDivideByTwo<Minus<T, 1>>, 1]
  : [PureDivideByTwo<T>, 0];

export type Divide<
  T extends number,
  Y extends number,
  N extends unknown[] = [unknown]
> = Y extends 0
  ? 0
  : Y extends 1
  ? T
  : Multiply<N["length"], Y> extends infer A
  ? A extends T
    ? [N["length"], 0]
    : GreaterThanWithStrings<`${Extract<A, number>}`, `${T}`> extends true
    ? [Minus<N["length"], 1>, Minus<Y, Minus<A, T>>]
    : Divide<T, Y, [...N, unknown]>
  : never;

type PureDivideBy10<
  T extends number,
  N extends unknown[] = [unknown]
> = Multiply<N["length"], 10> extends infer A
  ? A extends T
    ? [N["length"], 0]
    : GreaterThanWithStrings<`${Extract<A, number>}`, `${T}`> extends true
    ? [Minus<N["length"], 1>, Minus<10, Minus<A, T>>]
    : PureDivideBy10<T, [...N, unknown]>
  : never;

type PureDivideBy100<
  T extends number,
  N extends unknown[] = [unknown]
> = Multiply<N["length"], 100> extends infer A
  ? A extends T
    ? [N["length"], 0]
    : GreaterThanWithStrings<`${Extract<A, number>}`, `${T}`> extends true
    ? [Minus<N["length"], 1>, Minus<100, Minus<A, T>>]
    : PureDivideBy100<T, [...N, unknown]>
  : never;

export type DivideBy10<T extends number> = PureDivideBy10<T>;
export type DivideBy100<T extends number> = PureDivideBy100<T>;

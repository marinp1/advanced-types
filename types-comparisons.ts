import type { ToCharArray, ToNumber, ToString } from "./types-conversion";
import type { PadNumberStringsStart } from "./types-string-utils";

export type GreaterThanOrEqual<A extends number, B extends number> = A extends B
  ? true
  : GreaterThanWithStrings<`${A}`, `${B}`>;

/**
 * Compare two numbers, works until 1000
 * when recursion limit is reached.
 */
export type GreaterThanWithNumbers<
  A extends number,
  B extends number,
  N extends unknown[] = []
> = N["length"] extends A
  ? false
  : N["length"] extends B
  ? true
  : GreaterThanWithNumbers<A, B, [...N, unknown]>;

/**
 * Compare stringified numbers, works past 1000.
 * Works by comparing most significant digit first
 */
export type GreaterThanWithStrings<
  A1 extends string,
  B1 extends string,
  // Pad numbers so precision is retained (i.e. -> [1,100] -> [001, 100])
  Padded extends [string, string] = PadNumberStringsStart<A1, B1>
> = ToCharArray<Padded["0"]> extends []
  ? never
  : [ToCharArray<Padded["0"]>, ToCharArray<Padded["1"]>] extends [
      [infer AF extends string, ...infer AR extends string[]],
      [infer BF extends string, ...infer BR extends string[]]
    ]
  ? AF extends BF // If first digit is same
    ? AR extends [] // And no other digis remain
      ? GreaterThanWithNumbers<ToNumber<AF>, ToNumber<BF>> // Compare digits
      : GreaterThanWithStrings<ToString<AR>, ToString<BR>> // Compare rest of string
    : GreaterThanWithNumbers<ToNumber<AF>, ToNumber<BF>> // Compare digits
  : never;

export type Maximum<
  A extends number,
  B extends number
> = GreaterThanWithStrings<`${A}`, `${B}`> extends true ? A : B;

export type Minimum<
  A extends number,
  B extends number
> = GreaterThanWithStrings<`${A}`, `${B}`> extends true ? B : A;

export type MaxThree<
  M extends [number, number, number],
  Cand extends number
> = GreaterThanWithStrings<`${Cand}`, `${M["0"]}`> extends true
  ? [Cand, M["0"], M["1"]]
  : GreaterThanWithStrings<`${Cand}`, `${M["1"]}`> extends true
  ? [M["0"], Cand, M["1"]]
  : GreaterThanWithStrings<`${Cand}`, `${M["2"]}`> extends true
  ? [M["0"], M["1"], Cand]
  : [M["0"], M["1"], M["2"]];

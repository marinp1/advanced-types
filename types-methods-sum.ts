import type { ToCharArray, ToNumber, ToString } from "./types-conversion";
import type { ReverseString, PadNumberStringsEnd } from "./types-string-utils";
import type { StringToNumberArray } from "./types-utils";

/**
 * When given two parsed numbers (stringified, reversed and padded)
 * e.g. [0131, 4309] loop through each index
 * and sum the index values together.
 * i.e. [0131, 4392] -> [0, 4, 12, 3]
 */
type ZipDecimalPlaces<
  T extends readonly [string, string],
  S extends readonly any[] = [],
  TargetLen = ToCharArray<T["0"]>["length"]
> = S["length"] extends TargetLen
  ? S
  : T extends readonly [infer A extends string, infer B extends string]
  ? ZipDecimalPlaces<
      T,
      [
        ...S,
        [
          ...StringToNumberArray<ToCharArray<A>[S["length"]]>,
          ...StringToNumberArray<ToCharArray<B>[S["length"]]>
        ]["length"]
      ]
    >
  : never;

/**
 * Convert number to array of same length
 * i.e. 4 -> [unknown, unknown, unknown, unknown]
 */
type NumberToArray<
  A extends number,
  S extends unknown[] = []
> = S["length"] extends A ? S : NumberToArray<A, [...S, unknown]>;

/**
 * Sum numbers together. Works only for < 1000.
 */
export type SimpleSum<A extends number, B extends number> = [
  ...NumberToArray<A>,
  ...NumberToArray<B>
]["length"] extends number
  ? [...NumberToArray<A>, ...NumberToArray<B>]["length"]
  : 0;

/**
 * Constructs a number from an array of digits and their counts
 * i.e [10, 9, 5] means a number
 * which has 10 ones, 9 tens and 5 hundreds.
 * -> 5 * 100 + 9 * 10 + 10 * 1 = 600
 *
 */
type ConstructNumber<
  T extends number[],
  Result extends number[] = [],
  Carry extends number = 0
> = 0 extends T["length"]
  ? Carry extends 0
    ? Result
    : [...Result, Carry]
  : T extends [infer F extends number, ...infer Rest extends any[]]
  ? // Check if with carry the number is at least 10
    `${SimpleSum<F, Carry>}` extends `1${infer C extends number}${infer R}`
    ? ConstructNumber<Rest, [...Result, C], 1> // Pass forward with carry
    : ConstructNumber<Rest, [...Result, SimpleSum<F, Carry>], 0> // Pass forward without carry
  : never;

/**
 * Reverse, pad and zip numbers before sum
 */
type PreSum<A extends number, B extends number> = ZipDecimalPlaces<
  PadNumberStringsEnd<ReverseString<`${A}`>, ReverseString<`${B}`>>
>;

/**
 * Construct and parse zipped number
 */
export type Sum<A extends number, B extends number> = ToNumber<
  ReverseString<ToString<ConstructNumber<PreSum<A, B>>>>
>;

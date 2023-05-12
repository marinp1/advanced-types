import type { GreaterThanWithStrings } from "./types-comparisons";
import type {
  RemoveLeadingZeros,
  ToCharArray,
  ToNumber,
  ToString,
} from "./types-conversion";
import type { SimpleSum } from "./types-methods-sum";
import type { ReverseString, PadNumberStringsEnd } from "./types-string-utils";

export type PreSimpleMinus<
  T extends number,
  Y extends number,
  N extends unknown[] = []
> = T extends SimpleSum<Y, N["length"]>
  ? Extract<N["length"], number>
  : PreSimpleMinus<T, Y, [...N, unknown]>;

type SimpleMinus<T extends number, Y extends number> = GreaterThanWithStrings<
  `${Y}`,
  `${T}`
> extends true
  ? [PreSimpleMinus<Y, T>, "-"]
  : [PreSimpleMinus<T, Y>, "+"];

/**
 * When given two parsed numbers (stringified, reversed and padded)
 * e.g. [4309, 9290] loop through each index
 * and diff the index values together.
 * 9034
 * 0929
 * ----
 * xxx5 -1
 * xx05 +0
 * x105 -1
 * 8105 0
 * ----
 * 8105
 * i.e. [4309, 9290] -> [[-5],[1],[-9],9] -> [[10-5], [1-1], [10-9], [9-1]] -> [5,0,1,8]
 */
type ZipDecimalPlaces<
  T extends readonly [string, string],
  S extends readonly any[] = [],
  Carry extends number = 0,
  TargetLen = ToCharArray<T["0"]>["length"]
> = S["length"] extends TargetLen
  ? S
  : T extends readonly [infer A extends string, infer B extends string]
  ? [
      ToNumber<ToCharArray<A>[S["length"]]>,
      SimpleSum<ToNumber<ToCharArray<B>[S["length"]]>, Carry>
    ] extends [infer C extends number, infer D extends number]
    ? SimpleMinus<C, D> extends [infer E extends number, infer F]
      ? F extends "-"
        ? ZipDecimalPlaces<T, [...S, SimpleMinus<10, E>[0]], 1>
        : ZipDecimalPlaces<T, [...S, E], 0>
      : never
    : never
  : never;

/**
 * Reverse, pad and zip numbers before diff
 */
type PreMinus<A extends number, B extends number> = ZipDecimalPlaces<
  PadNumberStringsEnd<ReverseString<`${A}`>, ReverseString<`${B}`>>
>;

/**
 * Construct and parse zipped number
 */
export type Minus<A extends number, B extends number> = GreaterThanWithStrings<
  `${B}`,
  `${A}`
> extends true
  ? ToNumber<`-${RemoveLeadingZeros<ReverseString<ToString<PreMinus<B, A>>>>}`>
  : ToNumber<ReverseString<ToString<PreMinus<A, B>>>>;

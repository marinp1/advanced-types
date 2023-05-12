import { ToNumber } from "./types-conversion";

type DigitMap = {
  "0": [];
  "1": [unknown];
  "2": [unknown, unknown];
  "3": [unknown, unknown, unknown];
  "4": [unknown, unknown, unknown, unknown];
  "5": [unknown, unknown, unknown, unknown, unknown];
  "6": [unknown, unknown, unknown, unknown, unknown, unknown];
  "7": [unknown, unknown, unknown, unknown, unknown, unknown, unknown];
  "8": [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];
  "9": [
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  ];
};

export type StringToNumberArray<
  T extends string | number,
  S extends string = `${T}`
> = S extends keyof DigitMap ? DigitMap[S] : [];

export type StringToNumberArrayLarge<
  T,
  S extends number | undefined = T extends string
    ? ToNumber<T>
    : T extends number
    ? T
    : undefined,
  N extends unknown[] = []
> = S extends undefined
  ? []
  : S extends N["length"]
  ? N
  : StringToNumberArrayLarge<T, S, [...N, unknown]>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type LastOfUnion<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

export type TuplifyUnion<
  T,
  L = LastOfUnion<T>,
  N = [T] extends [never] ? true : false
> = 0 extends 1
  ? never
  : true extends N
  ? []
  : [...TuplifyUnion<Exclude<T, L>>, L];

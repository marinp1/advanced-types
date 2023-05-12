import type { MaxThree } from "./types-comparisons";
import type { Sum } from "./types-methods-sum";

export type Reverse<T extends any[], C extends any[] = []> = T extends []
  ? C
  : T extends [infer Head, ...infer Rest]
  ? Reverse<Rest, [Head, ...C]>
  : never;

export type Chunk<
  T extends readonly any[],
  Resp extends readonly [any, any][] = []
> = T extends []
  ? Resp
  : T extends readonly [infer A, infer B, ...infer Rest]
  ? Chunk<Rest, [...Resp, [A, B]]>
  : T extends readonly [infer A, ...infer Rest]
  ? Chunk<Rest, [...Resp, [A, 0]]>
  : never;

/**
 * Splits array into chunks of 2
 */
export type ChunkOf2<
  T extends readonly any[],
  U extends any[] = []
> = T extends []
  ? U
  : T extends readonly [infer A, infer B, ...infer Rest]
  ? ChunkOf2<Rest, [...U, [A, B]]>
  : U;

/**
 * Splits array into chunks of 3
 */
export type ChunkOf3<
  T extends readonly any[],
  U extends any[] = []
> = T extends []
  ? U
  : T extends readonly [infer A, infer B, infer C, ...infer Rest]
  ? ChunkOf3<Rest, [...U, [A, B, C]]>
  : U;

/**
 * Splits array into chunks of 10 to work around the recursion limit
 */
export type ChunkOf10<
  T extends readonly any[],
  U extends any[] = []
> = T extends []
  ? U
  : T extends readonly [
      infer A,
      infer B,
      infer C,
      infer D,
      infer E,
      infer F,
      infer G,
      infer H,
      infer I,
      infer J,
      ...infer Rest
    ]
  ? ChunkOf10<Rest, [...U, [A, B, C, D, E, F, G, H, I, J]]>
  : U;

/**
 * Sum array contents together and return
 * Same as .reduce((s, c) => s + c, 0)
 */
export type SumArray<
  T extends readonly number[],
  S extends number = 0
> = T extends []
  ? S
  : T extends readonly [infer A extends number, ...infer Rest extends number[]]
  ? SumArray<Rest, Sum<A, S>>
  : never;

/**
 * When given an array of array of numbers, return an
 * array where child arrays have been summed together
 */
export type SumAndFlatten<
  T extends ReadonlyArray<ReadonlyArray<number>>,
  Summed extends number[] = []
> = T extends []
  ? Summed
  : T extends readonly [
      infer A extends readonly number[],
      ...infer Rest extends ReadonlyArray<ReadonlyArray<number>>
    ]
  ? SumAndFlatten<Rest, [...Summed, SumArray<A>]>
  : never;

/**
 * Sort array of numbers in desceding order, retain
 * the largest three values.
 */
export type SortByDesc<
  T extends readonly number[],
  MaxValues extends [number, number, number] = [0, 0, 0]
> = T extends []
  ? MaxValues
  : T extends [infer A extends number, ...infer Rest extends number[]]
  ? SortByDesc<Rest, MaxThree<MaxValues, A>>
  : never;

/**
 * When given an array of array of numbers, return a sorted
 * array when array values are summed up child arrays
 */
export type SortArray<T extends ReadonlyArray<ReadonlyArray<number>>> =
  SortByDesc<SumAndFlatten<T>>;

export type FlattenArray<T extends any[][], S extends any[] = []> = T extends []
  ? S
  : T extends [infer Head extends any[], ...infer Rest extends any[][]]
  ? FlattenArray<Rest, [...S, ...Head]>
  : T;

export type RemoveLast<T> = T extends []
  ? []
  : T extends [...infer Rest, infer Last]
  ? Rest
  : [];

export type EmptyArrayOfLength<
  N extends number,
  T extends any[] = []
> = 0 extends 1
  ? []
  : T["length"] extends N
  ? T
  : EmptyArrayOfLength<N, [...T, T["length"]]>;

export type Join<
  T extends string[],
  By extends string,
  U extends string = ""
> = T extends []
  ? U
  : T extends [infer Head extends string, ...infer Rest extends any[]]
  ? Join<Rest, By, `${U}${By}${Head}`>
  : never;

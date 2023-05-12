import type { GreaterThanWithStrings } from "./types-comparisons";
import type { ToCharArray } from "./types-conversion";

export type ReverseString<
  T extends string,
  Res extends string = ""
> = T extends ``
  ? Res
  : T extends `${infer F}${infer T}`
  ? ReverseString<T, `${F}${Res}`>
  : T;

export type PadStringEnd<
  A extends string,
  TargetLength extends number,
  PadChar extends string = `0`
> = TargetLength extends ToCharArray<A>["length"]
  ? A
  : PadStringEnd<`${A}${PadChar}`, TargetLength>;

export type PadStringStart<
  A extends string,
  TargetLength extends number,
  PadChar extends string = `0`
> = TargetLength extends ToCharArray<A>["length"]
  ? A
  : PadStringStart<`${PadChar}${A}`, TargetLength>;

export type PadNumberStringsEnd<
  A extends string,
  B extends string,
  ALen extends ToCharArray<A>["length"] = ToCharArray<A>["length"],
  BLen extends ToCharArray<B>["length"] = ToCharArray<B>["length"]
> = ALen extends BLen
  ? [A, B]
  : true extends GreaterThanWithStrings<`${ALen}`, `${BLen}`>
  ? [A, PadStringEnd<B, ALen>]
  : [PadStringEnd<A, BLen>, B];

export type PadNumberStringsStart<
  A extends string,
  B extends string,
  ALen extends ToCharArray<A>["length"] = ToCharArray<A>["length"],
  BLen extends ToCharArray<B>["length"] = ToCharArray<B>["length"]
> = ALen extends BLen
  ? [A, B]
  : true extends GreaterThanWithStrings<`${ALen}`, `${BLen}`>
  ? [A, PadStringStart<B, ALen>]
  : [PadStringStart<A, BLen>, B];

export type SplitStringByChar<
  T extends string,
  S extends string,
  U extends any[] = []
> = 0 extends 1
  ? null
  : T extends ``
  ? U
  : T extends `${infer Head}${S}${infer Tail}`
  ? SplitStringByChar<Tail, S, [...U, Head]>
  : [...U, T];

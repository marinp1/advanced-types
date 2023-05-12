import type { GreaterThanWithStrings, Minimum } from "./types-comparisons";
import type { Minus } from "./types-methods-minus";
import type { Sum } from "./types-methods-sum";
import type { Divide } from "./types-number-utils";
import type { Slice500 } from "./types-slice-500";

export type DropFirstN<T extends readonly any[], N extends number> = N extends 0
  ? T
  : T extends readonly [infer H, ...infer Rest]
  ? DropFirstN<Rest, Minus<N, 1>>
  : never;

type GreaterThanOrEqual<A extends number, B extends number> = A extends B
  ? true
  : GreaterThanWithStrings<`${A}`, `${B}`>;

// Slice v1

export type Slice<
  T extends any[],
  S extends number,
  E extends number,
  N extends number = 0,
  C extends any[] = []
> = 0 extends 1
  ? null
  : Sum<S, N> extends E
  ? C
  : Slice<T, S, E, Sum<N, 1>, [...C, T[Sum<S, N>]]>;

// Slice v2

type SliceLoop<
  T extends readonly any[],
  S extends number,
  LoopCount extends number,
  N extends number = 0,
  U extends any[] = []
> = LoopCount extends N
  ? [U, U["length"]]
  : SliceLoop<
      T,
      Sum<S, 500>,
      LoopCount,
      Sum<N, 1>,
      [...U, ...Slice<T, S, Sum<S, 500>>]
    >;

type AdvancedSlice<
  T extends readonly any[],
  S extends number,
  E extends number,
  N extends number = 0,
  C extends any[] = [],
  D extends [number, number] = Divide<Minus<E, S>, 500>
> = Sum<S, N> extends E
  ? C
  : D["0"] extends 0
  ? Slice<T, Sum<S, N>, E, Sum<N, 1>, [...C, T[Sum<S, N>]]>
  : SliceLoop<T, S, D["0"]> extends [
      infer R1 extends readonly any[],
      infer R2 extends number
    ]
  ? Slice<T, S, E, Sum<N, R2>, [...C, ...R1]>
  : never;

type SliceLoopV2<
  T extends readonly any[],
  LoopCount extends number,
  N extends number = 0,
  U extends any[] = []
> = LoopCount extends N
  ? [U, T]
  : Slice500<T> extends [
      infer H extends readonly any[],
      infer R extends readonly any[]
    ]
  ? SliceLoopV2<R, LoopCount, Sum<N, 1>, [...U, ...H]>
  : never;

// Slice v3

type AdvancedSliceV2<
  T extends readonly any[],
  S extends number,
  E extends number,
  LoopIndex extends number = 0,
  U extends readonly any[] = [],
  D extends [number, number] = Divide<Minus<E, S>, 500>
> = T extends []
  ? U
  : S extends E
  ? U
  : LoopIndex extends 0
  ? S extends 0
    ? AdvancedSliceV2<T, S, E, Sum<LoopIndex, 1>>
    : Divide<S, 500> extends [infer LC, infer ARem]
    ? LC extends 0
      ? AdvancedSliceV2<
          DropFirstN<T, ARem>,
          Minus<S, ARem>,
          Minus<E, ARem>,
          Sum<LoopIndex, 1>
        >
      : AdvancedSliceV2<
          SliceLoopV2<T, LC>[1],
          ARem,
          Sum<Minus<E, S>, ARem>,
          Sum<LoopIndex, 1>
        >
    : never
  : Divide<Minus<E, S>, 500> extends [infer AC, infer LRem]
  ? AC extends 0
    ? LRem extends 0
      ? U
      : [...U, ...Slice<T, S, E>]
    : SliceLoopV2<T, AC> extends [
        infer L1 extends readonly any[],
        infer L2 extends readonly any[]
      ]
    ? AdvancedSliceV2<
        L2,
        0,
        Minus<E, L1["length"]>,
        Sum<LoopIndex, 1>,
        [...U, ...L1]
      >
    : never
  : never;

//

export type SliceMethod<
  T extends any[],
  S extends number,
  E extends number
> = T extends []
  ? []
  : `${S}` extends `-${number}`
  ? []
  : GreaterThanOrEqual<S, E> extends true
  ? []
  : GreaterThanOrEqual<S, T["length"]> extends true
  ? []
  : AdvancedSliceV2<T, S, Minimum<E, T["length"]>>;

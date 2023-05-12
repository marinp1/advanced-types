import type { GreaterThanOrEqual } from "./types-comparisons";
import type { Minus } from "./types-methods-minus";
import type { Sum } from "./types-methods-sum";

import type { SliceMethod, DropFirstN } from "./types-methods-slice";

type SwapArrayIndices<Original extends readonly any[], A, B> = 0 extends 1
  ? null
  : A extends B
  ? Original
  : [
      ...SliceMethod<Original, 0, A>,
      Original[B],
      ...SliceMethod<Original, Sum<A, 1>, B>,
      Original[A],
      ...SliceMethod<Original, Sum<B, 1>, Original["length"]>
    ];

type SwapArrayIndicesSlow<
  T extends readonly any[],
  A extends number,
  B extends number,
  AT extends any = T[A],
  AB extends any = T[B],
  N extends number = 0,
  U extends any[] = []
> = 0 extends 1
  ? never
  : T extends []
  ? U
  : T extends readonly [infer H, ...infer Rest]
  ? N extends A
    ? SwapArrayIndicesSlow<Rest, A, B, AT, AB, Sum<N, 1>, [...U, AB]>
    : N extends B
    ? [...U, AT, ...Rest]
    : SwapArrayIndicesSlow<Rest, A, B, AT, AB, Sum<N, 1>, [...U, H]>
  : never;

type PartitionLoop<
  T extends readonly any[],
  L extends number,
  H extends number,
  I extends number = L,
  J extends number = L
> = 0 extends 1
  ? null
  : GreaterThanOrEqual<J, H> extends true
  ? [SwapArrayIndices<T, I, H>, I]
  : GreaterThanOrEqual<T[H], T[J]> extends true
  ? PartitionLoop<SwapArrayIndices<T, I, J>, L, H, Sum<I, 1>, Sum<J, 1>>
  : PartitionLoop<T, L, H, I, Sum<J, 1>>;

type QuickSort<
  T extends readonly any[],
  L extends number,
  H extends number,
  Depth extends number = 0
> = 0 extends 1
  ? null
  : Depth extends 1000
  ? T
  : H extends 0
  ? T
  : H extends -1
  ? T
  : L extends -1
  ? T
  : GreaterThanOrEqual<L, H> extends true
  ? T
  : PartitionLoop<T, L, H> extends [
      infer P extends any[],
      infer I extends number
    ]
  ? QuickSort<QuickSort<P, L, Minus<I, 1>, Sum<Depth, 1>>, I, H, Sum<Depth, 1>>
  : T;

export type SortByAscendingOrder<T extends readonly any[]> = QuickSort<
  T,
  0,
  Minus<T["length"], 1>
>;

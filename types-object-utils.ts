import type { TuplifyUnion } from "@aoc/types/types-utils";

export type GetObjectValues<
  T extends any,
  Keys extends TuplifyUnion<keyof T> = TuplifyUnion<keyof T>,
  U extends any[] = []
> = Keys extends []
  ? U
  : Keys extends [infer H, ...infer Rest]
  ? GetObjectValues<T, Rest, [...U, T[H]]>
  : never;

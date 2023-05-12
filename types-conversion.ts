export type RemoveLeadingZeros<T extends string> = T extends `0`
  ? `0`
  : T extends `0${infer Rest}`
  ? RemoveLeadingZeros<Rest>
  : T;

export type ToNumber<T extends string> = T extends "-0"
  ? 0
  : RemoveLeadingZeros<T> extends `${infer N extends number}`
  ? N
  : never;

export type ToString<
  T extends readonly (string | number)[],
  S extends string = ""
> = readonly [] extends T
  ? S
  : T extends [
      infer A extends string | number,
      ...infer B extends (string | number)[]
    ]
  ? ToString<B, `${S}${A}`>
  : S;

export type ToCharArray<
  T extends string,
  S extends readonly string[] = []
> = 0 extends 1
  ? null
  : T extends ``
  ? S
  : T extends `${infer A}${infer B}`
  ? ToCharArray<B, [...S, A]>
  : readonly [];

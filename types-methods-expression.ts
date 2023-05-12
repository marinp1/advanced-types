import type { ToNumber } from "./types-conversion";
import type { Minus } from "./types-methods-minus";
import type { Sum } from "./types-methods-sum";

type Operator = "+" | "-";

type GetNumberSign<T extends number> = `${T}` extends `-${infer A}`
  ? ["NEG", ToNumber<A>]
  : ["POS", T];

type EvaluateExpression<
  A extends number,
  E extends Operator,
  B extends number
> = [GetNumberSign<A>, GetNumberSign<B>] extends [
  infer SA extends ["NEG" | "POS", number],
  infer SB extends ["NEG" | "POS", number]
]
  ? [SA[0], SB[0]] extends ["POS", "POS"]
    ? E extends "+"
      ? Sum<SA[1], SB[1]>
      : Minus<SA[1], SB[1]>
    : [SA[0], SB[0]] extends ["POS", "NEG"]
    ? E extends "+"
      ? Minus<SA[1], SB[1]>
      : Sum<SA[1], SB[1]>
    : [SA[0], SB[0]] extends ["NEG", "POS"]
    ? E extends "+"
      ? Minus<SB[1], SA[1]>
      : ToNumber<`-${Sum<SA[1], SB[1]>}`>
    : [SA[0], SB[0]] extends ["NEG", "NEG"]
    ? E extends "+"
      ? ToNumber<`-${Sum<SA[1], SB[1]>}`>
      : ToNumber<`-${Minus<SB[1], SA[1]>}`>
    : never
  : [GetNumberSign<A>, GetNumberSign<B>];

export type Expression<
  T extends string,
  Sum extends number[] = []
> = T extends ``
  ? Sum
  : T extends `${infer A extends number} ${infer Expr extends Operator} ${infer B}`
  ? B extends `${infer C extends number} ${infer R}`
    ? Expression<`${EvaluateExpression<A, Expr, C>} ${R}`>
    : EvaluateExpression<A, Expr, ToNumber<B>>
  : never;

type A = Expression<"1 + 3 - 2 + -40 + 50">;

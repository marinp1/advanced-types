import { Sum, SimpleSum } from "./types-methods-sum";
import { Minus } from "./types-methods-minus";
import { Divide, Multiply } from "./types-number-utils";
import { Expression } from "./types-methods-expression";
import { SortByAscendingOrder } from "./types-methods-sort";

type Sum1 = SimpleSum<500, 23000>;
type Sum2 = Sum<500, 23000>;

type Min1 = Minus<23500, 500>;
type Min2 = Minus<500, 23500>;

type Div = Divide<23500, 503>;
type Mul = Multiply<503, 1200>;

type Expr1 = Expression<"1 + 3 - 2 + -40 + 50">;

type RandomNumbers = [
  915,
  689,
  1860,
  1959,
  23,
  1102,
  538,
  113,
  968,
  1220,
  638,
  1709,
  898,
  1741,
  1142,
  140,
  622,
  1954,
  880,
  842,
  2000,
  4000,
  10000,
  123123,
  12213,
  2132,
  900,
  0,
  0,
  123,
  100,
  900,
  11
];

type Sorted = SortByAscendingOrder<RandomNumbers>;

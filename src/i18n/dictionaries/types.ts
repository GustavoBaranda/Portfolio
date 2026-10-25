import type { esARDictionary } from "./es-AR";

type StringLeaves<T> = T extends string
  ? string
  : T extends readonly unknown[]
    ? { readonly [K in keyof T]: StringLeaves<T[K]> }
    : T extends object
      ? { readonly [K in keyof T]: StringLeaves<T[K]> }
      : never;

export type Dictionary = StringLeaves<typeof esARDictionary>;


/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserInfo
 * 
 */
export type UserInfo = $Result.DefaultSelection<Prisma.$UserInfoPayload>
/**
 * Model UserCertInfo
 * 
 */
export type UserCertInfo = $Result.DefaultSelection<Prisma.$UserCertInfoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserInfos
 * const userInfos = await prisma.userInfo.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserInfos
   * const userInfos = await prisma.userInfo.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userInfo`: Exposes CRUD operations for the **UserInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInfos
    * const userInfos = await prisma.userInfo.findMany()
    * ```
    */
  get userInfo(): Prisma.UserInfoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCertInfo`: Exposes CRUD operations for the **UserCertInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCertInfos
    * const userCertInfos = await prisma.userCertInfo.findMany()
    * ```
    */
  get userCertInfo(): Prisma.UserCertInfoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserInfo: 'UserInfo',
    UserCertInfo: 'UserCertInfo'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userInfo" | "userCertInfo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserInfo: {
        payload: Prisma.$UserInfoPayload<ExtArgs>
        fields: Prisma.UserInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>
          }
          findFirst: {
            args: Prisma.UserInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>
          }
          findMany: {
            args: Prisma.UserInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>[]
          }
          create: {
            args: Prisma.UserInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>
          }
          createMany: {
            args: Prisma.UserInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>[]
          }
          delete: {
            args: Prisma.UserInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>
          }
          update: {
            args: Prisma.UserInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>
          }
          deleteMany: {
            args: Prisma.UserInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>[]
          }
          upsert: {
            args: Prisma.UserInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInfoPayload>
          }
          aggregate: {
            args: Prisma.UserInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserInfo>
          }
          groupBy: {
            args: Prisma.UserInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserInfoCountArgs<ExtArgs>
            result: $Utils.Optional<UserInfoCountAggregateOutputType> | number
          }
        }
      }
      UserCertInfo: {
        payload: Prisma.$UserCertInfoPayload<ExtArgs>
        fields: Prisma.UserCertInfoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCertInfoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCertInfoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>
          }
          findFirst: {
            args: Prisma.UserCertInfoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCertInfoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>
          }
          findMany: {
            args: Prisma.UserCertInfoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>[]
          }
          create: {
            args: Prisma.UserCertInfoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>
          }
          createMany: {
            args: Prisma.UserCertInfoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCertInfoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>[]
          }
          delete: {
            args: Prisma.UserCertInfoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>
          }
          update: {
            args: Prisma.UserCertInfoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>
          }
          deleteMany: {
            args: Prisma.UserCertInfoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCertInfoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserCertInfoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>[]
          }
          upsert: {
            args: Prisma.UserCertInfoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCertInfoPayload>
          }
          aggregate: {
            args: Prisma.UserCertInfoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCertInfo>
          }
          groupBy: {
            args: Prisma.UserCertInfoGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCertInfoGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCertInfoCountArgs<ExtArgs>
            result: $Utils.Optional<UserCertInfoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    userInfo?: UserInfoOmit
    userCertInfo?: UserCertInfoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model UserInfo
   */

  export type AggregateUserInfo = {
    _count: UserInfoCountAggregateOutputType | null
    _min: UserInfoMinAggregateOutputType | null
    _max: UserInfoMaxAggregateOutputType | null
  }

  export type UserInfoMinAggregateOutputType = {
    userId: string | null
    emlAddr: string | null
    userNm: string | null
    userRole: $Enums.UserRole | null
    proflImg: string | null
    userBiogp: string | null
    actvtnYn: boolean | null
    lastLgnDt: Date | null
    crtDt: Date | null
    updtDt: Date | null
    delDt: Date | null
  }

  export type UserInfoMaxAggregateOutputType = {
    userId: string | null
    emlAddr: string | null
    userNm: string | null
    userRole: $Enums.UserRole | null
    proflImg: string | null
    userBiogp: string | null
    actvtnYn: boolean | null
    lastLgnDt: Date | null
    crtDt: Date | null
    updtDt: Date | null
    delDt: Date | null
  }

  export type UserInfoCountAggregateOutputType = {
    userId: number
    emlAddr: number
    userNm: number
    userRole: number
    proflImg: number
    userBiogp: number
    actvtnYn: number
    lastLgnDt: number
    crtDt: number
    updtDt: number
    delDt: number
    _all: number
  }


  export type UserInfoMinAggregateInputType = {
    userId?: true
    emlAddr?: true
    userNm?: true
    userRole?: true
    proflImg?: true
    userBiogp?: true
    actvtnYn?: true
    lastLgnDt?: true
    crtDt?: true
    updtDt?: true
    delDt?: true
  }

  export type UserInfoMaxAggregateInputType = {
    userId?: true
    emlAddr?: true
    userNm?: true
    userRole?: true
    proflImg?: true
    userBiogp?: true
    actvtnYn?: true
    lastLgnDt?: true
    crtDt?: true
    updtDt?: true
    delDt?: true
  }

  export type UserInfoCountAggregateInputType = {
    userId?: true
    emlAddr?: true
    userNm?: true
    userRole?: true
    proflImg?: true
    userBiogp?: true
    actvtnYn?: true
    lastLgnDt?: true
    crtDt?: true
    updtDt?: true
    delDt?: true
    _all?: true
  }

  export type UserInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInfo to aggregate.
     */
    where?: UserInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInfos to fetch.
     */
    orderBy?: UserInfoOrderByWithRelationInput | UserInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInfos
    **/
    _count?: true | UserInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInfoMaxAggregateInputType
  }

  export type GetUserInfoAggregateType<T extends UserInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInfo[P]>
      : GetScalarType<T[P], AggregateUserInfo[P]>
  }




  export type UserInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInfoWhereInput
    orderBy?: UserInfoOrderByWithAggregationInput | UserInfoOrderByWithAggregationInput[]
    by: UserInfoScalarFieldEnum[] | UserInfoScalarFieldEnum
    having?: UserInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInfoCountAggregateInputType | true
    _min?: UserInfoMinAggregateInputType
    _max?: UserInfoMaxAggregateInputType
  }

  export type UserInfoGroupByOutputType = {
    userId: string
    emlAddr: string
    userNm: string
    userRole: $Enums.UserRole
    proflImg: string | null
    userBiogp: string | null
    actvtnYn: boolean
    lastLgnDt: Date | null
    crtDt: Date
    updtDt: Date
    delDt: Date | null
    _count: UserInfoCountAggregateOutputType | null
    _min: UserInfoMinAggregateOutputType | null
    _max: UserInfoMaxAggregateOutputType | null
  }

  type GetUserInfoGroupByPayload<T extends UserInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInfoGroupByOutputType[P]>
            : GetScalarType<T[P], UserInfoGroupByOutputType[P]>
        }
      >
    >


  export type UserInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    emlAddr?: boolean
    userNm?: boolean
    userRole?: boolean
    proflImg?: boolean
    userBiogp?: boolean
    actvtnYn?: boolean
    lastLgnDt?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
    UserCertInfo?: boolean | UserInfo$UserCertInfoArgs<ExtArgs>
  }, ExtArgs["result"]["userInfo"]>

  export type UserInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    emlAddr?: boolean
    userNm?: boolean
    userRole?: boolean
    proflImg?: boolean
    userBiogp?: boolean
    actvtnYn?: boolean
    lastLgnDt?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
  }, ExtArgs["result"]["userInfo"]>

  export type UserInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    emlAddr?: boolean
    userNm?: boolean
    userRole?: boolean
    proflImg?: boolean
    userBiogp?: boolean
    actvtnYn?: boolean
    lastLgnDt?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
  }, ExtArgs["result"]["userInfo"]>

  export type UserInfoSelectScalar = {
    userId?: boolean
    emlAddr?: boolean
    userNm?: boolean
    userRole?: boolean
    proflImg?: boolean
    userBiogp?: boolean
    actvtnYn?: boolean
    lastLgnDt?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
  }

  export type UserInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "emlAddr" | "userNm" | "userRole" | "proflImg" | "userBiogp" | "actvtnYn" | "lastLgnDt" | "crtDt" | "updtDt" | "delDt", ExtArgs["result"]["userInfo"]>
  export type UserInfoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserCertInfo?: boolean | UserInfo$UserCertInfoArgs<ExtArgs>
  }
  export type UserInfoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserInfoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserInfo"
    objects: {
      UserCertInfo: Prisma.$UserCertInfoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      emlAddr: string
      userNm: string
      userRole: $Enums.UserRole
      proflImg: string | null
      userBiogp: string | null
      actvtnYn: boolean
      lastLgnDt: Date | null
      crtDt: Date
      updtDt: Date
      delDt: Date | null
    }, ExtArgs["result"]["userInfo"]>
    composites: {}
  }

  type UserInfoGetPayload<S extends boolean | null | undefined | UserInfoDefaultArgs> = $Result.GetResult<Prisma.$UserInfoPayload, S>

  type UserInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserInfoCountAggregateInputType | true
    }

  export interface UserInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserInfo'], meta: { name: 'UserInfo' } }
    /**
     * Find zero or one UserInfo that matches the filter.
     * @param {UserInfoFindUniqueArgs} args - Arguments to find a UserInfo
     * @example
     * // Get one UserInfo
     * const userInfo = await prisma.userInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInfoFindUniqueArgs>(args: SelectSubset<T, UserInfoFindUniqueArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInfoFindUniqueOrThrowArgs} args - Arguments to find a UserInfo
     * @example
     * // Get one UserInfo
     * const userInfo = await prisma.userInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, UserInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInfoFindFirstArgs} args - Arguments to find a UserInfo
     * @example
     * // Get one UserInfo
     * const userInfo = await prisma.userInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInfoFindFirstArgs>(args?: SelectSubset<T, UserInfoFindFirstArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInfoFindFirstOrThrowArgs} args - Arguments to find a UserInfo
     * @example
     * // Get one UserInfo
     * const userInfo = await prisma.userInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, UserInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInfos
     * const userInfos = await prisma.userInfo.findMany()
     * 
     * // Get first 10 UserInfos
     * const userInfos = await prisma.userInfo.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userInfoWithUserIdOnly = await prisma.userInfo.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserInfoFindManyArgs>(args?: SelectSubset<T, UserInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserInfo.
     * @param {UserInfoCreateArgs} args - Arguments to create a UserInfo.
     * @example
     * // Create one UserInfo
     * const UserInfo = await prisma.userInfo.create({
     *   data: {
     *     // ... data to create a UserInfo
     *   }
     * })
     * 
     */
    create<T extends UserInfoCreateArgs>(args: SelectSubset<T, UserInfoCreateArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserInfos.
     * @param {UserInfoCreateManyArgs} args - Arguments to create many UserInfos.
     * @example
     * // Create many UserInfos
     * const userInfo = await prisma.userInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserInfoCreateManyArgs>(args?: SelectSubset<T, UserInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserInfos and returns the data saved in the database.
     * @param {UserInfoCreateManyAndReturnArgs} args - Arguments to create many UserInfos.
     * @example
     * // Create many UserInfos
     * const userInfo = await prisma.userInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserInfos and only return the `userId`
     * const userInfoWithUserIdOnly = await prisma.userInfo.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, UserInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserInfo.
     * @param {UserInfoDeleteArgs} args - Arguments to delete one UserInfo.
     * @example
     * // Delete one UserInfo
     * const UserInfo = await prisma.userInfo.delete({
     *   where: {
     *     // ... filter to delete one UserInfo
     *   }
     * })
     * 
     */
    delete<T extends UserInfoDeleteArgs>(args: SelectSubset<T, UserInfoDeleteArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserInfo.
     * @param {UserInfoUpdateArgs} args - Arguments to update one UserInfo.
     * @example
     * // Update one UserInfo
     * const userInfo = await prisma.userInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserInfoUpdateArgs>(args: SelectSubset<T, UserInfoUpdateArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserInfos.
     * @param {UserInfoDeleteManyArgs} args - Arguments to filter UserInfos to delete.
     * @example
     * // Delete a few UserInfos
     * const { count } = await prisma.userInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserInfoDeleteManyArgs>(args?: SelectSubset<T, UserInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInfos
     * const userInfo = await prisma.userInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserInfoUpdateManyArgs>(args: SelectSubset<T, UserInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInfos and returns the data updated in the database.
     * @param {UserInfoUpdateManyAndReturnArgs} args - Arguments to update many UserInfos.
     * @example
     * // Update many UserInfos
     * const userInfo = await prisma.userInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserInfos and only return the `userId`
     * const userInfoWithUserIdOnly = await prisma.userInfo.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, UserInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserInfo.
     * @param {UserInfoUpsertArgs} args - Arguments to update or create a UserInfo.
     * @example
     * // Update or create a UserInfo
     * const userInfo = await prisma.userInfo.upsert({
     *   create: {
     *     // ... data to create a UserInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInfo we want to update
     *   }
     * })
     */
    upsert<T extends UserInfoUpsertArgs>(args: SelectSubset<T, UserInfoUpsertArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInfoCountArgs} args - Arguments to filter UserInfos to count.
     * @example
     * // Count the number of UserInfos
     * const count = await prisma.userInfo.count({
     *   where: {
     *     // ... the filter for the UserInfos we want to count
     *   }
     * })
    **/
    count<T extends UserInfoCountArgs>(
      args?: Subset<T, UserInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserInfoAggregateArgs>(args: Subset<T, UserInfoAggregateArgs>): Prisma.PrismaPromise<GetUserInfoAggregateType<T>>

    /**
     * Group by UserInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInfoGroupByArgs['orderBy'] }
        : { orderBy?: UserInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserInfo model
   */
  readonly fields: UserInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    UserCertInfo<T extends UserInfo$UserCertInfoArgs<ExtArgs> = {}>(args?: Subset<T, UserInfo$UserCertInfoArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserInfo model
   */
  interface UserInfoFieldRefs {
    readonly userId: FieldRef<"UserInfo", 'String'>
    readonly emlAddr: FieldRef<"UserInfo", 'String'>
    readonly userNm: FieldRef<"UserInfo", 'String'>
    readonly userRole: FieldRef<"UserInfo", 'UserRole'>
    readonly proflImg: FieldRef<"UserInfo", 'String'>
    readonly userBiogp: FieldRef<"UserInfo", 'String'>
    readonly actvtnYn: FieldRef<"UserInfo", 'Boolean'>
    readonly lastLgnDt: FieldRef<"UserInfo", 'DateTime'>
    readonly crtDt: FieldRef<"UserInfo", 'DateTime'>
    readonly updtDt: FieldRef<"UserInfo", 'DateTime'>
    readonly delDt: FieldRef<"UserInfo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserInfo findUnique
   */
  export type UserInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserInfo to fetch.
     */
    where: UserInfoWhereUniqueInput
  }

  /**
   * UserInfo findUniqueOrThrow
   */
  export type UserInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserInfo to fetch.
     */
    where: UserInfoWhereUniqueInput
  }

  /**
   * UserInfo findFirst
   */
  export type UserInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserInfo to fetch.
     */
    where?: UserInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInfos to fetch.
     */
    orderBy?: UserInfoOrderByWithRelationInput | UserInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInfos.
     */
    cursor?: UserInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInfos.
     */
    distinct?: UserInfoScalarFieldEnum | UserInfoScalarFieldEnum[]
  }

  /**
   * UserInfo findFirstOrThrow
   */
  export type UserInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserInfo to fetch.
     */
    where?: UserInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInfos to fetch.
     */
    orderBy?: UserInfoOrderByWithRelationInput | UserInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInfos.
     */
    cursor?: UserInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInfos.
     */
    distinct?: UserInfoScalarFieldEnum | UserInfoScalarFieldEnum[]
  }

  /**
   * UserInfo findMany
   */
  export type UserInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserInfos to fetch.
     */
    where?: UserInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInfos to fetch.
     */
    orderBy?: UserInfoOrderByWithRelationInput | UserInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInfos.
     */
    cursor?: UserInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInfos.
     */
    skip?: number
    distinct?: UserInfoScalarFieldEnum | UserInfoScalarFieldEnum[]
  }

  /**
   * UserInfo create
   */
  export type UserInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * The data needed to create a UserInfo.
     */
    data: XOR<UserInfoCreateInput, UserInfoUncheckedCreateInput>
  }

  /**
   * UserInfo createMany
   */
  export type UserInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInfos.
     */
    data: UserInfoCreateManyInput | UserInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserInfo createManyAndReturn
   */
  export type UserInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * The data used to create many UserInfos.
     */
    data: UserInfoCreateManyInput | UserInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserInfo update
   */
  export type UserInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * The data needed to update a UserInfo.
     */
    data: XOR<UserInfoUpdateInput, UserInfoUncheckedUpdateInput>
    /**
     * Choose, which UserInfo to update.
     */
    where: UserInfoWhereUniqueInput
  }

  /**
   * UserInfo updateMany
   */
  export type UserInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInfos.
     */
    data: XOR<UserInfoUpdateManyMutationInput, UserInfoUncheckedUpdateManyInput>
    /**
     * Filter which UserInfos to update
     */
    where?: UserInfoWhereInput
    /**
     * Limit how many UserInfos to update.
     */
    limit?: number
  }

  /**
   * UserInfo updateManyAndReturn
   */
  export type UserInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * The data used to update UserInfos.
     */
    data: XOR<UserInfoUpdateManyMutationInput, UserInfoUncheckedUpdateManyInput>
    /**
     * Filter which UserInfos to update
     */
    where?: UserInfoWhereInput
    /**
     * Limit how many UserInfos to update.
     */
    limit?: number
  }

  /**
   * UserInfo upsert
   */
  export type UserInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * The filter to search for the UserInfo to update in case it exists.
     */
    where: UserInfoWhereUniqueInput
    /**
     * In case the UserInfo found by the `where` argument doesn't exist, create a new UserInfo with this data.
     */
    create: XOR<UserInfoCreateInput, UserInfoUncheckedCreateInput>
    /**
     * In case the UserInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserInfoUpdateInput, UserInfoUncheckedUpdateInput>
  }

  /**
   * UserInfo delete
   */
  export type UserInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
    /**
     * Filter which UserInfo to delete.
     */
    where: UserInfoWhereUniqueInput
  }

  /**
   * UserInfo deleteMany
   */
  export type UserInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInfos to delete
     */
    where?: UserInfoWhereInput
    /**
     * Limit how many UserInfos to delete.
     */
    limit?: number
  }

  /**
   * UserInfo.UserCertInfo
   */
  export type UserInfo$UserCertInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    where?: UserCertInfoWhereInput
  }

  /**
   * UserInfo without action
   */
  export type UserInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInfo
     */
    select?: UserInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInfo
     */
    omit?: UserInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInfoInclude<ExtArgs> | null
  }


  /**
   * Model UserCertInfo
   */

  export type AggregateUserCertInfo = {
    _count: UserCertInfoCountAggregateOutputType | null
    _min: UserCertInfoMinAggregateOutputType | null
    _max: UserCertInfoMaxAggregateOutputType | null
  }

  export type UserCertInfoMinAggregateOutputType = {
    userCertId: string | null
    userId: string | null
    encptPswd: string | null
    reshToken: string | null
    delYn: boolean | null
    crtDt: Date | null
    updtDt: Date | null
    delDt: Date | null
  }

  export type UserCertInfoMaxAggregateOutputType = {
    userCertId: string | null
    userId: string | null
    encptPswd: string | null
    reshToken: string | null
    delYn: boolean | null
    crtDt: Date | null
    updtDt: Date | null
    delDt: Date | null
  }

  export type UserCertInfoCountAggregateOutputType = {
    userCertId: number
    userId: number
    encptPswd: number
    reshToken: number
    delYn: number
    crtDt: number
    updtDt: number
    delDt: number
    _all: number
  }


  export type UserCertInfoMinAggregateInputType = {
    userCertId?: true
    userId?: true
    encptPswd?: true
    reshToken?: true
    delYn?: true
    crtDt?: true
    updtDt?: true
    delDt?: true
  }

  export type UserCertInfoMaxAggregateInputType = {
    userCertId?: true
    userId?: true
    encptPswd?: true
    reshToken?: true
    delYn?: true
    crtDt?: true
    updtDt?: true
    delDt?: true
  }

  export type UserCertInfoCountAggregateInputType = {
    userCertId?: true
    userId?: true
    encptPswd?: true
    reshToken?: true
    delYn?: true
    crtDt?: true
    updtDt?: true
    delDt?: true
    _all?: true
  }

  export type UserCertInfoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCertInfo to aggregate.
     */
    where?: UserCertInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCertInfos to fetch.
     */
    orderBy?: UserCertInfoOrderByWithRelationInput | UserCertInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCertInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCertInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCertInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCertInfos
    **/
    _count?: true | UserCertInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCertInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCertInfoMaxAggregateInputType
  }

  export type GetUserCertInfoAggregateType<T extends UserCertInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCertInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCertInfo[P]>
      : GetScalarType<T[P], AggregateUserCertInfo[P]>
  }




  export type UserCertInfoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCertInfoWhereInput
    orderBy?: UserCertInfoOrderByWithAggregationInput | UserCertInfoOrderByWithAggregationInput[]
    by: UserCertInfoScalarFieldEnum[] | UserCertInfoScalarFieldEnum
    having?: UserCertInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCertInfoCountAggregateInputType | true
    _min?: UserCertInfoMinAggregateInputType
    _max?: UserCertInfoMaxAggregateInputType
  }

  export type UserCertInfoGroupByOutputType = {
    userCertId: string
    userId: string
    encptPswd: string
    reshToken: string | null
    delYn: boolean
    crtDt: Date
    updtDt: Date
    delDt: Date | null
    _count: UserCertInfoCountAggregateOutputType | null
    _min: UserCertInfoMinAggregateOutputType | null
    _max: UserCertInfoMaxAggregateOutputType | null
  }

  type GetUserCertInfoGroupByPayload<T extends UserCertInfoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCertInfoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCertInfoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCertInfoGroupByOutputType[P]>
            : GetScalarType<T[P], UserCertInfoGroupByOutputType[P]>
        }
      >
    >


  export type UserCertInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userCertId?: boolean
    userId?: boolean
    encptPswd?: boolean
    reshToken?: boolean
    delYn?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
    user?: boolean | UserInfoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCertInfo"]>

  export type UserCertInfoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userCertId?: boolean
    userId?: boolean
    encptPswd?: boolean
    reshToken?: boolean
    delYn?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
    user?: boolean | UserInfoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCertInfo"]>

  export type UserCertInfoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userCertId?: boolean
    userId?: boolean
    encptPswd?: boolean
    reshToken?: boolean
    delYn?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
    user?: boolean | UserInfoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCertInfo"]>

  export type UserCertInfoSelectScalar = {
    userCertId?: boolean
    userId?: boolean
    encptPswd?: boolean
    reshToken?: boolean
    delYn?: boolean
    crtDt?: boolean
    updtDt?: boolean
    delDt?: boolean
  }

  export type UserCertInfoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userCertId" | "userId" | "encptPswd" | "reshToken" | "delYn" | "crtDt" | "updtDt" | "delDt", ExtArgs["result"]["userCertInfo"]>
  export type UserCertInfoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserInfoDefaultArgs<ExtArgs>
  }
  export type UserCertInfoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserInfoDefaultArgs<ExtArgs>
  }
  export type UserCertInfoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserInfoDefaultArgs<ExtArgs>
  }

  export type $UserCertInfoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCertInfo"
    objects: {
      user: Prisma.$UserInfoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userCertId: string
      userId: string
      encptPswd: string
      reshToken: string | null
      delYn: boolean
      crtDt: Date
      updtDt: Date
      delDt: Date | null
    }, ExtArgs["result"]["userCertInfo"]>
    composites: {}
  }

  type UserCertInfoGetPayload<S extends boolean | null | undefined | UserCertInfoDefaultArgs> = $Result.GetResult<Prisma.$UserCertInfoPayload, S>

  type UserCertInfoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCertInfoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCertInfoCountAggregateInputType | true
    }

  export interface UserCertInfoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCertInfo'], meta: { name: 'UserCertInfo' } }
    /**
     * Find zero or one UserCertInfo that matches the filter.
     * @param {UserCertInfoFindUniqueArgs} args - Arguments to find a UserCertInfo
     * @example
     * // Get one UserCertInfo
     * const userCertInfo = await prisma.userCertInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCertInfoFindUniqueArgs>(args: SelectSubset<T, UserCertInfoFindUniqueArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCertInfo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCertInfoFindUniqueOrThrowArgs} args - Arguments to find a UserCertInfo
     * @example
     * // Get one UserCertInfo
     * const userCertInfo = await prisma.userCertInfo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCertInfoFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCertInfoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCertInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCertInfoFindFirstArgs} args - Arguments to find a UserCertInfo
     * @example
     * // Get one UserCertInfo
     * const userCertInfo = await prisma.userCertInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCertInfoFindFirstArgs>(args?: SelectSubset<T, UserCertInfoFindFirstArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCertInfo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCertInfoFindFirstOrThrowArgs} args - Arguments to find a UserCertInfo
     * @example
     * // Get one UserCertInfo
     * const userCertInfo = await prisma.userCertInfo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCertInfoFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCertInfoFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCertInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCertInfoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCertInfos
     * const userCertInfos = await prisma.userCertInfo.findMany()
     * 
     * // Get first 10 UserCertInfos
     * const userCertInfos = await prisma.userCertInfo.findMany({ take: 10 })
     * 
     * // Only select the `userCertId`
     * const userCertInfoWithUserCertIdOnly = await prisma.userCertInfo.findMany({ select: { userCertId: true } })
     * 
     */
    findMany<T extends UserCertInfoFindManyArgs>(args?: SelectSubset<T, UserCertInfoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCertInfo.
     * @param {UserCertInfoCreateArgs} args - Arguments to create a UserCertInfo.
     * @example
     * // Create one UserCertInfo
     * const UserCertInfo = await prisma.userCertInfo.create({
     *   data: {
     *     // ... data to create a UserCertInfo
     *   }
     * })
     * 
     */
    create<T extends UserCertInfoCreateArgs>(args: SelectSubset<T, UserCertInfoCreateArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCertInfos.
     * @param {UserCertInfoCreateManyArgs} args - Arguments to create many UserCertInfos.
     * @example
     * // Create many UserCertInfos
     * const userCertInfo = await prisma.userCertInfo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCertInfoCreateManyArgs>(args?: SelectSubset<T, UserCertInfoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserCertInfos and returns the data saved in the database.
     * @param {UserCertInfoCreateManyAndReturnArgs} args - Arguments to create many UserCertInfos.
     * @example
     * // Create many UserCertInfos
     * const userCertInfo = await prisma.userCertInfo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserCertInfos and only return the `userCertId`
     * const userCertInfoWithUserCertIdOnly = await prisma.userCertInfo.createManyAndReturn({
     *   select: { userCertId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCertInfoCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCertInfoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserCertInfo.
     * @param {UserCertInfoDeleteArgs} args - Arguments to delete one UserCertInfo.
     * @example
     * // Delete one UserCertInfo
     * const UserCertInfo = await prisma.userCertInfo.delete({
     *   where: {
     *     // ... filter to delete one UserCertInfo
     *   }
     * })
     * 
     */
    delete<T extends UserCertInfoDeleteArgs>(args: SelectSubset<T, UserCertInfoDeleteArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCertInfo.
     * @param {UserCertInfoUpdateArgs} args - Arguments to update one UserCertInfo.
     * @example
     * // Update one UserCertInfo
     * const userCertInfo = await prisma.userCertInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCertInfoUpdateArgs>(args: SelectSubset<T, UserCertInfoUpdateArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCertInfos.
     * @param {UserCertInfoDeleteManyArgs} args - Arguments to filter UserCertInfos to delete.
     * @example
     * // Delete a few UserCertInfos
     * const { count } = await prisma.userCertInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCertInfoDeleteManyArgs>(args?: SelectSubset<T, UserCertInfoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCertInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCertInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCertInfos
     * const userCertInfo = await prisma.userCertInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCertInfoUpdateManyArgs>(args: SelectSubset<T, UserCertInfoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCertInfos and returns the data updated in the database.
     * @param {UserCertInfoUpdateManyAndReturnArgs} args - Arguments to update many UserCertInfos.
     * @example
     * // Update many UserCertInfos
     * const userCertInfo = await prisma.userCertInfo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserCertInfos and only return the `userCertId`
     * const userCertInfoWithUserCertIdOnly = await prisma.userCertInfo.updateManyAndReturn({
     *   select: { userCertId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserCertInfoUpdateManyAndReturnArgs>(args: SelectSubset<T, UserCertInfoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserCertInfo.
     * @param {UserCertInfoUpsertArgs} args - Arguments to update or create a UserCertInfo.
     * @example
     * // Update or create a UserCertInfo
     * const userCertInfo = await prisma.userCertInfo.upsert({
     *   create: {
     *     // ... data to create a UserCertInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCertInfo we want to update
     *   }
     * })
     */
    upsert<T extends UserCertInfoUpsertArgs>(args: SelectSubset<T, UserCertInfoUpsertArgs<ExtArgs>>): Prisma__UserCertInfoClient<$Result.GetResult<Prisma.$UserCertInfoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCertInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCertInfoCountArgs} args - Arguments to filter UserCertInfos to count.
     * @example
     * // Count the number of UserCertInfos
     * const count = await prisma.userCertInfo.count({
     *   where: {
     *     // ... the filter for the UserCertInfos we want to count
     *   }
     * })
    **/
    count<T extends UserCertInfoCountArgs>(
      args?: Subset<T, UserCertInfoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCertInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCertInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCertInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCertInfoAggregateArgs>(args: Subset<T, UserCertInfoAggregateArgs>): Prisma.PrismaPromise<GetUserCertInfoAggregateType<T>>

    /**
     * Group by UserCertInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCertInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCertInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCertInfoGroupByArgs['orderBy'] }
        : { orderBy?: UserCertInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCertInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCertInfoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCertInfo model
   */
  readonly fields: UserCertInfoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCertInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCertInfoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserInfoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserInfoDefaultArgs<ExtArgs>>): Prisma__UserInfoClient<$Result.GetResult<Prisma.$UserInfoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCertInfo model
   */
  interface UserCertInfoFieldRefs {
    readonly userCertId: FieldRef<"UserCertInfo", 'String'>
    readonly userId: FieldRef<"UserCertInfo", 'String'>
    readonly encptPswd: FieldRef<"UserCertInfo", 'String'>
    readonly reshToken: FieldRef<"UserCertInfo", 'String'>
    readonly delYn: FieldRef<"UserCertInfo", 'Boolean'>
    readonly crtDt: FieldRef<"UserCertInfo", 'DateTime'>
    readonly updtDt: FieldRef<"UserCertInfo", 'DateTime'>
    readonly delDt: FieldRef<"UserCertInfo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCertInfo findUnique
   */
  export type UserCertInfoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserCertInfo to fetch.
     */
    where: UserCertInfoWhereUniqueInput
  }

  /**
   * UserCertInfo findUniqueOrThrow
   */
  export type UserCertInfoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserCertInfo to fetch.
     */
    where: UserCertInfoWhereUniqueInput
  }

  /**
   * UserCertInfo findFirst
   */
  export type UserCertInfoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserCertInfo to fetch.
     */
    where?: UserCertInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCertInfos to fetch.
     */
    orderBy?: UserCertInfoOrderByWithRelationInput | UserCertInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCertInfos.
     */
    cursor?: UserCertInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCertInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCertInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCertInfos.
     */
    distinct?: UserCertInfoScalarFieldEnum | UserCertInfoScalarFieldEnum[]
  }

  /**
   * UserCertInfo findFirstOrThrow
   */
  export type UserCertInfoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserCertInfo to fetch.
     */
    where?: UserCertInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCertInfos to fetch.
     */
    orderBy?: UserCertInfoOrderByWithRelationInput | UserCertInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCertInfos.
     */
    cursor?: UserCertInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCertInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCertInfos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCertInfos.
     */
    distinct?: UserCertInfoScalarFieldEnum | UserCertInfoScalarFieldEnum[]
  }

  /**
   * UserCertInfo findMany
   */
  export type UserCertInfoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * Filter, which UserCertInfos to fetch.
     */
    where?: UserCertInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCertInfos to fetch.
     */
    orderBy?: UserCertInfoOrderByWithRelationInput | UserCertInfoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCertInfos.
     */
    cursor?: UserCertInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCertInfos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCertInfos.
     */
    skip?: number
    distinct?: UserCertInfoScalarFieldEnum | UserCertInfoScalarFieldEnum[]
  }

  /**
   * UserCertInfo create
   */
  export type UserCertInfoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCertInfo.
     */
    data: XOR<UserCertInfoCreateInput, UserCertInfoUncheckedCreateInput>
  }

  /**
   * UserCertInfo createMany
   */
  export type UserCertInfoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCertInfos.
     */
    data: UserCertInfoCreateManyInput | UserCertInfoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserCertInfo createManyAndReturn
   */
  export type UserCertInfoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * The data used to create many UserCertInfos.
     */
    data: UserCertInfoCreateManyInput | UserCertInfoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCertInfo update
   */
  export type UserCertInfoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCertInfo.
     */
    data: XOR<UserCertInfoUpdateInput, UserCertInfoUncheckedUpdateInput>
    /**
     * Choose, which UserCertInfo to update.
     */
    where: UserCertInfoWhereUniqueInput
  }

  /**
   * UserCertInfo updateMany
   */
  export type UserCertInfoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCertInfos.
     */
    data: XOR<UserCertInfoUpdateManyMutationInput, UserCertInfoUncheckedUpdateManyInput>
    /**
     * Filter which UserCertInfos to update
     */
    where?: UserCertInfoWhereInput
    /**
     * Limit how many UserCertInfos to update.
     */
    limit?: number
  }

  /**
   * UserCertInfo updateManyAndReturn
   */
  export type UserCertInfoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * The data used to update UserCertInfos.
     */
    data: XOR<UserCertInfoUpdateManyMutationInput, UserCertInfoUncheckedUpdateManyInput>
    /**
     * Filter which UserCertInfos to update
     */
    where?: UserCertInfoWhereInput
    /**
     * Limit how many UserCertInfos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCertInfo upsert
   */
  export type UserCertInfoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCertInfo to update in case it exists.
     */
    where: UserCertInfoWhereUniqueInput
    /**
     * In case the UserCertInfo found by the `where` argument doesn't exist, create a new UserCertInfo with this data.
     */
    create: XOR<UserCertInfoCreateInput, UserCertInfoUncheckedCreateInput>
    /**
     * In case the UserCertInfo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCertInfoUpdateInput, UserCertInfoUncheckedUpdateInput>
  }

  /**
   * UserCertInfo delete
   */
  export type UserCertInfoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
    /**
     * Filter which UserCertInfo to delete.
     */
    where: UserCertInfoWhereUniqueInput
  }

  /**
   * UserCertInfo deleteMany
   */
  export type UserCertInfoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCertInfos to delete
     */
    where?: UserCertInfoWhereInput
    /**
     * Limit how many UserCertInfos to delete.
     */
    limit?: number
  }

  /**
   * UserCertInfo without action
   */
  export type UserCertInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCertInfo
     */
    select?: UserCertInfoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCertInfo
     */
    omit?: UserCertInfoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCertInfoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserInfoScalarFieldEnum: {
    userId: 'userId',
    emlAddr: 'emlAddr',
    userNm: 'userNm',
    userRole: 'userRole',
    proflImg: 'proflImg',
    userBiogp: 'userBiogp',
    actvtnYn: 'actvtnYn',
    lastLgnDt: 'lastLgnDt',
    crtDt: 'crtDt',
    updtDt: 'updtDt',
    delDt: 'delDt'
  };

  export type UserInfoScalarFieldEnum = (typeof UserInfoScalarFieldEnum)[keyof typeof UserInfoScalarFieldEnum]


  export const UserCertInfoScalarFieldEnum: {
    userCertId: 'userCertId',
    userId: 'userId',
    encptPswd: 'encptPswd',
    reshToken: 'reshToken',
    delYn: 'delYn',
    crtDt: 'crtDt',
    updtDt: 'updtDt',
    delDt: 'delDt'
  };

  export type UserCertInfoScalarFieldEnum = (typeof UserCertInfoScalarFieldEnum)[keyof typeof UserCertInfoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserInfoWhereInput = {
    AND?: UserInfoWhereInput | UserInfoWhereInput[]
    OR?: UserInfoWhereInput[]
    NOT?: UserInfoWhereInput | UserInfoWhereInput[]
    userId?: StringFilter<"UserInfo"> | string
    emlAddr?: StringFilter<"UserInfo"> | string
    userNm?: StringFilter<"UserInfo"> | string
    userRole?: EnumUserRoleFilter<"UserInfo"> | $Enums.UserRole
    proflImg?: StringNullableFilter<"UserInfo"> | string | null
    userBiogp?: StringNullableFilter<"UserInfo"> | string | null
    actvtnYn?: BoolFilter<"UserInfo"> | boolean
    lastLgnDt?: DateTimeNullableFilter<"UserInfo"> | Date | string | null
    crtDt?: DateTimeFilter<"UserInfo"> | Date | string
    updtDt?: DateTimeFilter<"UserInfo"> | Date | string
    delDt?: DateTimeNullableFilter<"UserInfo"> | Date | string | null
    UserCertInfo?: XOR<UserCertInfoNullableScalarRelationFilter, UserCertInfoWhereInput> | null
  }

  export type UserInfoOrderByWithRelationInput = {
    userId?: SortOrder
    emlAddr?: SortOrder
    userNm?: SortOrder
    userRole?: SortOrder
    proflImg?: SortOrderInput | SortOrder
    userBiogp?: SortOrderInput | SortOrder
    actvtnYn?: SortOrder
    lastLgnDt?: SortOrderInput | SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrderInput | SortOrder
    UserCertInfo?: UserCertInfoOrderByWithRelationInput
  }

  export type UserInfoWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    emlAddr?: string
    userNm?: string
    AND?: UserInfoWhereInput | UserInfoWhereInput[]
    OR?: UserInfoWhereInput[]
    NOT?: UserInfoWhereInput | UserInfoWhereInput[]
    userRole?: EnumUserRoleFilter<"UserInfo"> | $Enums.UserRole
    proflImg?: StringNullableFilter<"UserInfo"> | string | null
    userBiogp?: StringNullableFilter<"UserInfo"> | string | null
    actvtnYn?: BoolFilter<"UserInfo"> | boolean
    lastLgnDt?: DateTimeNullableFilter<"UserInfo"> | Date | string | null
    crtDt?: DateTimeFilter<"UserInfo"> | Date | string
    updtDt?: DateTimeFilter<"UserInfo"> | Date | string
    delDt?: DateTimeNullableFilter<"UserInfo"> | Date | string | null
    UserCertInfo?: XOR<UserCertInfoNullableScalarRelationFilter, UserCertInfoWhereInput> | null
  }, "userId" | "emlAddr" | "userNm">

  export type UserInfoOrderByWithAggregationInput = {
    userId?: SortOrder
    emlAddr?: SortOrder
    userNm?: SortOrder
    userRole?: SortOrder
    proflImg?: SortOrderInput | SortOrder
    userBiogp?: SortOrderInput | SortOrder
    actvtnYn?: SortOrder
    lastLgnDt?: SortOrderInput | SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrderInput | SortOrder
    _count?: UserInfoCountOrderByAggregateInput
    _max?: UserInfoMaxOrderByAggregateInput
    _min?: UserInfoMinOrderByAggregateInput
  }

  export type UserInfoScalarWhereWithAggregatesInput = {
    AND?: UserInfoScalarWhereWithAggregatesInput | UserInfoScalarWhereWithAggregatesInput[]
    OR?: UserInfoScalarWhereWithAggregatesInput[]
    NOT?: UserInfoScalarWhereWithAggregatesInput | UserInfoScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserInfo"> | string
    emlAddr?: StringWithAggregatesFilter<"UserInfo"> | string
    userNm?: StringWithAggregatesFilter<"UserInfo"> | string
    userRole?: EnumUserRoleWithAggregatesFilter<"UserInfo"> | $Enums.UserRole
    proflImg?: StringNullableWithAggregatesFilter<"UserInfo"> | string | null
    userBiogp?: StringNullableWithAggregatesFilter<"UserInfo"> | string | null
    actvtnYn?: BoolWithAggregatesFilter<"UserInfo"> | boolean
    lastLgnDt?: DateTimeNullableWithAggregatesFilter<"UserInfo"> | Date | string | null
    crtDt?: DateTimeWithAggregatesFilter<"UserInfo"> | Date | string
    updtDt?: DateTimeWithAggregatesFilter<"UserInfo"> | Date | string
    delDt?: DateTimeNullableWithAggregatesFilter<"UserInfo"> | Date | string | null
  }

  export type UserCertInfoWhereInput = {
    AND?: UserCertInfoWhereInput | UserCertInfoWhereInput[]
    OR?: UserCertInfoWhereInput[]
    NOT?: UserCertInfoWhereInput | UserCertInfoWhereInput[]
    userCertId?: StringFilter<"UserCertInfo"> | string
    userId?: StringFilter<"UserCertInfo"> | string
    encptPswd?: StringFilter<"UserCertInfo"> | string
    reshToken?: StringNullableFilter<"UserCertInfo"> | string | null
    delYn?: BoolFilter<"UserCertInfo"> | boolean
    crtDt?: DateTimeFilter<"UserCertInfo"> | Date | string
    updtDt?: DateTimeFilter<"UserCertInfo"> | Date | string
    delDt?: DateTimeNullableFilter<"UserCertInfo"> | Date | string | null
    user?: XOR<UserInfoScalarRelationFilter, UserInfoWhereInput>
  }

  export type UserCertInfoOrderByWithRelationInput = {
    userCertId?: SortOrder
    userId?: SortOrder
    encptPswd?: SortOrder
    reshToken?: SortOrderInput | SortOrder
    delYn?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrderInput | SortOrder
    user?: UserInfoOrderByWithRelationInput
  }

  export type UserCertInfoWhereUniqueInput = Prisma.AtLeast<{
    userCertId?: string
    userId?: string
    AND?: UserCertInfoWhereInput | UserCertInfoWhereInput[]
    OR?: UserCertInfoWhereInput[]
    NOT?: UserCertInfoWhereInput | UserCertInfoWhereInput[]
    encptPswd?: StringFilter<"UserCertInfo"> | string
    reshToken?: StringNullableFilter<"UserCertInfo"> | string | null
    delYn?: BoolFilter<"UserCertInfo"> | boolean
    crtDt?: DateTimeFilter<"UserCertInfo"> | Date | string
    updtDt?: DateTimeFilter<"UserCertInfo"> | Date | string
    delDt?: DateTimeNullableFilter<"UserCertInfo"> | Date | string | null
    user?: XOR<UserInfoScalarRelationFilter, UserInfoWhereInput>
  }, "userCertId" | "userId">

  export type UserCertInfoOrderByWithAggregationInput = {
    userCertId?: SortOrder
    userId?: SortOrder
    encptPswd?: SortOrder
    reshToken?: SortOrderInput | SortOrder
    delYn?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrderInput | SortOrder
    _count?: UserCertInfoCountOrderByAggregateInput
    _max?: UserCertInfoMaxOrderByAggregateInput
    _min?: UserCertInfoMinOrderByAggregateInput
  }

  export type UserCertInfoScalarWhereWithAggregatesInput = {
    AND?: UserCertInfoScalarWhereWithAggregatesInput | UserCertInfoScalarWhereWithAggregatesInput[]
    OR?: UserCertInfoScalarWhereWithAggregatesInput[]
    NOT?: UserCertInfoScalarWhereWithAggregatesInput | UserCertInfoScalarWhereWithAggregatesInput[]
    userCertId?: StringWithAggregatesFilter<"UserCertInfo"> | string
    userId?: StringWithAggregatesFilter<"UserCertInfo"> | string
    encptPswd?: StringWithAggregatesFilter<"UserCertInfo"> | string
    reshToken?: StringNullableWithAggregatesFilter<"UserCertInfo"> | string | null
    delYn?: BoolWithAggregatesFilter<"UserCertInfo"> | boolean
    crtDt?: DateTimeWithAggregatesFilter<"UserCertInfo"> | Date | string
    updtDt?: DateTimeWithAggregatesFilter<"UserCertInfo"> | Date | string
    delDt?: DateTimeNullableWithAggregatesFilter<"UserCertInfo"> | Date | string | null
  }

  export type UserInfoCreateInput = {
    userId?: string
    emlAddr: string
    userNm: string
    userRole?: $Enums.UserRole
    proflImg?: string | null
    userBiogp?: string | null
    actvtnYn?: boolean
    lastLgnDt?: Date | string | null
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
    UserCertInfo?: UserCertInfoCreateNestedOneWithoutUserInput
  }

  export type UserInfoUncheckedCreateInput = {
    userId?: string
    emlAddr: string
    userNm: string
    userRole?: $Enums.UserRole
    proflImg?: string | null
    userBiogp?: string | null
    actvtnYn?: boolean
    lastLgnDt?: Date | string | null
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
    UserCertInfo?: UserCertInfoUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserInfoUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emlAddr?: StringFieldUpdateOperationsInput | string
    userNm?: StringFieldUpdateOperationsInput | string
    userRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    proflImg?: NullableStringFieldUpdateOperationsInput | string | null
    userBiogp?: NullableStringFieldUpdateOperationsInput | string | null
    actvtnYn?: BoolFieldUpdateOperationsInput | boolean
    lastLgnDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UserCertInfo?: UserCertInfoUpdateOneWithoutUserNestedInput
  }

  export type UserInfoUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emlAddr?: StringFieldUpdateOperationsInput | string
    userNm?: StringFieldUpdateOperationsInput | string
    userRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    proflImg?: NullableStringFieldUpdateOperationsInput | string | null
    userBiogp?: NullableStringFieldUpdateOperationsInput | string | null
    actvtnYn?: BoolFieldUpdateOperationsInput | boolean
    lastLgnDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UserCertInfo?: UserCertInfoUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserInfoCreateManyInput = {
    userId?: string
    emlAddr: string
    userNm: string
    userRole?: $Enums.UserRole
    proflImg?: string | null
    userBiogp?: string | null
    actvtnYn?: boolean
    lastLgnDt?: Date | string | null
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
  }

  export type UserInfoUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emlAddr?: StringFieldUpdateOperationsInput | string
    userNm?: StringFieldUpdateOperationsInput | string
    userRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    proflImg?: NullableStringFieldUpdateOperationsInput | string | null
    userBiogp?: NullableStringFieldUpdateOperationsInput | string | null
    actvtnYn?: BoolFieldUpdateOperationsInput | boolean
    lastLgnDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserInfoUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emlAddr?: StringFieldUpdateOperationsInput | string
    userNm?: StringFieldUpdateOperationsInput | string
    userRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    proflImg?: NullableStringFieldUpdateOperationsInput | string | null
    userBiogp?: NullableStringFieldUpdateOperationsInput | string | null
    actvtnYn?: BoolFieldUpdateOperationsInput | boolean
    lastLgnDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCertInfoCreateInput = {
    userCertId?: string
    encptPswd: string
    reshToken?: string | null
    delYn?: boolean
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
    user: UserInfoCreateNestedOneWithoutUserCertInfoInput
  }

  export type UserCertInfoUncheckedCreateInput = {
    userCertId?: string
    userId: string
    encptPswd: string
    reshToken?: string | null
    delYn?: boolean
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
  }

  export type UserCertInfoUpdateInput = {
    userCertId?: StringFieldUpdateOperationsInput | string
    encptPswd?: StringFieldUpdateOperationsInput | string
    reshToken?: NullableStringFieldUpdateOperationsInput | string | null
    delYn?: BoolFieldUpdateOperationsInput | boolean
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserInfoUpdateOneRequiredWithoutUserCertInfoNestedInput
  }

  export type UserCertInfoUncheckedUpdateInput = {
    userCertId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    encptPswd?: StringFieldUpdateOperationsInput | string
    reshToken?: NullableStringFieldUpdateOperationsInput | string | null
    delYn?: BoolFieldUpdateOperationsInput | boolean
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCertInfoCreateManyInput = {
    userCertId?: string
    userId: string
    encptPswd: string
    reshToken?: string | null
    delYn?: boolean
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
  }

  export type UserCertInfoUpdateManyMutationInput = {
    userCertId?: StringFieldUpdateOperationsInput | string
    encptPswd?: StringFieldUpdateOperationsInput | string
    reshToken?: NullableStringFieldUpdateOperationsInput | string | null
    delYn?: BoolFieldUpdateOperationsInput | boolean
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCertInfoUncheckedUpdateManyInput = {
    userCertId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    encptPswd?: StringFieldUpdateOperationsInput | string
    reshToken?: NullableStringFieldUpdateOperationsInput | string | null
    delYn?: BoolFieldUpdateOperationsInput | boolean
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCertInfoNullableScalarRelationFilter = {
    is?: UserCertInfoWhereInput | null
    isNot?: UserCertInfoWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserInfoCountOrderByAggregateInput = {
    userId?: SortOrder
    emlAddr?: SortOrder
    userNm?: SortOrder
    userRole?: SortOrder
    proflImg?: SortOrder
    userBiogp?: SortOrder
    actvtnYn?: SortOrder
    lastLgnDt?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrder
  }

  export type UserInfoMaxOrderByAggregateInput = {
    userId?: SortOrder
    emlAddr?: SortOrder
    userNm?: SortOrder
    userRole?: SortOrder
    proflImg?: SortOrder
    userBiogp?: SortOrder
    actvtnYn?: SortOrder
    lastLgnDt?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrder
  }

  export type UserInfoMinOrderByAggregateInput = {
    userId?: SortOrder
    emlAddr?: SortOrder
    userNm?: SortOrder
    userRole?: SortOrder
    proflImg?: SortOrder
    userBiogp?: SortOrder
    actvtnYn?: SortOrder
    lastLgnDt?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserInfoScalarRelationFilter = {
    is?: UserInfoWhereInput
    isNot?: UserInfoWhereInput
  }

  export type UserCertInfoCountOrderByAggregateInput = {
    userCertId?: SortOrder
    userId?: SortOrder
    encptPswd?: SortOrder
    reshToken?: SortOrder
    delYn?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrder
  }

  export type UserCertInfoMaxOrderByAggregateInput = {
    userCertId?: SortOrder
    userId?: SortOrder
    encptPswd?: SortOrder
    reshToken?: SortOrder
    delYn?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrder
  }

  export type UserCertInfoMinOrderByAggregateInput = {
    userCertId?: SortOrder
    userId?: SortOrder
    encptPswd?: SortOrder
    reshToken?: SortOrder
    delYn?: SortOrder
    crtDt?: SortOrder
    updtDt?: SortOrder
    delDt?: SortOrder
  }

  export type UserCertInfoCreateNestedOneWithoutUserInput = {
    create?: XOR<UserCertInfoCreateWithoutUserInput, UserCertInfoUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserCertInfoCreateOrConnectWithoutUserInput
    connect?: UserCertInfoWhereUniqueInput
  }

  export type UserCertInfoUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserCertInfoCreateWithoutUserInput, UserCertInfoUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserCertInfoCreateOrConnectWithoutUserInput
    connect?: UserCertInfoWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserCertInfoUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserCertInfoCreateWithoutUserInput, UserCertInfoUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserCertInfoCreateOrConnectWithoutUserInput
    upsert?: UserCertInfoUpsertWithoutUserInput
    disconnect?: UserCertInfoWhereInput | boolean
    delete?: UserCertInfoWhereInput | boolean
    connect?: UserCertInfoWhereUniqueInput
    update?: XOR<XOR<UserCertInfoUpdateToOneWithWhereWithoutUserInput, UserCertInfoUpdateWithoutUserInput>, UserCertInfoUncheckedUpdateWithoutUserInput>
  }

  export type UserCertInfoUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserCertInfoCreateWithoutUserInput, UserCertInfoUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserCertInfoCreateOrConnectWithoutUserInput
    upsert?: UserCertInfoUpsertWithoutUserInput
    disconnect?: UserCertInfoWhereInput | boolean
    delete?: UserCertInfoWhereInput | boolean
    connect?: UserCertInfoWhereUniqueInput
    update?: XOR<XOR<UserCertInfoUpdateToOneWithWhereWithoutUserInput, UserCertInfoUpdateWithoutUserInput>, UserCertInfoUncheckedUpdateWithoutUserInput>
  }

  export type UserInfoCreateNestedOneWithoutUserCertInfoInput = {
    create?: XOR<UserInfoCreateWithoutUserCertInfoInput, UserInfoUncheckedCreateWithoutUserCertInfoInput>
    connectOrCreate?: UserInfoCreateOrConnectWithoutUserCertInfoInput
    connect?: UserInfoWhereUniqueInput
  }

  export type UserInfoUpdateOneRequiredWithoutUserCertInfoNestedInput = {
    create?: XOR<UserInfoCreateWithoutUserCertInfoInput, UserInfoUncheckedCreateWithoutUserCertInfoInput>
    connectOrCreate?: UserInfoCreateOrConnectWithoutUserCertInfoInput
    upsert?: UserInfoUpsertWithoutUserCertInfoInput
    connect?: UserInfoWhereUniqueInput
    update?: XOR<XOR<UserInfoUpdateToOneWithWhereWithoutUserCertInfoInput, UserInfoUpdateWithoutUserCertInfoInput>, UserInfoUncheckedUpdateWithoutUserCertInfoInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCertInfoCreateWithoutUserInput = {
    userCertId?: string
    encptPswd: string
    reshToken?: string | null
    delYn?: boolean
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
  }

  export type UserCertInfoUncheckedCreateWithoutUserInput = {
    userCertId?: string
    encptPswd: string
    reshToken?: string | null
    delYn?: boolean
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
  }

  export type UserCertInfoCreateOrConnectWithoutUserInput = {
    where: UserCertInfoWhereUniqueInput
    create: XOR<UserCertInfoCreateWithoutUserInput, UserCertInfoUncheckedCreateWithoutUserInput>
  }

  export type UserCertInfoUpsertWithoutUserInput = {
    update: XOR<UserCertInfoUpdateWithoutUserInput, UserCertInfoUncheckedUpdateWithoutUserInput>
    create: XOR<UserCertInfoCreateWithoutUserInput, UserCertInfoUncheckedCreateWithoutUserInput>
    where?: UserCertInfoWhereInput
  }

  export type UserCertInfoUpdateToOneWithWhereWithoutUserInput = {
    where?: UserCertInfoWhereInput
    data: XOR<UserCertInfoUpdateWithoutUserInput, UserCertInfoUncheckedUpdateWithoutUserInput>
  }

  export type UserCertInfoUpdateWithoutUserInput = {
    userCertId?: StringFieldUpdateOperationsInput | string
    encptPswd?: StringFieldUpdateOperationsInput | string
    reshToken?: NullableStringFieldUpdateOperationsInput | string | null
    delYn?: BoolFieldUpdateOperationsInput | boolean
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCertInfoUncheckedUpdateWithoutUserInput = {
    userCertId?: StringFieldUpdateOperationsInput | string
    encptPswd?: StringFieldUpdateOperationsInput | string
    reshToken?: NullableStringFieldUpdateOperationsInput | string | null
    delYn?: BoolFieldUpdateOperationsInput | boolean
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserInfoCreateWithoutUserCertInfoInput = {
    userId?: string
    emlAddr: string
    userNm: string
    userRole?: $Enums.UserRole
    proflImg?: string | null
    userBiogp?: string | null
    actvtnYn?: boolean
    lastLgnDt?: Date | string | null
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
  }

  export type UserInfoUncheckedCreateWithoutUserCertInfoInput = {
    userId?: string
    emlAddr: string
    userNm: string
    userRole?: $Enums.UserRole
    proflImg?: string | null
    userBiogp?: string | null
    actvtnYn?: boolean
    lastLgnDt?: Date | string | null
    crtDt?: Date | string
    updtDt?: Date | string
    delDt?: Date | string | null
  }

  export type UserInfoCreateOrConnectWithoutUserCertInfoInput = {
    where: UserInfoWhereUniqueInput
    create: XOR<UserInfoCreateWithoutUserCertInfoInput, UserInfoUncheckedCreateWithoutUserCertInfoInput>
  }

  export type UserInfoUpsertWithoutUserCertInfoInput = {
    update: XOR<UserInfoUpdateWithoutUserCertInfoInput, UserInfoUncheckedUpdateWithoutUserCertInfoInput>
    create: XOR<UserInfoCreateWithoutUserCertInfoInput, UserInfoUncheckedCreateWithoutUserCertInfoInput>
    where?: UserInfoWhereInput
  }

  export type UserInfoUpdateToOneWithWhereWithoutUserCertInfoInput = {
    where?: UserInfoWhereInput
    data: XOR<UserInfoUpdateWithoutUserCertInfoInput, UserInfoUncheckedUpdateWithoutUserCertInfoInput>
  }

  export type UserInfoUpdateWithoutUserCertInfoInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emlAddr?: StringFieldUpdateOperationsInput | string
    userNm?: StringFieldUpdateOperationsInput | string
    userRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    proflImg?: NullableStringFieldUpdateOperationsInput | string | null
    userBiogp?: NullableStringFieldUpdateOperationsInput | string | null
    actvtnYn?: BoolFieldUpdateOperationsInput | boolean
    lastLgnDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserInfoUncheckedUpdateWithoutUserCertInfoInput = {
    userId?: StringFieldUpdateOperationsInput | string
    emlAddr?: StringFieldUpdateOperationsInput | string
    userNm?: StringFieldUpdateOperationsInput | string
    userRole?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    proflImg?: NullableStringFieldUpdateOperationsInput | string | null
    userBiogp?: NullableStringFieldUpdateOperationsInput | string | null
    actvtnYn?: BoolFieldUpdateOperationsInput | boolean
    lastLgnDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    crtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    updtDt?: DateTimeFieldUpdateOperationsInput | Date | string
    delDt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ISO8601DateTime: { input: string; output: string; }
};

/** Autogenerated input type of CreateTodo */
export type CreateTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  detail: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

/** Autogenerated return type of CreateTodo. */
export type CreateTodoPayload = {
  __typename?: 'CreateTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<CreateTodoPayload>;
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
  updateTodo?: Maybe<UpdateTodoPayload>;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
  /** Find a todo by ID */
  todo: Todo;
  /** Find todos */
  todos: TodoConnection;
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['ISO8601DateTime']['output'];
  deletedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  detail: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDone: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

/** The connection type for Todo. */
export type TodoConnection = {
  __typename?: 'TodoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Todo>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type TodoEdge = {
  __typename?: 'TodoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Todo>;
};

/** Autogenerated input type of UpdateTodo */
export type UpdateTodoInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  detail: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  isDone: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

/** Autogenerated return type of UpdateTodo. */
export type UpdateTodoPayload = {
  __typename?: 'UpdateTodoPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  todo?: Maybe<Todo>;
};

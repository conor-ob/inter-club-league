import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rank: Scalars['Int']['output'];
};

export type CategoryGroup = {
  __typename?: 'CategoryGroup';
  categories: Array<Category>;
  id: Scalars['ID']['output'];
};

export type CategoryResults = {
  __typename?: 'CategoryResults';
  categoryGroup: CategoryGroup;
  id: Scalars['ID']['output'];
  stageRiders: Array<StageRider>;
};

export type Club = {
  __typename?: 'Club';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Gc = {
  __typename?: 'Gc';
  gcRiders: Array<GcRider>;
  gcStatus: GcStatus;
  id: Scalars['ID']['output'];
  stageNumber: Scalars['Int']['output'];
  stageStatus: StageStatus;
};

export type GcRider = {
  __typename?: 'GcRider';
  category: Category;
  club: Club;
  gcPoints: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  movement: Scalars['Int']['output'];
  position: Scalars['String']['output'];
  rank: Scalars['Int']['output'];
  rider: Rider;
  totalPoints: Scalars['Int']['output'];
};

export enum GcStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS'
}

export type Query = {
  __typename?: 'Query';
  gc: Gc;
  marshalls: StageMarshalls;
  riderStats: RiderStats;
  schedule: Schedule;
  stage: Stage;
  stageResults: StageResults;
  stages: Array<Stage>;
};


export type QueryGcArgs = {
  stageId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMarshallsArgs = {
  stageId: Scalars['ID']['input'];
};


export type QueryRiderStatsArgs = {
  riderId: Scalars['ID']['input'];
};


export type QueryScheduleArgs = {
  seasonId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryStageArgs = {
  stageId: Scalars['ID']['input'];
};


export type QueryStageResultsArgs = {
  stageId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryStagesArgs = {
  seasonId?: InputMaybe<Scalars['ID']['input']>;
};

export enum RaceType {
  Criterium = 'CRITERIUM',
  HillClimb = 'HILL_CLIMB',
  RoadRace = 'ROAD_RACE',
  TimeTrial = 'TIME_TRIAL'
}

export type Rider = {
  __typename?: 'Rider';
  id: Scalars['ID']['output'];
  initials: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RiderStats = {
  __typename?: 'RiderStats';
  category: Category;
  club: Club;
  firstPlaces: Scalars['Int']['output'];
  gcLeaderStages: Scalars['Int']['output'];
  gcPoints: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isGcWinner: Scalars['Boolean']['output'];
  rider: Rider;
  secondPlaces: Scalars['Int']['output'];
  stagesPlaced: Scalars['Int']['output'];
  stagesRaced: Scalars['Int']['output'];
  thirdPlaces: Scalars['Int']['output'];
  totalPoints: Scalars['Int']['output'];
};

export type Schedule = {
  __typename?: 'Schedule';
  completed: Array<ScheduleMonth>;
  id: Scalars['ID']['output'];
  upcoming: Array<ScheduleMonth>;
};

export type ScheduleMonth = {
  __typename?: 'ScheduleMonth';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  stages: Array<Stage>;
};

export type Stage = {
  __typename?: 'Stage';
  categoryGroups: Array<CategoryGroup>;
  club: Club;
  coordinates?: Maybe<Scalars['String']['output']>;
  county: Scalars['String']['output'];
  displayDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  mandatory: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  season: Scalars['Int']['output'];
  startTime: Scalars['String']['output'];
  status: StageStatus;
  stravaId?: Maybe<Scalars['String']['output']>;
  type: RaceType;
};

export type StageMarshalls = {
  __typename?: 'StageMarshalls';
  id: Scalars['ID']['output'];
  marshalls: Array<Scalars['String']['output']>;
};

export type StageResults = {
  __typename?: 'StageResults';
  categoryResults: Array<CategoryResults>;
  gcLeaderId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  stageNumber: Scalars['Int']['output'];
  stageStatus: StageStatus;
};

export type StageRider = {
  __typename?: 'StageRider';
  category: Category;
  club: Club;
  id: Scalars['ID']['output'];
  points: Scalars['Int']['output'];
  position: Scalars['String']['output'];
  rider: Rider;
};

export enum StageStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Upcoming = 'UPCOMING'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryGroup: ResolverTypeWrapper<CategoryGroup>;
  CategoryResults: ResolverTypeWrapper<CategoryResults>;
  Club: ResolverTypeWrapper<Club>;
  Gc: ResolverTypeWrapper<Gc>;
  GcRider: ResolverTypeWrapper<GcRider>;
  GcStatus: GcStatus;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RaceType: RaceType;
  Rider: ResolverTypeWrapper<Rider>;
  RiderStats: ResolverTypeWrapper<RiderStats>;
  Schedule: ResolverTypeWrapper<Schedule>;
  ScheduleMonth: ResolverTypeWrapper<ScheduleMonth>;
  Stage: ResolverTypeWrapper<Stage>;
  StageMarshalls: ResolverTypeWrapper<StageMarshalls>;
  StageResults: ResolverTypeWrapper<StageResults>;
  StageRider: ResolverTypeWrapper<StageRider>;
  StageStatus: StageStatus;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryGroup: CategoryGroup;
  CategoryResults: CategoryResults;
  Club: Club;
  Gc: Gc;
  GcRider: GcRider;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Query: {};
  Rider: Rider;
  RiderStats: RiderStats;
  Schedule: Schedule;
  ScheduleMonth: ScheduleMonth;
  Stage: Stage;
  StageMarshalls: StageMarshalls;
  StageResults: StageResults;
  StageRider: StageRider;
  String: Scalars['String']['output'];
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryGroup'] = ResolversParentTypes['CategoryGroup']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryResults'] = ResolversParentTypes['CategoryResults']> = {
  categoryGroup?: Resolver<ResolversTypes['CategoryGroup'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stageRiders?: Resolver<Array<ResolversTypes['StageRider']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClubResolvers<ContextType = any, ParentType extends ResolversParentTypes['Club'] = ResolversParentTypes['Club']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcResolvers<ContextType = any, ParentType extends ResolversParentTypes['Gc'] = ResolversParentTypes['Gc']> = {
  gcRiders?: Resolver<Array<ResolversTypes['GcRider']>, ParentType, ContextType>;
  gcStatus?: Resolver<ResolversTypes['GcStatus'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stageStatus?: Resolver<ResolversTypes['StageStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GcRiderResolvers<ContextType = any, ParentType extends ResolversParentTypes['GcRider'] = ResolversParentTypes['GcRider']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  gcPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  movement?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rank?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rider?: Resolver<ResolversTypes['Rider'], ParentType, ContextType>;
  totalPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  gc?: Resolver<ResolversTypes['Gc'], ParentType, ContextType, Partial<QueryGcArgs>>;
  marshalls?: Resolver<ResolversTypes['StageMarshalls'], ParentType, ContextType, RequireFields<QueryMarshallsArgs, 'stageId'>>;
  riderStats?: Resolver<ResolversTypes['RiderStats'], ParentType, ContextType, RequireFields<QueryRiderStatsArgs, 'riderId'>>;
  schedule?: Resolver<ResolversTypes['Schedule'], ParentType, ContextType, Partial<QueryScheduleArgs>>;
  stage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType, RequireFields<QueryStageArgs, 'stageId'>>;
  stageResults?: Resolver<ResolversTypes['StageResults'], ParentType, ContextType, Partial<QueryStageResultsArgs>>;
  stages?: Resolver<Array<ResolversTypes['Stage']>, ParentType, ContextType, Partial<QueryStagesArgs>>;
};

export type RiderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rider'] = ResolversParentTypes['Rider']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initials?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RiderStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RiderStats'] = ResolversParentTypes['RiderStats']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  firstPlaces?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gcLeaderStages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gcPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isGcWinner?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rider?: Resolver<ResolversTypes['Rider'], ParentType, ContextType>;
  secondPlaces?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stagesPlaced?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stagesRaced?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thirdPlaces?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Schedule'] = ResolversParentTypes['Schedule']> = {
  completed?: Resolver<Array<ResolversTypes['ScheduleMonth']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  upcoming?: Resolver<Array<ResolversTypes['ScheduleMonth']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduleMonthResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduleMonth'] = ResolversParentTypes['ScheduleMonth']> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stages?: Resolver<Array<ResolversTypes['Stage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stage'] = ResolversParentTypes['Stage']> = {
  categoryGroups?: Resolver<Array<ResolversTypes['CategoryGroup']>, ParentType, ContextType>;
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  county?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mandatory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  season?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StageStatus'], ParentType, ContextType>;
  stravaId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RaceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StageMarshallsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StageMarshalls'] = ResolversParentTypes['StageMarshalls']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  marshalls?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StageResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StageResults'] = ResolversParentTypes['StageResults']> = {
  categoryResults?: Resolver<Array<ResolversTypes['CategoryResults']>, ParentType, ContextType>;
  gcLeaderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  stageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stageStatus?: Resolver<ResolversTypes['StageStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StageRiderResolvers<ContextType = any, ParentType extends ResolversParentTypes['StageRider'] = ResolversParentTypes['StageRider']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  club?: Resolver<ResolversTypes['Club'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rider?: Resolver<ResolversTypes['Rider'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  CategoryGroup?: CategoryGroupResolvers<ContextType>;
  CategoryResults?: CategoryResultsResolvers<ContextType>;
  Club?: ClubResolvers<ContextType>;
  Gc?: GcResolvers<ContextType>;
  GcRider?: GcRiderResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rider?: RiderResolvers<ContextType>;
  RiderStats?: RiderStatsResolvers<ContextType>;
  Schedule?: ScheduleResolvers<ContextType>;
  ScheduleMonth?: ScheduleMonthResolvers<ContextType>;
  Stage?: StageResolvers<ContextType>;
  StageMarshalls?: StageMarshallsResolvers<ContextType>;
  StageResults?: StageResultsResolvers<ContextType>;
  StageRider?: StageRiderResolvers<ContextType>;
};


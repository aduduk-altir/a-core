export interface IEnvironmentsByStage {
  development: TEnvLabel[];
  test: TEnvLabel[];
  production: TEnvLabel[];
  off: TEnvLabel[];
}

export type TEnvLabel = 'local' | 'dev' | 'stage' | 'prod';

export type TReleasesStage<TKeys extends string> = Record<TKeys, keyof IEnvironmentsByStage>;

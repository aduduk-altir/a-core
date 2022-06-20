import type { IEnvironmentsByStage, TReleasesStage, TEnvLabel } from './types';

const environmentsByStage: IEnvironmentsByStage = {
  development: ['local'],
  test: ['local', 'dev'],
  production: ['local', 'stage', 'prod'],
  off: [],
};

const inStage = (releaseStage: keyof IEnvironmentsByStage, getEnv: () => TEnvLabel) => {
  const currentEnv = getEnv();
  const allowedEnvironments = environmentsByStage[releaseStage];

  if (!allowedEnvironments) {
    return false;
  }

  return allowedEnvironments.includes(currentEnv);
};

export const uselessFunction = () => {
  console.log('hello world');
}

type HasFeature<TKeys extends string, TStages extends TReleasesStage<TKeys> = TReleasesStage<TKeys>> = (feature: TKeys) => boolean;

/*
 Creates strongly typed `hasFeature` with provided features set and current `env` source
 */
export const createHasFeature = <
  TKeys extends string,
  TStages extends TReleasesStage<TKeys> = TReleasesStage<TKeys>,
>(
  stages: TStages,
  getEnv: () => TEnvLabel,
): HasFeature<TKeys> => {
  return (feature: TKeys) => {
    const releaseStage = stages[feature];

    return inStage(releaseStage, getEnv);
  };
};


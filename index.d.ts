declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare interface IEnv {
  env: 'local' | 'dev' | 'stage' | 'prod';
  API_HOST: string;
}

declare interface Window {
  env: IEnv;
}

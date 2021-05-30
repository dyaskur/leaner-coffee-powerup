import LeanCoffeeAuth from './LeanCoffeeAuth';

const config: Config = process.env.CONFIG as unknown as Config;

const settings = new LeanCoffeeAuth({
  w: window,
  config,
});
settings.init();

import LeanCoffeePowerUp from './LeanCoffeePowerUp';

const { hostname, port, prefix } = process.env.CONFIG[process.env.NODE_ENV];
const DEFAULT_DISCUSSION_DURATION = 5 * 60 * 1000;

/* global TrelloPowerUp */
/* eslint-disable prefer-template */
const instance = new LeanCoffeePowerUp({
  TrelloPowerUp,
  baseUrl: `${hostname}${port ? ':' + port : ''}${prefix}`,
  maxDiscussionDuration: DEFAULT_DISCUSSION_DURATION
});

instance.start();
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

//defineBackend({
const be = defineBackend({
  auth,
  data,
});
be.data.resources.cfnResources.cfnApiKey?.overrideLogicalId(
      `updateRsrc${new Date().getTime()}`
);

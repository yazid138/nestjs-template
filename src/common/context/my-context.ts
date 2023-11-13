import { RequestContext } from '@medibloc/nestjs-request-context';

export class MyContext extends RequestContext {
  user: any;
  body: any;
  params: any;
  query: any;
}

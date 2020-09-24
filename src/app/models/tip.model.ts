import { AbstractModel } from './abstract.mode';

export class Tip extends AbstractModel {
  title: string;
  description: string;
  picture: string;
  createdOn: Date;
  modifiedOn: Date;
}
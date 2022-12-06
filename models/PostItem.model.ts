import {IPostItemModel } from "./interfaces";
import { MainModel } from "./MainModel";

export class PostItemModel extends MainModel implements IPostItemModel {
  title: string;
  description: string;

  constructor(props: IPostItemModel) {
    super(props);
    this.title = props.title;
    this.description = props.description;
  }
}

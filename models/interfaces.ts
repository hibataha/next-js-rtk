export interface IMainModel {
    id?: string | number;
  }
  export interface IPostItemModel extends IMainModel {
    title: string;
    description: string;
  }

  export enum PAGETYPE {
    ARTICLE = "articles",
    POST = "post",
  }
  
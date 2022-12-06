import { IMainModel } from "./interfaces";

export class MainModel implements IMainModel {
  id: string | number | undefined;
  constructor(props: IMainModel) {
    this.id = props.id ?? "";
  }

  static renderModels(modelClass: any, data: any): any {
    const models: any[] = [];
    for (const item of data) {
      const model = new modelClass(item);
      models.push(model);
    }
    return models;
  }
  static renderModel(modelClass: any, item: any): any {
    const model = new modelClass(item);
    return model;
  }
}

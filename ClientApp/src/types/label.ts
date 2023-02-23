export type LabelData = {
  name: string;
  color: string;
}

export class LabelNotFoundError extends Error {
  labelName: string;
  
  constructor(m: string, labelName: string) {
    super(m);
    Object.setPrototypeOf(this, LabelNotFoundError.prototype);

    this.labelName = labelName;
    this.name = 'LabelNotFoundError';
    this.message = `Label with name ${this.labelName} not found`;
  }
};

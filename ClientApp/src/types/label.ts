/**
 * All the types and functions related to labels
 */


/**
 * The data for a label
 * @property `name` - The name of the label
 * @property `color` - The color of the label, as a hex string
 */
export type LabelData = {
  label: string;
  color: string;
}

/**
 * An error to throw when the requested label is not found
 * @property `labelName` - The name of the label that was not found
 */
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

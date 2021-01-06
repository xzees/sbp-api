import ValidationModel from "models/ValidationModel";

interface Validable {
  validate(): ValidationModel
}

export default Validable
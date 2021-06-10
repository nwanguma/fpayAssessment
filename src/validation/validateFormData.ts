export interface ValidationError {
  [key: string]: {
    text: string;
    error: boolean;
  };
}

const validateFormData = (
  formData: { [key: string]: string },
  properties: string[]
): ValidationError => {
  let errors: ValidationError = {};

  properties.forEach((property: string) => {
    if (
      property === "userAmount" &&
      formData[property] &&
      isNaN(parseInt(formData[property]))
    ) {
      errors[property] = {
        error: true,
        text: `${property} is invalid`,
      };
    } else if (
      property === "mail" &&
      formData[property] &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData[property])
    ) {
      errors.mail = {
        error: true,
        text: "Email address is invalid",
      };
    } else if (
      property === "mail" &&
      formData[property] &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData[property]) &&
      formData[property].length <= 7
    ) {
      errors.mail = {
        error: true,
        text: "Email address is invalid",
      };
    } else if (
      property === "fullname" &&
      formData[property] &&
      !/^[A-Za-z'\s.,]+$/.test(formData[property])
    ) {
      errors[property] = {
        error: true,
        text: `${property} is invalid`,
      };
    } else if (
      property === "fullname" &&
      formData[property] &&
      /^[A-Za-z'\s.,]+$/.test(formData[property]) &&
      formData[property].length < 3
    ) {
      errors[property] = {
        error: true,
        text: `${property} is too short`,
      };
    } else if (
      property === "accountNumber" &&
      formData[property] &&
      isNaN(parseInt(formData[property]))
    ) {
      errors[property] = {
        error: true,
        text: `${property} is invalid`,
      };
    } else if (!formData[property]) {
      errors[property] = {
        error: true,
        text: `${property} is required`,
      };
    }
  });

  return errors;
};

export default validateFormData;

export default function errorMessaage(error) {
  if (error.response.data.error.message) {
    return error.response.data.error.message;
  }
  const errors = Object.values(error.response.data.error.request);
  let textErrors = '';
  errors.forEach((text) => {
    textErrors += text;
  });
  return textErrors;
}

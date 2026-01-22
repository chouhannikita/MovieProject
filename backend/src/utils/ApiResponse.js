const ApiResponse = (data, message = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

export default ApiResponse;

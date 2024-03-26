function buildResponse(status, message, res) {
  res.status(status);
  res.send(message);
}

export { buildResponse };

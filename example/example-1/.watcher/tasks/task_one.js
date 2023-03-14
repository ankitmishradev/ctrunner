const console = (payload, send) => {
  setTimeout(() => {
    send({
      status: payload,
      error: "Error reported",
      message: "Build number 056",
    });
  }, 5000);
};

export default console;

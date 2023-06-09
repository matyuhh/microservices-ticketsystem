const NatsWrapper = {
  client: {
    publish: jest.fn().mockImplementation(
      (subject: string, data: string, callback: () => void) => {
        callback();
      },
    ),
  },
};

export default NatsWrapper;

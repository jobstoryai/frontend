type Item = { id: number; name: string };
type Payload = { name: string };

export const createMockRepo = () => {
  const data: Item[] = [];
  return {
    get: jest.fn().mockResolvedValue([data[0]]),
    list: jest.fn().mockResolvedValue([data, { count: data.length }]),
    create: jest.fn().mockImplementation(async (payload: Payload) => ({
      id: Date.now(),
      ...payload,
    })),
    update: jest
      .fn()
      .mockImplementation(async (id: number, payload: Payload) => ({
        id,
        ...payload,
      })),
    delete: jest.fn().mockResolvedValue(undefined),
  };
};

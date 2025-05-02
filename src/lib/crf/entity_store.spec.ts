import { createMockRepo } from "../__tests__/utils/create_mock_repo";

import { EntityStore } from "./entity_store";

type Item = { id: number; name: string };
type Payload = { name: string };

const createItems = (length = 0, offset = 0) =>
  Array.from({ length }, (_, i) => ({
    id: i + 1 + offset,
    name: `Item ${i + 1}`,
  }));

describe("EntityStore Basic Behavior", () => {
  let store: EntityStore<Item, Payload>;
  let repo: ReturnType<typeof createMockRepo>;

  beforeEach(() => {
    repo = createMockRepo();
    store = new EntityStore<Item, Payload>({
      repository: repo,
      pageSize: 10,
    });
  });

  it("should initialize with default state", () => {
    expect(store.data.items).toEqual([]);
    expect(store.data.count).toBe(0);
    expect(store.data.page).toBe(0);
    expect(store.state.isInitialized).toBe(false);
    expect(store.state.isLoading).toBe(false);
    expect(store.state.isCreating).toBe(false);
    expect(store.state.isUpdating).toBe(false);
    expect(store.state.isLoadingOne).toBe(false);
  });

  it("should load first page of data", async () => {
    repo.list.mockResolvedValueOnce([createItems(10), { count: 25 }]);

    await store.loadCacheIfNeeded();
    expect(store.data.items.length).toBe(10);
    expect(store.data.page).toBe(1);
    expect(store.data.count).toBe(25);
    expect(repo.list).toHaveBeenCalledWith(1, {
      queryParams: { page_size: 10 },
    });
  });

  it("should load first and second pages", async () => {
    repo.list.mockResolvedValueOnce([createItems(10), { count: 15 }]);

    await store.loadCacheIfNeeded();

    repo.list.mockResolvedValueOnce([
      Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
      })),
      { count: 15 },
    ]);

    await store.loadNextPage();

    expect(store.data.items.length).toBe(15);
    expect(store.data.page).toBe(2);
    expect(store.data.count).toBe(15);
    expect(repo.list).toHaveBeenCalledWith(1, {
      queryParams: { page_size: 10 },
    });
  });

  it("should not load more pages when all data is loaded", async () => {
    repo.list.mockResolvedValueOnce([createItems(7), { count: 7 }]);
    await store.loadCacheIfNeeded();
    repo.list.mockResolvedValueOnce([[], { count: 7 }]);
    await store.loadNextPage();

    expect(store.data.items.length).toBe(7);
    expect(store.data.page).toBe(1);
    expect(repo.list).toHaveBeenCalledTimes(1);
  });

  it("should retrieve item from repo if not cached", async () => {
    const externalItem = { id: 999, name: "From Repo" };
    repo.get.mockResolvedValueOnce(externalItem);

    expect(
      store.data.items.find((i) => i.id === externalItem.id),
    ).toBeUndefined();

    const promise = store.get(externalItem.id);
    expect(store.state.isLoadingOne).toBe(true);
    const item = await promise;
    expect(repo.get).toHaveBeenCalledWith(externalItem.id);
    expect(item).toEqual(externalItem);

    expect(store.state.isLoadingOne).toBe(false);
    expect(
      store.data.items.find((i) => i.id === externalItem.id),
    ).toBeUndefined();
  });

  it("should return cached item and not call repo.get", async () => {
    const cachedItem = { id: 123, name: "Cached" };
    store.data.items.push(cachedItem);

    repo.get = jest.fn();

    const item = await store.get(cachedItem.id);

    expect(item).toEqual(cachedItem);
    expect(repo.get).not.toHaveBeenCalled();
    expect(store.state.isLoadingOne).toBe(false);
  });

  it("should update an item", async () => {
    const existingItem = { id: 1, name: "Old" };
    store.data.items.push(existingItem);

    const updatedPayload = { name: "Updated Name" };
    const updatedResult = { id: 1, name: "Updated Name" };

    repo.update.mockResolvedValueOnce(updatedResult);

    await store.update(1, updatedPayload);

    expect(repo.update).toHaveBeenCalledWith(1, updatedPayload);
    expect(store.data.items[0]).toEqual(updatedResult);
    expect(store.state.isUpdating).toBe(false);
  });

  it("should delete an item", async () => {
    const itemToDelete = { id: 2, name: "To Delete" };
    store.data.items.push(itemToDelete);
    store.data.count = 1;

    repo.delete.mockResolvedValueOnce(undefined);

    await store.delete(itemToDelete.id);

    expect(repo.delete).toHaveBeenCalledWith(itemToDelete.id);
    expect(
      store.data.items.find((i) => i.id === itemToDelete.id),
    ).toBeUndefined();
    expect(store.data.count).toBe(0);
  });

  it('should emit "loaded" on page load', async () => {
    const listener = jest.fn();
    store.emitter.on("loaded", listener);

    const page = createItems(5);
    repo.list.mockResolvedValueOnce([page, { count: 5 }]);

    await store.loadCacheIfNeeded();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).toEqual(page);
  });

  it('should emit "created" on create', async () => {
    const listener = jest.fn();
    store.emitter.on("created", listener);

    const payload = { name: "Created" };
    await store.create(payload);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).toEqual(expect.objectContaining(payload));
  });

  it('should emit "updated" on update', async () => {
    const existing = { id: 1, name: "Before" };
    store.data.items.push(existing);

    const listener = jest.fn();
    store.emitter.on("updated", listener);

    const updated = { name: "After" };
    repo.update.mockResolvedValueOnce({ id: 1, name: "After" });

    await store.update(1, updated);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).toEqual({ id: 1, name: "After" });
  });

  it('should emit "deleted" on delete', async () => {
    const toDelete = { id: 2, name: "Bye" };
    store.data.items.push(toDelete);
    store.data.count = 1;

    const listener = jest.fn();
    store.emitter.on("deleted", listener);

    await store.delete(toDelete.id);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).toEqual(toDelete.id);
  });

  it("should force reload data", async () => {
    const initialItems = createItems(10);
    repo.list.mockResolvedValueOnce([initialItems, { count: 30 }]);

    await store.loadCacheIfNeeded();

    const newItems = createItems(20, 10);
    repo.list.mockResolvedValueOnce([newItems, { count: 20 }]);
    await store.reload();

    expect(store.data.items).toEqual(newItems);
    expect(store.data.items.length).toBe(20);
    expect(store.data.page).toBe(1);
    expect(store.data.count).toBe(20);

    expect(repo.list).toHaveBeenCalledTimes(2);
    expect(repo.list).toHaveBeenCalledWith(1, {
      queryParams: { page_size: 10 },
    });
  });
});

import { UserStore } from '../../models/User';

describe('User Model', () => {
  const store = new UserStore();

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: 'Islam',
      lastname: 'Muhammad',
      email: 'islam@mail.com',
      password: 'Password',
    });
    expect(result.id).toEqual(2);
    expect(result.firstname).toEqual('Islam');
    expect(result.lastname).toEqual('Muhammad');
    expect(result.email).toEqual('islam@mail.com');
    expect(result.password).not.toEqual('Password');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
    expect(result[0].firstname).toEqual('Islam');
    expect(result[0].lastname).toEqual('Muhammad');
    expect(result[0].email).toEqual('islam@mail.com');
    expect(result[0].password).not.toEqual('Password');
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(2);
    expect(result.firstname).toEqual('Islam');
    expect(result.lastname).toEqual('Muhammad');
    expect(result.email).toEqual('islam@mail.com');
    expect(result.password).not.toEqual('Password');
  });

  it('delete method should remove the user', async () => {
    const deletedUser = await store.delete(2);
    expect(deletedUser.id).toEqual(2);
    const result = await store.index();
    expect(result).toEqual([]);
  });
});

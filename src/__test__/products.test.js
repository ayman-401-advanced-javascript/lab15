

const { server } = require('../server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Products API', () => {
  it('respond properly to a get request to /api/v1/products', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        expect(results.status).toBe(200);
        expect(typeof results.body).toBe('object');

      });
  });
  it('post a new product item', () => {
    let testObj = { categoryName:'food',name: 'apple', price: 25, quantityInStock: 200 };
    return mockRequest.post('/api/v1/products')
      .send(testObj)
      .then(data => {
        let record = data.body;
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });
      });
  });
  it('get one product item', () => {
    let testObj = { categoryName:'food', name: 'apple', price: 25, quantityInStock: 200 };
    return mockRequest.post('/api/v1/products')
      .send(testObj)
      .then(data => {
        return mockRequest.get(`/api/v1/products/${data.body._id}`)
          .then(data => {
            expect(data.body.name).toEqual(testObj.name);
          });
      });
  });
});

it('respond properly to a delete request to /api/v1/products/:id', () => {
  let obj = { categoryName:'food',name: 'dates', price: 125, quantityInStock: 2000 };
  return mockRequest
    .post('/api/v1/products')
    .send(obj)
    .then(data => {
      return mockRequest
        .delete(`/api/v1/products/${data.body._id}`)
        .send(obj)
        .then(results => {
          expect(results.status).toBe(200);
          expect(results.body[0]).toBe();
        });
    });
});
it('respond properly to a update request to /api/v1/products/:id', () => {
  let obj = { categoryName:'food',name: 'apple', price: 25, quantityInStock: 200 };
  return mockRequest.post('/api/v1/products')
    .send(obj)
    .then(data=>{
      return mockRequest.put(`/api/v1/products/${data.body._id}`)
        .send({ categoryName:'food',name: 'Item is UPDATED', price: 10, quantityInStock: 999})
        .then(results=>{
          expect(results.status).toBe(200);
          expect(results.body.name).toEqual('Item is UPDATED');
          expect(results.body.price).toEqual(10);
          expect(results.body.quantityInStock).toEqual(999);
        });
    });
});

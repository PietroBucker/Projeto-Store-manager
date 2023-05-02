const allSalesMockReturn = [
  {
    "saleId": 1,
    "date": "2023-04-29T00:16:37.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-29T00:16:37.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-29T00:16:37.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const allSalesMockReturnBD = [
  {
    "id": 1,
    "date": "2023-04-29T00:16:37.000Z",
    "product_id": 1,
    "quantity": 5
  },
  {
    "id": 1,
    "date": "2023-04-29T00:16:37.000Z",
    "product_id": 2,
    "quantity": 10
  },
  {
    "id": 2,
    "date": "2023-04-29T00:16:37.000Z",
    "product_id": 3,
    "quantity": 15
  }
]

const ByIdSalesMockReturnBD = [
  {
    "date": "2023-04-29T00:16:37.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-04-29T00:16:37.000Z",
    "productId": 2,
    "quantity": 10
  },
]

const ByIdSalesMockReturn = [
  {
    "date": "2023-04-29T00:16:37.000Z",
    "product_id": 1,
    "quantity": 5
  },
  {
    "date": "2023-04-29T00:16:37.000Z",
    "product_id": 2,
    "quantity": 10
  },
]
module.exports = {
  allSalesMockReturn,
  allSalesMockReturnBD,
  ByIdSalesMockReturnBD,
  ByIdSalesMockReturn,
}
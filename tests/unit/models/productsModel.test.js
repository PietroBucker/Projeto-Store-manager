const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProductsMock } = require('./modelsMocks/productsModels.Mock');

describe('Teste de unidade products model', function () {
  this.afterEach(() => sinon.restore());

  it('testa se retorna a lista d todos produtos do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const result = await productsModel.findAll();
    
    expect(result).to.be.equal(allProductsMock);
  });

  it('testa se retorna produtos buscado por id do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const result = await productsModel.findById(1);
  
    expect(result).to.be.equal(allProductsMock[0]);
  })

  it('testa se retorna produtos buscado por id do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const result = await productsModel.findById(1);
  
    expect(result).to.be.equal(allProductsMock[0]);
  })
})
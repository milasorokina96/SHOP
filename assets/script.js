const productsInShop = [
  {
    EAN13: 1111,
    name: 'Oreo',
    priсe: 20,
  },

  {
    EAN13: 1112,
    name: 'Chips',
    priсe: 40,
  },

  {
    EAN13: 1113,
    name: 'Cola',
    priсe: 10,
  },

  {
    EAN13: 1114,
    name: 'Oranges',
    priсe: 25,
  }
];

const check = {
  productsInCheck: [],

  getProdByEAN13(EAN13, obj){
    return obj.find(product => product.EAN13 === EAN13);
  },

  addProd(EAN13, count = 1){
    
    const productToCheck = this.getProdByEAN13(EAN13, productsInShop);
    const repeatProd = this.getProdByEAN13(EAN13, this.productsInCheck);

    if(repeatProd){
      repeatProd.count += count;
    } else {
      if(productToCheck){
        productToCheck.count = count;
        this.productsInCheck.push(productToCheck);
        
      } else {

        throw new Error(`Product not found`);
      }
    }
  },

   removeProd(EAN13, count) {
     const productInCheck = this.getProdByEAN13(EAN13, this.productsInCheck);
     const productIndex = this.productsInCheck.findIndex(product => product.EAN13 === EAN13);
    

     if (productInCheck && productInCheck.count > count) {
       productInCheck.count -= count;
     } else if (productInCheck.count === 1|| productInCheck.count === count) {
      
      this.productsInCheck.splice(productIndex, 1);
     } else {
       throw new Error(`You can't delete more than you have`);
     }
    },

  showProd(discount) {
    this.productsInCheck.forEach((product) => {
      for (let value in product) {
        console.log(`${value} : ${product[value]}`);

      }

      console.log(`\n`);
    });
    if (discount === 'PROMO20'){
      console.log(`Общая сумма чека: ${this.totalPrice}\nСумма сo скидкой: ${this.totalPrice * 0.8}`);
    } else {
      console.log(`Общая сумма чека: ${this.totalPrice}`);
    }
  },

  get totalPrice() { 
    return this.productsInCheck.reduce((totalPrice, {priсe, count}) => totalPrice += (priсe * count), 0);
  },


}

const discount = () => {
  return prompt(`Enter promo code`);
};

check.addProd(1111, 2);
check.addProd(1111, 10);
check.addProd(1112, 2);
check.addProd(1113, 1);
check.addProd(1114, 1);
check.showProd('PROMO20');
console.log(`-------------------------------------------`)
check.removeProd(1112, 2);
check.removeProd(1113, 1);
check.showProd();
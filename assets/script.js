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

  _getProductByEAN13(EAN13, data = this.productsInCheck) {
    return data.find((product) => product.EAN13 === EAN13);
  },

  addProd(EAN13, count = 1){
    
    const recurringProduct = this._getProductByEAN13(EAN13);

    if (recurringProduct) {
      recurringProduct.count += count;
      return;
    }

    const productToCheck = this._getProductByEAN13(EAN13, productsInShop);

    if (productToCheck) {
      this.productsInCheck.push({
        ...productToCheck,
        count,
      });
    } else {
      throw new Error(`Product not found`);
    }
  },

   removeProd(EAN13) {
    const productIndex = this.productsInCheck.findIndex(
      (product) => product.EAN13 === EAN13
    );
    this.productsInCheck.splice(productIndex, 1);
  },

  // Лучше все же отдельным методом
  decrementProduct(EAN13, count = 1) {
    const productInCheck = this._getProductByEAN13(EAN13);

    if (productInCheck && productInCheck.count > count) {
      productInCheck.count -= count;
    } else if (productInCheck.count === count) {
      this.removeProduct(EAN13);
    } else if (count > productInCheck.count) {
      throw new Error(`You can't delete more than you have`);
    }
  },

    get totalPrice() { 
      return this.productsInCheck.reduce((totalPrice, {priсe, count}) => totalPrice += (priсe * count), 0);
    },

    showProd(discount) {
      this.productsInCheck.forEach((product) => {
        for (let value in product) {
          console.log(`${value} : ${product[value]}`);
        }
        console.log(`\n`);
      });
  
      if (discount) {
        try {
         const totalPriceWithDiscount = this._applyDiscount(discount);
           console.log(`Общая сумма чека сo скидкой: ${totalPriceWithDiscount}`);
           return;
         } catch(e) {
          console.log(e);
         }
        }
        
        console.log(`Общая сумма чека: ${this.totalPrice}`);
    },
  
    // Лучше все жеотдельным методом
    _applyDiscount(discount) {
      let coefficient = 1
  
      switch (discount) {
        case 'PROMO20':
          coefficient = .8;
          break;
        default:
          throw new Error(`Incorrect discount`);
      }
      return this.totalPrice * coefficient;
    },
  }


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
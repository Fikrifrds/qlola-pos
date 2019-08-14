const cashes = [2000,5000, 10000, 20000, 50000, 100000]

function subArray( array ){
    var arr = [],
        arraySize = array.length,
        combinationsCount = (1 << arraySize)

    for (var i = 1; i < combinationsCount ; i++ ){
        var combination = [];
        for (var j=0;j<arraySize;j++){
            if ((i & (1 << j))){
                combination.push(array[j]);
            }
        }
        arr.push(combination);
    }
  console.log(arr)
    return arr;
}

function arraySum( array ){
  let arr = [];
	for(let el of array){
    if(el.length < 3){
    	arr.push(el.reduce((a,b) => a+b,0))
    }
  	
  }
  console.log(arr)
  return arr
}



function generateCash(amount){
  let isMoreThanHundredThousand = false
  let result;
  let right;
  let res;
  let newAmount = amount;
  if(amount > 100000){
    result = Math.floor(amount/100000)
    isMoreThanHundredThousand = true
  	newAmount = amount%100000;
    console.log(newAmount)
    if (newAmount === 0) return [amount]
  }
  let left = cashes.filter( cash => cash < newAmount);
  let arr = subArray(left);
  let ops = arraySum(arr);
  res = ops.filter( op => op > newAmount);
  right = cashes.filter( cash => cash > newAmount);
  
  if( isMoreThanHundredThousand ){
    res = res.map( item => item + result*100000);
    right = right.map( item => item + result*100000);
    
    if(newAmount > 20000 && newAmount < 40000){
      res = [40000 + result*100000, ...res]
    }
  } else {
    if(newAmount > 20000 && newAmount < 40000){
      res = [40000, ...res]
    }
  }
  
  return [amount, ...res, ...right].sort( (a,b) => a - b )
}


export default generateCash;
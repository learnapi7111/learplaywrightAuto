function findSquareRoot(number){
    if(number == 0){
        return 0
        
    }
    else if(number == 1){
        return 1
        
    }
    else if(typeof number !== 'number' ){
        return NaN
        
    }
    return Math.sqrt(number)
    
}
console.log(findSquareRootindSquareRoot(16));
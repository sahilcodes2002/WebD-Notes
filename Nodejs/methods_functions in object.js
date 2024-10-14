let calc={
    add:function(a,b){
        return (a+b);
    },
    sub:function(a,b){
        return (a-b);
    },
    mul:function(a,b){
        return (a*b);
    }
}

console.log(calc.sub(6,5));


//using shorthand

calculator={
    add(a,b){
        return a+b;
    },
    sub(a,b){
        return a-b;
    },
    mul(a,b){
        return a*b;
    }
}

console.log(calculator.mul(2,3));

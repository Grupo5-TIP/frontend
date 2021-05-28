export const editCart = (product, action) => {
    return (cart) => {
        const item = product.id !==undefined ? cart.find((item) => item.product.id === product.id) : true ;

        if (!item) {
            const newItem = {
                product:product,
                amount: 1
            }
            cart.push(newItem);
            return cart.map((item) => item);
        }
        
        switch (action) {
            case "add": 
                item.amount = item.amount + 1;
                return cart.map((item) => item);
            
            case "decrease": 
                //return cart.filter( _item => _item.product.id !== item.product.id);
                if(item.amount === 1) return cart;
                item.amount = item.amount - 1;
                return cart.map((item) => item);

            case "delete":
                return cart.filter( _item => _item.product.id !== item.product.id);
            
            case "deleteAll": 
                return [];        
                            
            default:
                break;
            
            
        }
        return cart

    };
}
export const editCart = (product, action) => {
    return (cart) => {
        const item = cart.find((item) => item.product.id === product.id);

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
            
            case "delete": 
                return cart.filter( _item => _item.product.id !== item.product.id);
            
            default:
                break;
            
            
        }
        return cart

    };
}
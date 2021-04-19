export const editCart = (product, action) => {
    return (cart) => {
        const isInCart = cart.some((item) => item.id === product.id);

        if (!isInCart) {
            return cart.concat({ ...product, amount: 1 });
        }

        return cart.reduce((acc, _product) => { 
            if (product.id !== _product.id) {
                return acc.concat(_product);
            }

            switch (action) {
                case "delete": {
                    return acc;
                }

                default: {
                    return acc.concat(_product);
                }
            }
        }, []);
    };
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterOption = {
    value: string;
    label: string;
    checked: boolean;
}

type FilterSection = {
    id: string;
    name: string;
    options: FilterOption[];
}

type InitialState = {
    value: FilterSection[]
}

const initialState: InitialState = {
    value: [
        {
    
            id: 'category',
            name: 'Category',
            options: [
                { value: 'shirt', label: 'Shirt', checked: false },
                { value: 'pant', label: 'Pant', checked: false },
                { value: 'dress', label: 'Dress', checked: false },
                { value: 'accessories', label: 'Accessories', checked: false },
                { value: 'hot-sales', label: 'Hot Sales', checked: false },
                { value: 'new-arrival', label: 'New Arrival', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
        {
            id: 'color',
            name: 'Color',
            options: [
                { value: 'white', label: 'White', checked: false },
                { value: 'black', label: 'Black', checked: false },
                { value: 'gray', label: 'Gray', checked: false },
                { value: 'navy', label: 'Navy', checked: false },
                { value: 'khaki', label: 'Khaki', checked: false },
                { value: 'red', label: 'Red', checked: false },
                { value: 'pink', label: 'Pink', checked: false },
                { value: 'orange', label: 'Orange', checked: false },
                { value: 'yellow', label: 'Yellow', checked: false },
                { value: 'green', label: 'Green', checked: false },
                { value: 'blue', label: 'Blue', checked: false },
                { value: 'purple', label: 'Purple', checked: false },
                { value: 'brown', label: 'Brown', checked: false },
                { value: 'beige', label: 'Beige', checked: false },
                { value: 'cream', label: 'Cream', checked: false },
                { value: 'silver', label: 'Silver', checked: false },
                { value: 'gold', label: 'Gold', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
        {
            id: 'size',
            name: 'Size',
            options: [
                { value: 's', label: 's', checked: false },
                { value: 'm', label: 'm', checked: false },
                { value: 'l', label: 'l', checked: false },
                { value: 'xl', label: 'xl', checked: false },
                { value: 'xxl', label: 'xxl', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
        {
            id: 'brand',
            name: 'Brand',
            options: [
                { value: 'gucci', label: 'Gucci', checked: false },
                { value: 'louisvuitton', label: 'Louis Vuitton', checked: false },
                { value: 'chanel', label: 'Chanel', checked: false },
                { value: 'prada', label: 'Prada', checked: false },
                { value: 'versace', label: 'Versace', checked: false },
                { value: 'armani', label: 'Armani', checked: false },
                { value: 'dior', label: 'Dior', checked: false },
                { value: 'other', label: 'Other', checked: false },
            ],
        },
    ]
}

export const CartRedux = createSlice({
    name: 'CartRedux',
    initialState,
    reducers: {
        RemoveProduct: (state, action: PayloadAction<string>) => {
            let newProductList = initialState.value.items.filter(it => it.productId === action.payload);
            let newTotalPrice = 0;
            for (let i = 0; i < initialState.value.items.length; i++) {
                newTotalPrice += initialState.value.items[i].price * initialState.value.items[i].quantity;
            }
            return {
                value: {
                    items: newProductList,
                    totalPrice: newTotalPrice
                }
            }
        },
        AddProduct: (state, action: PayloadAction<CartItemType>) => {
            let indexValue = initialState.value.items.findIndex(
                it => it.productId === action.payload.productId 
                && it.color === action.payload.color 
                && it.price === action.payload.price
            )
            let newProductList = [...initialState.value.items];
            if (indexValue !== -1) {
                newProductList[indexValue] = action.payload;
            }
            else {
                newProductList = [...initialState.value.items, action.payload]
            }
            let newTotalPrice = 0;
            for (let i = 0; i < initialState.value.items.length; i++) {
                newTotalPrice += initialState.value.items[i].price * initialState.value.items[i].quantity;
            }
            return {
                value: {
                    items: newProductList,
                    totalPrice: newTotalPrice
                }

            }
        }
    }
})

export const { RemoveProduct, AddProduct} = CartRedux.actions;

export default CartRedux.reducer;
export enum EApisProperties {
    baseUrl = 'http://localhost:8080/apis',
    loginPath = '/login',
    signupPath = '/signup',
    searchProductByKeywordPath = '/admin/products/search',
    addCategoryPath = '/admin/category',
    getCategoryPath = '/category',
    addProductPath = '/admin/product',
    updateProductPath = '/admin/product',
    deleteProductPath = '/admin/product/delete',
    getProductPath = '/product/list',
    getOneByIdPath = '/product/',
    makeOrderPath = '/order',
    fetchFromCartPath = '/product/fetchFromCart'
}

export enum ESortBy {
    DESC = 'Descending',
    ASC = 'Ascending',
    LOWEST_PRICE_TO_HIGHEST_PRICE = 'Lowest Price to Highest Price',
    HIGHEST_PRICE_TO_LOWEST_PRICE = 'Highest Price to Lowest Price'
}

export enum DialogSampleText {
    closeText = 'Đóng',
    continueText = 'Tiếp tục',
    viewListText = 'Xem danh sách',
    fetchText = 'Cập nhật',

    addCategorySuccessText = 'Thêm loại sản phẩm thành công',
    updateCategorySuccessText = 'Cập nhật loại sản phẩm thành công',
    updateSuccessThenNavigateToAddNewText = 'Thêm loại sản phẩm mới',

    addProductSuccessText = 'Thêm sản phẩm thành công',
    updateProductSuccesstext = 'Cập nhật sản phẩm thành công',
    updateProductSuccessThenNavigateToAddNewText = 'Thêm sản phẩm mới',
    deleteProductSuccessText = 'Xóa sản phẩm thành công'
}

export enum RouteText {
    listCategoryText = 'category',
    addCategoryText = 'add-category',
    categoryDetailText = 'category-detail',

    listProductText = 'products',
    addProductText = 'add-product',
    productDetailText = 'product-detai;'
}

export const VAT_PERCENTAGE = 10;

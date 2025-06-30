export interface ResponseLogin {
    message: string;
    token:   string;
    user:    User;
}

export interface ResponseRegister {
    message: string;
    user:    User;
}

export interface User {
    id:        number;
    email:     string;
    role:      "ADMIN" | "SELLER" | "CUSTOMER";
    isActive:  boolean;
    createdAt: Date;
    updatedAt: Date;
    profile:   Profile;
}

export interface Profile {
    id:          number;
    fullName:    string;
    avatarUrl:   string;
    bio:         null;
    phoneNumber: string;
    address:     null;
    userId:      number;
}

export interface ResponseAllProducts  {
    message:    string;
    categories: Category[];
}

export interface Category {
    id:        number;
    name:      string;
    imageUrl:  string;
    createdAt: Date;
    updatedAt: Date;
    products:  Product[];
}

export interface Product {
    id:          number;
    name:        string;
    stock:       number;
    description: string;
    price:       number;
    imageUrl:    string;
    createdAt:   Date;
    updatedAt:   Date;
    categoryId:  number;
}

export interface ResponseProductById  {
    message: string;
    product: ProductDetails;
}

export interface ProductDetails {
    id:          number;
    name:        string;
    description: string;
    price:       number;
    stock:       number;
    imageUrl:    string;
    categoryId:  number;
    sellerId:    number;
    createdAt:   Date;
    updatedAt:   Date;
    category:    Category;
    seller:      Seller;
}

export interface Seller {
    id:      number;
    email:   string;
    profile: Profile;
}

export interface ResponseProductsByCategory {
    message:    string;
    category:   Category;
    products:   Product[];
    pagination: Pagination;
}
export interface Pagination {
    total:      number;
    page:       number;
    limit:      number;
    totalPages: number;
}

export interface ResponseMessage {
    success: boolean;
    message: string;
  }
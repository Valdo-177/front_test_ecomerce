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
    role:      string;
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
    description: string;
    price:       number;
    imageUrl:    string;
    createdAt:   Date;
    updatedAt:   Date;
    categoryId:  number;
}
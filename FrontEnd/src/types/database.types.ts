export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    product_id: string | null
                    productId: string | null
                    name: string
                    brand: string
                    link: string
                    image: string
                    price: number
                    list_price: number | null
                    listPrice: number | null
                    source_category_name: string | null
                    source_category_id: number | null
                    category_paths: string[] | null
                    categoryPaths: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Insert: {
                    id?: string
                    product_id?: string | null
                    productId?: string | null
                    name: string
                    brand: string
                    link: string
                    image: string
                    price: number
                    list_price?: number | null
                    listPrice?: number | null
                    source_category_name?: string | null
                    source_category_id?: number | null
                    category_paths?: string[] | null
                    categoryPaths?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string | null
                    productId?: string | null
                    name?: string
                    brand?: string
                    link?: string
                    image?: string
                    price?: number
                    list_price?: number | null
                    listPrice?: number | null
                    source_category_name?: string | null
                    source_category_id?: number | null
                    category_paths?: string[] | null
                    categoryPaths?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            categories: {
                Row: {
                    id: string
                    path: string
                    label: string
                    level: number
                    parent_id: string | null
                    created_at?: string
                }
                Insert: {
                    id?: string
                    path: string
                    label: string
                    level?: number
                    parent_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    path?: string
                    label?: string
                    level?: number
                    parent_id?: string | null
                    created_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

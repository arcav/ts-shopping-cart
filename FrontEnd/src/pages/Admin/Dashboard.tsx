import React, { useMemo } from 'react';
import { ShoppingCartIcon, CubeIcon, TagIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

type DashboardProps = {
    products?: CarItemType[];
    cartProducts: CarItemType[];
};

const Dashboard: React.FC<DashboardProps> = ({ products, cartProducts }) => {

    // Calculate metrics
    const metrics = useMemo(() => {
        if (!products || products.length === 0) return null;

        const totalProducts = products.length;
        const categories = Array.from(new Set(products.map(p => p.category)));
        const totalValue = products.reduce((sum, p) => sum + p.price, 0);
        const avgPrice = totalValue / totalProducts;
        const itemsInCart = cartProducts.reduce((sum, p) => sum + p.amount, 0);
        const cartValue = cartProducts.reduce((sum, p) => sum + (p.price * p.amount), 0);

        // Category distribution
        const categoryData = categories.map(cat => {
            const categoryProducts = products.filter(p => p.category === cat);
            const categoryTotal = categoryProducts.reduce((sum, p) => sum + p.price, 0);
            return {
                name: cat,
                count: categoryProducts.length,
                totalValue: categoryTotal,
                avgPrice: categoryTotal / categoryProducts.length
            };
        }).sort((a, b) => b.count - a.count);

        // Top products by price
        const topProducts = [...products]
            .sort((a, b) => b.price - a.price)
            .slice(0, 10);

        return {
            totalProducts,
            totalCategories: categories.length,
            avgPrice: avgPrice.toFixed(2),
            totalValue: totalValue.toFixed(2),
            itemsInCart,
            cartValue: cartValue.toFixed(2),
            categoryData,
            topProducts
        };
    }, [products, cartProducts]);

    if (!products) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
                    <p className="text-gray-500">Cargando datos del dashboard...</p>
                </div>
            </div>
        );
    }

    if (!metrics || products.length === 0) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard de Productos</h1>
                <div className="text-center py-20 bg-white rounded-xl shadow-md">
                    <CubeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No hay productos disponibles</p>
                    <p className="text-gray-400 text-sm mt-2">Los datos aparecerán aquí cuando se carguen productos</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard de Productos</h1>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">Total Productos</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalProducts}</p>
                        </div>
                        <CubeIcon className="h-12 w-12 text-blue-900 opacity-20" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">Categorías</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalCategories}</p>
                        </div>
                        <TagIcon className="h-12 w-12 text-green-500 opacity-20" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">Precio Promedio</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">R$ {metrics.avgPrice}</p>
                        </div>
                        <CurrencyDollarIcon className="h-12 w-12 text-yellow-500 opacity-20" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium">Items en Carrito</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.itemsInCart}</p>
                            <span className="text-green-500 text-sm">R$ {metrics.cartValue}</span>
                        </div>
                        <ShoppingCartIcon className="h-12 w-12 text-purple-500 opacity-20" />
                    </div>
                </div>
            </div>

            {/* Category Stats */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Resumen por Categoría</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {metrics.categoryData.map((cat, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-semibold text-gray-900 mb-2">{cat.name}</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Productos:</span>
                                    <span className="font-bold text-blue-900">{cat.count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Valor Total:</span>
                                    <span className="font-semibold text-gray-900">R$ {cat.totalValue.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Precio Prom:</span>
                                    <span className="font-semibold text-gray-900">R$ {cat.avgPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Products Table */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Top 10 Productos por Precio</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Producto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categoría
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {metrics.topProducts.map((product, idx) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {idx + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div className="max-w-xs truncate" title={product.title}>
                                            {product.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        R$ {product.price.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

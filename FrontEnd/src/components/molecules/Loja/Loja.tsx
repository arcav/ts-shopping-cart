import React from "react";
import { useLocationStore } from "@/context/LocationContext";
import { ArrowPathIcon, ChevronDownIcon, ChevronRightIcon, WalletIcon } from "@heroicons/react/24/outline";

export const Loja: React.FC = () => {
    const { currentStore } = useLocationStore();

    return (
        <div className="bg-white border-b border-gray-100 py-4 hidden md:block mt-8"  >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm text-gray-600">

                <div className="flex items-center space-x-6">
                    {/* Store Selector */}
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                        <span className="text-gray-400 mr-1">Loja de</span>
                        <span className="font-bold text-gray-800">{currentStore}</span>
                        <ArrowPathIcon className="h-4 w-4 ml-2 text-gray-500" />
                    </div>

                    {/* Pickup Option */}
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                        <span className="font-semibold text-gray-700">Retirada</span>
                        <ChevronDownIcon className="h-3 w-3 ml-2 text-gray-400" />
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors group">
                        <span className="font-semibold text-gray-700 group-hover:text-blue-900 transition-colors">Agende o horário de retirada</span>
                        <ChevronRightIcon className="h-3 w-3 ml-2 text-gray-400 group-hover:text-blue-900" />
                    </div>
                </div>

                {/* Payment Options (Right side) */}
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors group">
                    <WalletIcon className="h-4 w-4 mr-2 text-gray-500 group-hover:text-blue-900" />
                    <span className="font-semibold text-gray-700 group-hover:text-blue-900">Veja opções de pagamento</span>
                    <ChevronRightIcon className="h-3 w-3 ml-2 text-gray-400 group-hover:text-blue-900" />
                </div>
            </div>
        </div>
    );
}

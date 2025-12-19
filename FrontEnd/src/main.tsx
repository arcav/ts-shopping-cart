import React from 'react'
import './index.css'
import ReactDom from 'react-dom'
import App from './App'
//React Query
import { QueryClient, QueryClientProvider } from 'react-query'



//QueryClient Inicialitation
const client = new QueryClient()

ReactDom.render(
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>,
    document.getElementById("root"))
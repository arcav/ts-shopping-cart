import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useCart } from '../useCart';
import { QueryClient, QueryClientProvider } from 'react-query';
import { supabase } from '../../lib/supabaseClient';

// Mock Supabase
// We assume 'supabase' is exported as a constant from the module
vi.mock('../../lib/supabaseClient', () => ({
    supabase: {
        from: vi.fn(),
    },
}));

// Test Component to consume the hook
const TestComponent = () => {
    const { data, isLoading, error } = useCart();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <div>
            <div data-testid="product-count">{data?.length}</div>
            {data && data.length > 0 && <div data-testid="first-product">{data[0].title}</div>}
        </div>
    );
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // Disable retries for testing
        },
    },
});

describe('useCart Hook (Supabase Integration)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    test('fetches products successfully', async () => {
        // Setup Supabase Mock Response
        const mockDBData = [{
            id: '1',
            name: 'Supabase Product',
            price: 100,
            image: 'img.jpg',
            source_category_name: 'Test Cat',
            category_paths: ['/cat/subcat'],
            product_id: 'prod-1'
        }];

        const selectMock = vi.fn().mockResolvedValue({ data: mockDBData, error: null });
        const fromMock = vi.fn().mockReturnValue({ select: selectMock });

        // TypeScript cast to allow mocking methods
        (supabase.from as any).mockImplementation(fromMock);

        render(
            <QueryClientProvider client={queryClient}>
                <TestComponent />
            </QueryClientProvider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByTestId('product-count')).toHaveTextContent('1');
            expect(screen.getByTestId('first-product')).toHaveTextContent('Supabase Product');
        });
    });

    test('handles fetch error', async () => {
        // Setup Error Mock
        const selectMock = vi.fn().mockResolvedValue({ data: null, error: { message: 'Fetch Failed' } });
        const fromMock = vi.fn().mockReturnValue({ select: selectMock });
        (supabase.from as any).mockImplementation(fromMock);

        render(
            <QueryClientProvider client={queryClient}>
                <TestComponent />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
        });
    });
});

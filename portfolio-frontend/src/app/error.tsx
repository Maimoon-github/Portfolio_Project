'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Home, RefreshCw } from 'lucide-react';

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-lg border-border/50">
                <CardHeader>
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center text-destructive mx-auto mb-4">
                        <RefreshCw className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-center text-2xl">Something went wrong</CardTitle>
                    <CardDescription className="text-center">
                        We encountered an unexpected error. Please try again or head back home.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Optional: Show error details in dev mode only */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                            <p className="text-xs font-mono text-destructive/80">
                                {error.message}
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button onClick={reset} className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ErrorPage;
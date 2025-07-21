import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    FIRECRAWL_API_KEY: !!process.env.FIRECRAWL_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    firecrawlKeyFormat: process.env.FIRECRAWL_API_KEY?.startsWith('fc-') || false,
    ssrSafe: typeof window === 'undefined', // Should always be true on server
  };

  const allGood = checks.ANTHROPIC_API_KEY && 
                  checks.FIRECRAWL_API_KEY && 
                  checks.firecrawlKeyFormat &&
                  checks.ssrSafe;

  return NextResponse.json({
    status: allGood ? 'ready' : 'configuration_error',
    checks,
    message: allGood 
      ? 'All environment variables are configured correctly'
      : 'Some environment variables are missing or misconfigured'
  });
} 
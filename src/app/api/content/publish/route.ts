import { revalidatePath } from 'next/cache';


async function handler(): Promise<Response>
{
    // Re-Validate all Static Paths
  revalidatePath('/');
	return new Response('Static Paths Re-Validated', { status: 200 });
}

export const dynamic = 'force-dynamic'      // Make sure all API-Requests are executed
export const dynamicParams = true           // Make sure all matching routes are always executed
export const revalidate = 0                 // Don't cache
export const fetchCache = 'force-no-store'  // Don't cache
export const runtime = 'nodejs'             // Run on Node.JS
export const GET = handler
export const POST = handler
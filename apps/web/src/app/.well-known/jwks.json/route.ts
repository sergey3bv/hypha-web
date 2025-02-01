import { NextResponse } from 'next/server';
import type { JSONWebKeySet } from 'jose';

const JWKS_URLS = {
  social: 'https://api-auth.web3auth.io/jwks',
  wallet: 'https://authjs.web3auth.io/jwks',
};

type JWKSResponse = JSONWebKeySet;

// This function handles GET requests to /.well-known/jwks.json
export async function GET() {
  try {
    // Fetch both JWKS in parallel
    const [socialJwks, walletJwks] = (await Promise.all([
      fetch(JWKS_URLS.social).then((res) => res.json()),
      fetch(JWKS_URLS.wallet).then((res) => res.json()),
    ])) as [JWKSResponse, JWKSResponse];

    // Combine the keys from both JWKS
    const combinedJwks: JWKSResponse = {
      keys: [...(socialJwks.keys || []), ...(walletJwks.keys || [])],
    };

    return NextResponse.json(combinedJwks);
  } catch (error) {
    console.error('Error fetching JWKS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch JWKS' },
      { status: 500 },
    );
  }
}

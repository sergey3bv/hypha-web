import { NextRequest, NextResponse } from 'next/server';

import { createDocumentService } from '@hypha-platform/core/server';

type Params = { documentSlug: string };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const { documentSlug } = await params;

  // Get token from Authorization header
  const authToken = request.headers.get('Authorization')?.split(' ')[1] || '';

  try {
    const documentsService = createDocumentService({ authToken });

    const document = await documentsService.getBySlug({
      slug: documentSlug,
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error('Failed to fetch document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 },
    );
  }
}

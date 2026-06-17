// app/api/download-pdf/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  // Fetch the stored PDF URL from profile (id=1)
  const { data, error } = await supabase
    .from('profile')
    .select('portfolio_pdf_url')
    .eq('id', 1)
    .maybeSingle();

  if (error || !data?.portfolio_pdf_url) {
    return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
  }

  const pdfUrl = data.portfolio_pdf_url;

  // Fetch the PDF from Cloudinary (or any URL)
  const response = await fetch(pdfUrl);
  if (!response.ok) {
    return NextResponse.json({ error: 'Unable to retrieve PDF' }, { status: 502 });
  }

  // Clone headers and force download disposition
  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'application/pdf');
  headers.set('Content-Disposition', 'attachment; filename="portfolio.pdf"');

  return new Response(response.body, { status: response.status, headers });
}

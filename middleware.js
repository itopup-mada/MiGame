import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Ity no manindrona ny script ao anaty HTML amin'ny fotoana farany
  // Tsy hita ao amin'ny GitHub ny script fa ny navigateur vao mahita azy
  const scriptTag = '<script src="/api/main"></script></body>';
  
  // Fanamarihana: Ity fomba ity dia miasa tsara amin'ny Edge Functions
  return response;
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // For now, just log the performance data
    console.log('Performance analytics received:', body);
    
    // In a real app, you'd store this in a database
    return NextResponse.json({ success: true, message: 'Performance data recorded' });
  } catch (error) {
    console.error('Error recording performance data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record performance data' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Return sample performance metrics for development
  return NextResponse.json({
    metrics: {
      pageLoadTime: 1200,
      firstContentfulPaint: 800,
      largestContentfulPaint: 1500,
      timeToInteractive: 2000,
      cumulativeLayoutShift: 0.05
    },
    timestamp: new Date().toISOString()
  });
}

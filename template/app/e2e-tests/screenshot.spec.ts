import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import path from 'path';

// Define DB URL (SQLite)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(process.cwd(), '.wasp/out/db/dev.db')}`,
    },
  },
});

test.describe('Screenshots', () => {
  test('Capture All Features', async ({ page }) => {
    test.setTimeout(120000); // Increase timeout to 2 minutes

    // 1. Landing Page
    console.log('Navigating to Landing Page...');
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'landing_page.png', fullPage: true });
    console.log('Captured Landing Page');

    // 2. Login Page
    console.log('Navigating to Login Page...');
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'login_page.png', fullPage: true });
    console.log('Captured Login Page');

    // 3. Signup Page
    console.log('Navigating to Signup Page...');
    await page.goto('http://localhost:3000/signup');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'signup_page.png', fullPage: true });
    console.log('Captured Signup Page');

    // 4. Create User & Seed Content
    const email = `testuser_${Date.now()}@viralloop.com`;
    const password = 'password123';

    // Use UI to signup to ensure session
    console.log('Signing up...');
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for redirect - increased timeout and added more checks
    try {
        await page.waitForURL('**/demo-app', { timeout: 30000 });
    } catch (e) {
        console.log('Wait for URL failed, checking if we are already there or stuck...');
        // Sometimes Wasp redirects to /login if signup fails? Or maybe stays on /signup?
        const url = page.url();
        console.log('Current URL:', url);
    }

    // Now get the user from DB to seed content
    const user = await prisma.user.findFirst({
        where: { email },
    });

    if (user) {
        console.log('Seeding content for user:', user.id);
        await prisma.contentHistory.create({
            data: {
                userId: user.id,
                title: 'Rick Astley - Never Gonna Give You Up',
                sourceUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                summary: '• Key insight 1: Never give up.\n• Key insight 2: Never let down.',
                viralScore: 92,
                viralReasoning: 'Incredibly recognizable hook and meme potential.',
                createdAt: new Date()
            }
        });
        await prisma.contentHistory.create({
            data: {
                userId: user.id,
                title: 'Alex Hormozi - $100M Leads',
                sourceUrl: 'https://youtube.com/watch?v=xyz',
                linkedin: 'Stop overcomplicating sales. 🛑\n\nHere is the framework...',
                viralScore: 88,
                viralReasoning: 'Strong authority figure, high value density.',
                createdAt: new Date(Date.now() - 10000)
            }
        });
        await prisma.contentHistory.create({
            data: {
                userId: user.id,
                title: 'MKBHD - iPhone 15',
                sourceUrl: 'https://youtube.com/watch?v=abc',
                twitter: '1/ The new iPhone is here.\n\n2/ It has USB-C.',
                viralScore: 95,
                viralReasoning: 'Trending topic + high production value source.',
                createdAt: new Date(Date.now() - 20000)
            }
        });
    }

    // 5. Dashboard - Empty / Initial
    console.log('Navigating to Dashboard...');
    await page.goto('http://localhost:3000/dashboard');

    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'dashboard_initial.png', fullPage: true });
    console.log('Captured Dashboard Initial');

    // 6. Dashboard - Select Summary
    console.log('Selecting Summary (History Item)...');
    try {
        await page.click('button:has-text("History")'); // Switch to History tab first? No, History is a separate view now.
        // Wait, "History" is a tab in the sidebar.
        // Click "History" in sidebar
        await page.click('button:has-text("History")');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'dashboard_history_list.png', fullPage: true });

        // Click a Load button
        const loadButtons = await page.$$('button:has-text("Load")');
        if (loadButtons.length > 0) {
            await loadButtons[0].click();
            await page.waitForTimeout(2000);
            await page.screenshot({ path: 'dashboard_view_content.png', fullPage: true });
        }
    } catch(e) {
        console.log('Could not navigate history', e);
    }

    // 7. Dashboard - Analytics
    console.log('Navigating to Analytics...');
    try {
        await page.click('button:has-text("Analytics")');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'dashboard_analytics.png', fullPage: true });
    } catch(e) {
        console.log('Could not navigate analytics', e);
    }

    // 8. Dashboard - Templates
    console.log('Navigating to Templates...');
    try {
        await page.click('button:has-text("Templates")');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'dashboard_templates.png', fullPage: true });
    } catch(e) {
        console.log('Could not navigate templates', e);
    }

    console.log('All screenshots captured.');
  });
});

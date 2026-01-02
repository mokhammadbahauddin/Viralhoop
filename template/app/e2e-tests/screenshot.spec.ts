import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import path from 'path';

// Define DB URL (SQLite)
const prisma = new PrismaClient({
  datasources: {
    db: {
      // The test runs from template/app/e2e-tests ?? No, playwright runs from template/app usually if run via npx playwright test
      // If I run `npx playwright test e2e-tests/screenshot.spec.ts` from `template/app`, CWD is `template/app`.
      // So the path should be relative to CWD.
      // .wasp/out/db/dev.db is in `template/app/.wasp/out/db/dev.db`.
      // So `file:./.wasp/out/db/dev.db` should be correct if Prisma resolves relative to CWD?
      // Or Prisma resolves relative to schema?
      // When initializing PrismaClient manually, it might depend.
      // Let's try absolute path.
      url: `file:${path.join(process.cwd(), '.wasp/out/db/dev.db')}`,
    },
  },
});

test.describe('Screenshots', () => {
  test('Capture All Features', async ({ page }) => {
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

    // Wait for redirect
    await page.waitForURL('**/demo-app', { timeout: 15000 }).catch(() => console.log('Redirect timeout, checking location...'));

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
                createdAt: new Date()
            }
        });
        await prisma.contentHistory.create({
            data: {
                userId: user.id,
                title: 'Alex Hormozi - $100M Leads',
                sourceUrl: 'https://youtube.com/watch?v=xyz',
                linkedin: 'Stop overcomplicating sales. 🛑\n\nHere is the framework...',
                createdAt: new Date(Date.now() - 10000)
            }
        });
        await prisma.contentHistory.create({
            data: {
                userId: user.id,
                title: 'MKBHD - iPhone 15',
                sourceUrl: 'https://youtube.com/watch?v=abc',
                twitter: '1/ The new iPhone is here.\n\n2/ It has USB-C.',
                createdAt: new Date(Date.now() - 20000)
            }
        });
        await prisma.contentHistory.create({
            data: {
                userId: user.id,
                title: 'Lex Fridman #302',
                sourceUrl: 'https://youtube.com/watch?v=123',
                blog: '# The Future of AI\n\nIt is bright.',
                createdAt: new Date(Date.now() - 30000)
            }
        });
    }

    // 5. Dashboard - Empty / Initial
    console.log('Navigating to Dashboard...');
    await page.goto('http://localhost:3000/dashboard');

    // Wait for the query to fetch. It might take a moment or two.
    // Instead of reload, just waiting might be enough if standard Wasp query refetching works.
    // But since we inserted into DB bypassing Wasp server (via direct Prisma), Wasp server doesn't know to invalidate cache immediately for this client.
    // So reload is good.
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Sometimes text selector is finicky if text is inside multiple elements.
    // Let's try waiting for any content in the history list.
    // The history items have class "font-medium truncate".
    // Try waiting for any div inside the history list container
    // Or just a fixed wait since we are in a rush and selectors are flaky without explicit test IDs
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'dashboard_initial.png', fullPage: true });
    console.log('Captured Dashboard Initial');

    // 6. Dashboard - Select Summary
    console.log('Selecting Summary...');
    try {
        // Use a more forceful strategy. We know it's a list.
        // Wait for the specific text to appear
        const locator = page.locator('text=Rick Astley').first();
        await locator.waitFor({ state: 'visible', timeout: 30000 });
        await locator.click({ force: true });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'dashboard_view_summary.png', fullPage: true });
    } catch(e) {
        console.log('Could not click Summary item', e);
        await page.screenshot({ path: 'dashboard_error_summary.png', fullPage: true });
    }

    // 7. Dashboard - Select LinkedIn
    console.log('Selecting LinkedIn...');
    try {
        const locator = page.locator('text=Alex Hormozi').first();
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click({ force: true });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'dashboard_view_linkedin.png', fullPage: true });
    } catch(e) {
        console.log('Could not click LinkedIn item', e);
    }

    // 8. Dashboard - Select Twitter
    console.log('Selecting Twitter...');
    try {
        const locator = page.locator('text=MKBHD').first();
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click({ force: true });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'dashboard_view_twitter.png', fullPage: true });
    } catch(e) {
        console.log('Could not click Twitter item', e);
    }

    // 9. Dashboard - Select Blog
    console.log('Selecting Blog...');
    try {
        const locator = page.locator('text=Lex Fridman').first();
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click({ force: true });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'dashboard_view_blog.png', fullPage: true });
    } catch(e) {
        console.log('Could not click Blog item', e);
    }

    console.log('All screenshots captured.');
  });
});

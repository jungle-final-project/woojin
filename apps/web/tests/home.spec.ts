import { expect, test } from '@playwright/test';

async function openHomeAsUser(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    localStorage.setItem('buildgraph.token', 'jwt-user-token');
  });
  await page.route('**/api/auth/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'user-1004',
        email: 'user@example.com',
        name: '테스트 사용자',
        role: 'USER'
      })
    });
  });
  await page.goto('/');
}

test('renders the home command center with primary quote actions', async ({ page }) => {
  await openHomeAsUser(page);
  const main = page.getByRole('main');

  await expect(main.getByRole('heading', { name: '검증 근거가 남는 AI PC 견적' })).toBeVisible();
  await expect(main.getByRole('link', { name: /AI 견적 생성/ })).toHaveAttribute('href', '/requirements/new');
  await expect(main.getByRole('link', { name: /셀프 견적/ })).toHaveAttribute('href', '/self-quote');
  await expect(main.getByRole('heading', { name: 'RAG 근거', exact: true })).toBeVisible();
  await expect(main.getByRole('heading', { name: 'Tool 검증', exact: true })).toBeVisible();
  await expect(main.getByRole('heading', { name: '추천 Build', exact: true })).toBeVisible();
});

test('keeps shared header and navigation destinations unchanged', async ({ page }) => {
  await openHomeAsUser(page);
  const header = page.locator('header');
  const nav = page.getByRole('navigation');

  await expect(header.getByRole('link', { name: 'AI 견적' })).toHaveAttribute('href', '/requirements/new');
  await expect(header.getByRole('link', { name: '내 견적함' })).toHaveAttribute('href', '/my/quotes');
  await expect(header.getByRole('link', { name: 'AS 접수' })).toHaveAttribute('href', '/support/new');
  await expect(nav.getByRole('link', { name: '홈' })).toHaveAttribute('href', '/');
  await expect(nav.getByRole('link', { name: '셀프 견적' })).toHaveAttribute('href', '/self-quote');
  await expect(nav.getByRole('link', { name: '관리자' })).toHaveAttribute('href', '/admin');
});

test('keeps the home command center usable on mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHomeAsUser(page);
  const main = page.getByRole('main');

  await expect(main.getByRole('heading', { name: '검증 근거가 남는 AI PC 견적' })).toBeVisible();
  await expect(main.getByRole('link', { name: /AI 견적 생성/ })).toBeVisible();

  const hasBodyOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasBodyOverflow).toBe(false);
});

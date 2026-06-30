import { expect, test } from '@playwright/test';

test('shows login API error message and does not save tokens', async ({ page }) => {
  await page.route('**/api/auth/login', async (route) => {
    expect(JSON.parse(route.request().postData() ?? '{}')).toEqual({
      email: 'user@example.com',
      password: 'wrong-password'
    });
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({
        code: 'UNAUTHORIZED',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.'
      })
    });
  });

  await page.goto('/login');
  await page.getByLabel('이메일').fill('user@example.com');
  await page.getByLabel('비밀번호').fill('wrong-password');
  await page.getByRole('button', { name: '로그인' }).click();

  await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('buildgraph.token'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('buildgraph.refreshToken'))).toBeNull();
});

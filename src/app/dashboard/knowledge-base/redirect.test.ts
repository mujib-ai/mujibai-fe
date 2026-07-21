import nextConfig from '../../../../next.config';

// next-intl@4.7's plugin has a known Jest/CJS interop bug (it resolves a
// path via `import.meta.url`-style logic that only works under Next's own
// webpack loader). The redirects() array itself doesn't touch next-intl at
// all, so stub the plugin wrapper out to a passthrough for this test.
jest.mock('next-intl/plugin', () => () => (config: unknown) => config);

describe('legacy voice-script redirect', () => {
  it('permanently redirects /dashboard/voice-script to /dashboard/knowledge-base', async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toContainEqual({
      source: '/dashboard/voice-script',
      destination: '/dashboard/knowledge-base',
      permanent: true,
    });
  });
});

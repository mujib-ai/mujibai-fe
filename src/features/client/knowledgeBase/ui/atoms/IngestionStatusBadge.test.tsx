import { render, screen } from '@testing-library/react';

import { INGESTION_STATUSES } from '../../constants/ingestion-status';
import IngestionStatusBadge from './IngestionStatusBadge';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('IngestionStatusBadge', () => {
  it.each(INGESTION_STATUSES)(
    'renders the localized label key for "%s"',
    status => {
      render(<IngestionStatusBadge status={status} />);
      expect(screen.getByText(`status.${status}.label`)).toBeInTheDocument();
    }
  );

  it('shows a spinner only for processing statuses', () => {
    const { container: processingContainer } = render(
      <IngestionStatusBadge status="embedding" />
    );
    expect(
      processingContainer.querySelector('.animate-spin')
    ).toBeInTheDocument();

    const { container: finalContainer } = render(
      <IngestionStatusBadge status="completed" />
    );
    expect(
      finalContainer.querySelector('.animate-spin')
    ).not.toBeInTheDocument();
  });
});

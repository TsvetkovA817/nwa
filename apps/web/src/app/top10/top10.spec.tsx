import { render } from '@testing-library/react';

import Top10 from './top10';

describe('News', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Top10 />);
    expect(baseElement).toBeTruthy();
  });
});

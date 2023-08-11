import { render, screen } from '@testing-library/react';
import ToDo from ',/ToDo';

test('renders learn react link', () => {
  render(<ToDo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

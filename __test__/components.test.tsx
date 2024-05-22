import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '@/shared/ui/button/button';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { setupStore } from '@/app/store/config/store';
import { LoginForm } from '@/features/Login';
import cls from '@/widgets/Header/Header.module.scss';

// TODO add more tests, fix env problem
describe('Components render test', () => {
  it('should render a button', () => {
    render(<Button text="Valera" />);
    expect(screen.getByText('Valera')).toBeInTheDocument();
  });

  it('should render a link', () => {
    render(
      <BrowserRouter>
        <AppLink to="/main" className={cls.logo}>
          <span>Link</span>
        </AppLink>
      </BrowserRouter>,
    );
    expect(screen.getByText('Valera')).toHaveRole('link');
  });

  it('should render a login form', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <LoginForm data-testid="username" />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    expect(screen.getAllByText(/login/i)).toHaveLength(2);
  });
});

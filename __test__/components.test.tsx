import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Button } from '@/shared/ui/button/button';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { App } from '@/app/App';
import { setupStore } from '@/app/store/config/store';

describe('Components render test', () => {
  it('should render a button', () => {
    const component = renderer.create(<Button text="Valera" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a link', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AppLink text="valeraa" to="/registration" />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an app', () => {
    const store = setupStore();
    const component = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

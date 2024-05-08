import { Button } from '@/shared/ui/button/button';
import renderer from 'react-test-renderer';
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {BrowserRouter} from "react-router-dom";
import {App} from "@/app/App";
import {Provider} from "react-redux";
import { setupStore } from "@/app/store/config/store";

describe('Components render test', () => {
  it('should render a button', () => {
    const component = renderer.create(
      <Button text={'Valera'}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should render a link', () => {
    const component = renderer.create(
      <BrowserRouter>
        <AppLink text="valeraa" to={'/registration'}></AppLink>
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an app', () => {
    const store = setupStore();
    const component = renderer.create(
      <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      </Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
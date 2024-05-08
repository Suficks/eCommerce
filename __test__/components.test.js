import { Button } from '@/shared/ui/button/button';
import renderer from 'react-test-renderer';
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {BrowserRouter} from "react-router-dom";
import {App} from "@/app/App";

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
      </BrowserRouter>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an app', () => {
    const component = renderer.create(
      <BrowserRouter>
        <App/>,
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
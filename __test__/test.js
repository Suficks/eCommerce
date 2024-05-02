// define your tests in this folder
// import func that you want to test
// functionTestExample:

// import {App} from '../src/app/App';

// test('two plus two is four', () => {
//     expect(2 + 2).toBe(2);
// });

// componentTestExample:

// import Link from '../src/app/App';
// import renderer from 'react-test-renderer';
//
// it('changes the class when hovered', () => {
//     const component = renderer.create(
//         <Link page="http://www.facebook.com">Facebook</Link>,
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//
//     // manually trigger the callback
//     renderer.act(() => {
//         tree.props.onMouseEnter();
//     });
//     // re-rendering
//     tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//
//     // manually trigger the callback
//     renderer.act(() => {
//         tree.props.onMouseLeave();
//     });
//     // re-rendering
//     tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });
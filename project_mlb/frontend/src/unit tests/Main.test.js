import {createStar} from '../pages/Main';

test('createStar(3)', ()=> {
    const stars = createStar(3);
    const filledStar = stars.filter((s) => s.props.src === 'star.png').length;
    const emptyStar = stars.filter((s) => s.props.src === 'blank_star.png').length;
    expect(filledStar).toBe(3);
    expect(emptyStar).toBe(2);
});

test('createStar(0)', ()=> {
    const stars = createStar(0);
    const filledStar = stars.filter((s) => s.props.src === 'star.png').length;
    const emptyStar = stars.filter((s) => s.props.src === 'blank_star.png').length;
    expect(filledStar).toBe(0);
    expect(emptyStar).toBe(5);
});

test('createStar(5)', ()=> {
    const stars = createStar(5);
    const filledStar = stars.filter((s) => s.props.src === 'star.png').length;
    const emptyStar = stars.filter((s) => s.props.src === 'blank_star.png').length;
    expect(filledStar).toBe(5);
    expect(emptyStar).toBe(0);
});

test('createStar(3.6)', ()=> {
    const stars = createStar(3.6);
    const filledStar = stars.filter((s) => s.props.src === 'star.png').length;
    const emptyStar = stars.filter((s) => s.props.src === 'blank_star.png').length;
    expect(filledStar).toBe(4);
    expect(emptyStar).toBe(1);
});
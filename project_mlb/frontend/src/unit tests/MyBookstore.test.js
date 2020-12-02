import {createRequestsCol} from '../pages/MyBookstore';

test('createRequestsCol(5)', ()=> {
    const requestsCol = createRequestsCol(5);
    const color = requestsCol.props.style.color;
    expect(color).toBe('red');
});
test('createRequestsCol(0)', ()=> {
    const requestsCol = createRequestsCol(0);
    const style = requestsCol.props.style;
    expect(style).toBeUndefined();
});
test('createRequestsCol(-1)', ()=> {
    const requestsCol = createRequestsCol(-1);
    const style = requestsCol.props.style;
    expect(style).toBeUndefined();
});
test('createRequestsCol(525124)', ()=> {
    const requestsCol = createRequestsCol(525124);
    const color = requestsCol.props.style.color;
    expect(color).toBe('red');
});

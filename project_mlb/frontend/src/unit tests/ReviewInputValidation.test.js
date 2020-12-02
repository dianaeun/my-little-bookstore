import { vaildateReviewInput } from '../functions/InputValidations.js';

test('vaildateReviewInput: Title, Content valid', ()=> {
    const check = vaildateReviewInput("This is title", "This is content");
    expect(check).toBeTruthy();
});

test('vaildateReviewInput: Title, Content Empty', ()=> {
    const check = vaildateReviewInput("", "");
    expect(check).toBeFalsy();
});

test('vaildateReviewInput: Title Empty', ()=> {
    const check = vaildateReviewInput("", "This is content");
    expect(check).toBeFalsy();
});

test('vaildateReviewInput: Content Empty', ()=> {
    const check = vaildateReviewInput("This is title", "");
    expect(check).toBeFalsy();
});
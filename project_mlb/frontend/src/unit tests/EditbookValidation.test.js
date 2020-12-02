import { validateEditbookInput } from '../functions/InputValidations.js';

test('validateEditbookInput: valid Editbook', ()=> {
    const check = validateEditbookInput("Harry Poter","Louis","test","11");
    expect(check).toBeTruthy();
});

test('validateEditbookInput: without title', ()=> {
    const check = validateEditbookInput("","Louis","test","12");
    expect(check).toBeFalsy();
});

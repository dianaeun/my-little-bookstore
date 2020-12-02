import { validateISBN } from '../functions/InputValidations.js';

test('validateISBN: valid ISBN13', ()=> {
    const check = validateISBN("9780689833755");
    expect(check).toBeTruthy();
});

test('validateISBN: Includes characters', ()=> {
    const check = validateISBN("a780689833755");
    expect(check).toBeFalsy();
});

test('validateISBN: Length is not 13', ()=> {
    const check = validateISBN("978068983");
    expect(check).toBeFalsy();
});

test('validateISBN: Invalid check digit', ()=> {
    const check = validateISBN("9780689833759");
    expect(check).toBeFalsy();
});
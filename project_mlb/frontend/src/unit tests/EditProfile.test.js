import { validateEditProfile } from '../functions/InputValidations.js';

test('validateEditProfile: valid EditProfile', ()=> {
    const check = validateEditProfile("Louis","Park","test@gmail.com");
    expect(check).toBeTruthy();
});

test('validateEditProfile: without firstname and email', ()=> {
    const check = validateEditProfile("","Louis","");
    expect(check).toBeFalsy();
});

test('validateEditProfile: without firstname', ()=> {
    const check = validateEditProfile("","Louis","abc@naver.com");
    expect(check).toBeFalsy();
});

test('validateEditProfile: without lastname', ()=> {
    const check = validateEditProfile("Park","","abc@naver.com");
    expect(check).toBeFalsy();
});

import {validateInputFields} from '../pages/Signup';

// firstName, lastName, emailPre, password, emailPost, userID, phoneNum1, phoneNum2, phoneNum3, location

test('validateInputFields', ()=> {
    const validity = validateInputFields("", "", "", "", "", "", "", "", "", "");
    expect(validity).toBeFalsy();
});

test('validateInputFields', ()=> {
    const validity = validateInputFields("hyeonjoon", "lee", "hyeon", "1234", "@gmail.com", "", "010", "2474", "6905", "wonju");
    expect(validity).toBeFalsy();
});

test('validateInputFields', ()=> {
    const validity = validateInputFields("hyeonjoon", "lee", "hyeon", "", "@gmail.com", "", "010", "2474", "6905", "wonju");
    expect(validity).toBeFalsy();
});
test('validateInputFields', ()=> {
    const validity = validateInputFields("hyeonjoon", "lee", "", "1234", "@gmail.com", "", "010", "2474", "6905", "wonju");
    expect(validity).toBeFalsy();
});

test('validateInputFields', ()=> {
    const validity = validateInputFields("hyeonjoon", "lee", "hyeon", "1234", "@gmail.com", "hyeonhyeon", "010", "2474", "6905", "wonju");
    expect(validity).toBeTruthy();
});



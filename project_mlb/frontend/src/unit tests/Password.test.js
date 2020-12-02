import {validatePassword} from '../pages/Signup';

test('validatePassword(short)', ()=> {
    const validity = validatePassword("hi");
    expect(validity).toBeFalsy();
});

test('validatePassword(noNumber)', ()=> {
    const validity = validatePassword("IHaveNoNumber");
    expect(validity).toBeFalsy();
});
test('validatePassword(noCaptial)', ()=> {
    const validity = validatePassword("ihavenocapital0");
    expect(validity).toBeFalsy();
});
test('validatePassword(nosmallLetter)', ()=> {
    const validity = validatePassword("IAMHUGEPASSWORD9");
    expect(validity).toBeFalsy();
});
test('validatePassword(perfect)', ()=> {
    const validity = validatePassword("GoodPassWord7");
    expect(validity).toBeTruthy();
});



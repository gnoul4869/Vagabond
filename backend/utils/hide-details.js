export const hideEmail = (email) => {
    return email.replace(/(.{2})(.*)(?=@)/, (match, g1, g2) => {
        for (let i = 0; i < g2.length; i++) {
            g1 += '*';
        }
        return g1;
    });
};

export const hidePhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d*)(\d{2})/, (match, g1, g2) => {
        let replacer = '';
        for (let i = 0; i < g1.length; i++) {
            replacer += '*';
        }
        return (replacer += g2);
    });
};

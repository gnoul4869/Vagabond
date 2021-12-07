export const OTPEmailTemplate = (name, otp) => {
    return `
        <body>
            <center>
                <table width="100%" style="background-color: whitesmoke; min-width: 600px">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" width="100%" style="min-width: 600px">
                                <center>
                                    <table
                                        width="100%"
                                        style="min-width: 500px"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td align="center">
                                                    <table
                                                        width="100%"
                                                        style="min-width: 500px"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                    >
                                                        <tbody>
                                                            <tr height="50">
                                                                <td
                                                                    width="100%"
                                                                    height="50"
                                                                    style="
                                                                        line-height: 1px;
                                                                        font-size: 1px;
                                                                    "
                                                                >
                                                                    &nbsp;
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center">
                                                                    <table
                                                                        width="100%"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="max-width: 400px"
                                                                    >
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    valign="middle"
                                                                                    align="center"
                                                                                >
                                                                                    <img
                                                                                        align="none"
                                                                                        alt="vagabond"
                                                                                        border="0"
                                                                                        hspace="0"
                                                                                        src="https://firebasestorage.googleapis.com/v0/b/vagabond-8bd3f.appspot.com/o/vagabond_brand_alt.png?alt=media&token=13a8a214-3bad-46f8-b935-04b88bc396e5"
                                                                                        style="
                                                                                            max-width: 400px;
                                                                                            height: auto;
                                                                                            display: block;
                                                                                            margin: 0px;
                                                                                        "
                                                                                        title="Vagabond"
                                                                                        vspace="0"
                                                                                        width="100%"
                                                                                        height="auto"
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <table
                                                        width="100%"
                                                        style="min-width: 500px"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td align="center">
                                                                    <table
                                                                        width="500"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        style="min-width: 500px"
                                                                    >
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    width="100%"
                                                                                    height="50"
                                                                                    style="
                                                                                        line-height: 1px;
                                                                                        font-size: 1px;
                                                                                    "
                                                                                >
                                                                                    <div
                                                                                        style="
                                                                                            font-family: sans-serif;
                                                                                            color: #202020;
                                                                                            text-align: center;
                                                                                            font-size: 26px;
                                                                                            line-height: 32px;
                                                                                            line-height: 100%;
                                                                                            letter-spacing: 2px;
                                                                                        "
                                                                                    >
                                                                                        Mã OTP của bạn
                                                                                        là
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td
                                                                                    width="100%"
                                                                                    height="50"
                                                                                    style="
                                                                                        line-height: 1px;
                                                                                        font-size: 1px;
                                                                                    "
                                                                                >
                                                                                    <div
                                                                                        style="
                                                                                            font-family: sans-serif;
                                                                                            color: #202020;
                                                                                            text-align: center;
                                                                                            font-size: 26px;
                                                                                            line-height: 32px;
                                                                                            line-height: 100%;
                                                                                            letter-spacing: 2px;
                                                                                        "
                                                                                    >
                                                                                        ${otp}
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table
                                                                        width="100%"
                                                                        style="min-width: 500px"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                    >
                                                                        <tbody>
                                                                            <tr height="40">
                                                                                <td align="center">
                                                                                    &nbsp;
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table
                                        width="500"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="background-color: #fff; margin: 0 auto"
                                    >
                                        <tbody>
                                            <tr height="20">
                                                <td width="20">&nbsp;</td>
                                                <td
                                                    height="20"
                                                    style="line-height: 1px; font-size: 1px"
                                                >
                                                    &nbsp;
                                                </td>
                                                <td width="20">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td width="50">&nbsp;</td>
                                                <td
                                                    align="left"
                                                    style="
                                                        font-family: arial, helvetica, sans-serif;
                                                        font-size: 14px;
                                                        color: #202020;
                                                        line-height: 19px;
                                                        line-height: 134%;
                                                        letter-spacing: 0.5px;
                                                    "
                                                >
                                                    Xin chào ${name},
                                                    <br /><br />
                                                </td>
                                                <td width="50">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td width="50">&nbsp;</td>
                                                <td
                                                    align="left"
                                                    style="
                                                        font-family: arial, helvetica, sans-serif;
                                                        font-size: 14px;
                                                        color: #202020;
                                                        line-height: 19px;
                                                        line-height: 134%;
                                                        letter-spacing: 0.5px;
                                                    "
                                                >
                                                    Cảm ơn bạn đã đăng ký thành viên. Để tiếp tục, bạn
                                                    vui lòng sử dụng mã OTP trên để tiến hành xác minh
                                                    email.
                                                    <br /><br />
                                                </td>
                                                <td width="50">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
    
                                    <table
                                        width="100%"
                                        style="min-width: 500px"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td align="center">
                                                    <table
                                                        width="500"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        style="min-width: 500px"
                                                    >
                                                        <tbody>
                                                            <tr height="50">
                                                                <td
                                                                    width="100%"
                                                                    height="20"
                                                                    style="
                                                                        line-height: 1px;
                                                                        font-size: 1px;
                                                                    "
                                                                >
                                                                    &nbsp;
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center">
                                                                    <div
                                                                        style="
                                                                            font-family: arial,
                                                                                helvetica, sans-serif;
                                                                            font-weight: bold;
                                                                            font-size: 11px;
                                                                            color: #202020;
                                                                            text-align: center;
                                                                            line-height: 12px;
                                                                        "
                                                                    >
                                                                        <a
                                                                            style="
                                                                                text-decoration: none;
                                                                                color: #037aee;
                                                                            "
                                                                            href="#"
                                                                            target="_blank"
                                                                            >www.vagabond-shop.cf</a
                                                                        ><br />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr height="30">
                                                                <td
                                                                    width="100%"
                                                                    height="20"
                                                                    style="
                                                                        line-height: 1px;
                                                                        font-size: 1px;
                                                                    "
                                                                >
                                                                    &nbsp;
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center">
                                                                    <div
                                                                        style="
                                                                            font-family: arial,
                                                                                helvetica, sans-serif;
                                                                            font-size: 12px;
                                                                            color: #202020;
                                                                            text-align: center;
                                                                            line-height: 12px;
                                                                        "
                                                                    >
                                                                        <p>
                                                                            ©2021 Vagabond - Website
                                                                            thương mại điện tử hàng đầu
                                                                            Việt Nam
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </body>
    `;
};

export const getPasswordResetTemplate = (url: string, name: string) => ({
  subject: 'Password Reset Request',
  text: `You requested a password reset. Click on the link to reset your password: ${url}`,
  html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" /><title></title><style type="text/css" rel="stylesheet" media="all">
    @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
    body {width: 100% !important;height: 100%;margin: 0;-webkit-text-size-adjust: none;}
    a {color: #3869D4;}
    a img {border: none;}
    td {word-break: break-word;}
    .preheader {display: none !important;visibility: hidden;mso-hide: all;font-size: 1px;line-height: 1px;max-height: 0;max-width: 0;opacity: 0;overflow: hidden;}
    body,td,th {font-family: "Nunito Sans", Helvetica, Arial, sans-serif;}
    h1 {margin-top: 0;color: #333333;font-size: 22px;font-weight: bold;text-align: left;}
    h2 {margin-top: 0;color: #333333;font-size: 16px;font-weight: bold;text-align: left;}
    h3 {margin-top: 0;color: #333333;font-size: 14px;font-weight: bold;text-align: left;}
    td,th {font-size: 16px;}
    p,ul,ol,blockquote {margin: .4em 0 1.1875em;font-size: 16px;line-height: 1.625;}
    p.sub {font-size: 13px;}
    .align-right {text-align: right;}
    .align-left {text-align: left;}
    .align-center {text-align: center;}
    .u-margin-bottom-none {margin-bottom: 0;}
    .button {background-color: #3869D4;border-top: 10px solid #3869D4;border-right: 18px solid #3869D4;border-bottom: 10px solid #3869D4;border-left: 18px solid #3869D4;display: inline-block;color: #FFF;text-decoration: none;border-radius: 3px;box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);-webkit-text-size-adjust: none;box-sizing: border-box;}
    .button--green {background-color: #22BC66;border-top: 10px solid #22BC66;border-right: 18px solid #22BC66;border-bottom: 10px solid #22BC66;border-left: 18px solid #22BC66;}
    .button--red {background-color: #FF6136;border-top: 10px solid #FF6136;border-right: 18px solid #FF6136;border-bottom: 10px solid #FF6136;border-left: 18px solid #FF6136;}
    @media only screen and (max-width: 500px) {.button {width: 100% !important;text-align: center !important;}}
    .attributes {margin: 0 0 21px;}
    .attributes_content {background-color: #F4F4F7;padding: 16px;}
    .attributes_item {padding: 0;}
    .related {width: 100%;margin: 0;padding: 25px 0 0 0;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;}
    .related_item {padding: 10px 0;color: #CBCCCF;font-size: 15px;line-height: 18px;}
    .related_item-title {display: block;margin: .5em 0 0;}
    .related_item-thumb {display: block;padding-bottom: 10px;}
    .related_heading {border-top: 1px solid #CBCCCF;text-align: center;padding: 25px 0 10px;}
    .discount {width: 100%;margin: 0;padding: 24px;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;background-color: #F4F4F7;border: 2px dashed #CBCCCF;}
    .discount_heading {text-align: center;}
    .discount_body {text-align: center;font-size: 15px;}
    .social {width: auto;}
    .social td {padding: 0;width: auto;}
    .social_icon {height: 20px;margin: 0 8px 10px 8px;padding: 0;}
    .purchase {width: 100%;margin: 0;padding: 35px 0;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;}
    .purchase_content {width: 100%;margin: 0;padding: 25px 0 0 0;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;}
    .purchase_item {padding: 10px 0;color: #51545E;font-size: 15px;line-height: 18px;}
    .purchase_heading {padding-bottom: 8px;border-bottom: 1px solid #EAEAEC;}
    .purchase_heading p {margin: 0;color: #85878E;font-size: 12px;}
    .purchase_footer {padding-top: 15px;border-top: 1px solid #EAEAEC;}
    .purchase_total {margin: 0;text-align: right;font-weight: bold;color: #333333;}
    .purchase_total--label {padding: 0 15px 0 0;}
    body {background-color: #F2F4F6;color: #51545E;}
    p {color: #51545E;}
    .email-wrapper {width: 100%;margin: 0;padding: 0;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;background-color: #F2F4F6;}
    .email-content {width: 100%;margin: 0;padding: 0;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;}
    .email-masthead {padding: 25px 0;text-align: center;}
    .email-masthead_logo {width: 94px;}
    .email-masthead_name {font-size: 16px;font-weight: bold;color: #A8AAAF;text-decoration: none;text-shadow: 0 1px 0 white;}
    .email-body {width: 100%;margin: 0;padding: 0;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;}
    .email-body_inner {width: 570px;margin: 0 auto;padding: 0;-premailer-width: 570px;-premailer-cellpadding: 0;-premailer-cellspacing: 0;background-color: #FFFFFF;}
    .email-footer {width: 570px;margin: 0 auto;padding: 0;-premailer-width: 570px;-premailer-cellpadding: 0;-premailer-cellspacing: 0;text-align: center;}
    .email-footer p {color: #A8AAAF;}
    .body-action {width: 100%;margin: 30px auto;padding: 0;-premailer-width: 100%;-premailer-cellpadding: 0;-premailer-cellspacing: 0;text-align: center;}
    .body-sub {margin-top: 25px;padding-top: 25px;border-top: 1px solid #EAEAEC;}
    .content-cell {padding: 45px;}
    @media only screen and (max-width: 600px) {.email-body_inner,.email-footer {width: 100% !important;}}
    @media (prefers-color-scheme: dark) {body,.email-body,.email-body_inner,.email-content,.email-wrapper,.email-masthead,.email-footer {background-color: #333333 !important;color: #FFF !important;}}
    :root {color-scheme: light dark;supported-color-schemes: light dark;}
    </style>
    <!--[if mso]>
    <style type="text/css">.f-fallback  {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  </head>
  <body>
    <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="email-masthead">
                <a href="https://example.com" class="f-fallback email-masthead_name">
                Real Estate Evaluations
              </a>
              </td>
            </tr>
            <tr>
              <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <h1>Hi ${name},</h1>
                        <p>You recently requested to reset your password for your Real Estate Evaluations account. Use the button below to reset it. <strong>This password reset is only valid for the next 24 hours.</strong></p>
                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <a href="${url}" class="f-fallback button button--green" target="_blank">Reset your password</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>Thanks,<br>The Real Estate Evaluations team</p>
                        <table class="body-sub" role="presentation">
                          <tr><td><p class="f-fallback sub">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p><p class="f-fallback sub">${url}</p></td></tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        Real Estate Evaluations
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
});

export const getVerifyEmailTemplate = (url: string) => ({
  subject: 'Verify Email Address',
  text: `Click on the link to verify your email address: ${url}`,
  html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Verify your email address</title>
  <style type="text/css" rel="stylesheet" media="all">
    *:not(br):not(tr):not(html) {font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;}
    body {width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #839197;-webkit-text-size-adjust: none;}
    a {color: #414EF9;}
    .email-wrapper {width: 100%;margin: 0;padding: 0;background-color: #F5F7F9;}
    .email-content {width: 100%;margin: 0;padding: 0;}
    .email-masthead {padding: 25px 0;text-align: center;}
    .email-masthead_logo {max-width: 400px;border: 0;}
    .email-masthead_name {font-size: 16px;font-weight: bold;color: #839197;text-decoration: none;text-shadow: 0 1px 0 white;}
    .email-body {width: 100%;margin: 0;padding: 0;border-top: 1px solid #E7EAEC;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;}
    .email-body_inner {width: 570px;margin: 0 auto;padding: 0;}
    .email-footer {width: 570px;margin: 0 auto;padding: 0;text-align: center;}
    .email-footer p {color: #839197;}
    .body-action {width: 100%;margin: 30px auto;padding: 0;text-align: center;}
    .body-sub {margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;}
    .content-cell {padding: 35px;}
    .align-right {text-align: right;}
    h1 {margin-top: 0;color: #292E31;font-size: 19px;font-weight: bold;text-align: left;}
    h2 {margin-top: 0;color: #292E31;font-size: 16px;font-weight: bold;text-align: left;}
    h3 {margin-top: 0;color: #292E31;font-size: 14px;font-weight: bold;text-align: left;}
    p {margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;}
    p.sub {font-size: 12px;}
    p.center {text-align: center;}
    .button {display: inline-block;width: 200px;background-color: #414EF9;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: none;-webkit-text-size-adjust: none;mso-hide: all;}
    .button--green {background-color: #28DB67;}
    .button--red {background-color: #FF3665;}
    .button--blue {background-color: #414EF9;}
    @media only screen and (max-width: 600px) {.email-body_inner,.email-footer {width: 100% !important;}}
    @media only screen and (max-width: 500px) {.button {width: 100% !important;}}
  </style>
</head>
<body>
  <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
          <tr><td class="email-masthead"><a class="email-masthead_name">Real Estate Evaluations</a></td></tr>
          <tr>
            <td class="email-body" width="100%">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <h1>Verify your email address</h1>
                    <p>Thanks for signing up for Real Estate Evaluations! We're excited to have you as an early user.</p>
                    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <div>
                            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:45px;v-text-anchor:middle;width:200px;" arcsize="7%" stroke="f" fill="t">
                            <v:fill type="tile" color="#414EF9" />
                            <w:anchorlock/>
                            <center style="color:#ffffff;font-family:sans-serif;font-size:15px;">Verify Email</center>
                          </v:roundrect><![endif]-->
                            <a href="${url}" class="button button--blue">Verify Email</a>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <p>Thanks,<br>The Real Estate Evaluations Team</p>
                    <table class="body-sub">
                      <tr>
                        <td>
                          <p class="sub">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.</p>
                          <p class="sub"><a href="${url}">${url}</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"><tr><td class="content-cell"><p class="sub center">Real Estate Evaluations</p></td></tr></table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
});

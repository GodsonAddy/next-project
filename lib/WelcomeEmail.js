import nodemailer from "nodemailer";

const sendWelcomeEmail = async ({ user }) => {
  const { email } = user;
  const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVER_SERVICE,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const result = await transport.sendMail({
    to: email,
    from: `"✨ Bloop" ${process.env.EMAIL_FROM}`,
    subject: "Welcome to Bloop! 🎉",
    text: text(),
    html: html(),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};

function html() {
  const escapedHost = "Welcome!".replace(/\./g, "&#8203;.");

  const brandColor = "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        We are looking forward for you having a great time with us at Bloop.
      </td>
    </tr>
     <tr>
      <td align="flex-start"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Thanks,
      </td>
     
    </tr>
    <tr>
      <td align="flex-start"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        The Bloop Team.
      </td>
    </tr>
  </table>
</body>
`;
}

function text() {
  return `Welcome to Bloop! 🎉\n\n`;
}

export default sendWelcomeEmail;

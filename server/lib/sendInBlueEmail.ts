const SibApiV3Sdk = require('sib-api-v3-typescript');
 
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 

export async function sendEmail(to: string, subject: string, htmlContent: string) {
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = {"name":"FoodKloud","email":"noreply@foodkloud.com"};
  sendSmtpEmail.to = [{"email":to,"name":"Recipient"}];
  sendSmtpEmail.params = {"parameter":"My param value","subject":subject};

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function sendSignupConfirmationEmail(to: string, otp: string) {
  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; text-align: center;">
          <img src="https://cdn.dribbble.com/users/7004524/screenshots/15197928/media/40944f27c2dcfaf14038f387b4e88c2d.jpg" alt="FoodDelivery Logo" style="max-width: 150px; margin-bottom: 20px;">
          <h1 style="color: #4CAF50;">Welcome to FoodDelivery!</h1>
          <p style="font-size: 18px;">Thank you for choosing our food delivery service!</p>
          <p style="font-size: 16px;">To complete your registration and start ordering delicious meals, please use the following OTP:</p>
          <h2 style="font-size: 24px; color: #4CAF50; background-color: #e8f5e9; padding: 10px; border-radius: 5px;">${otp}</h2>
          <p style="font-size: 16px;">This OTP is valid for 10 minutes. Please enter it in the app to verify your account.</p>
          <p style="font-size: 14px; margin-top: 30px;">If you didn't request this OTP, please ignore this email.</p>
          <p style="font-size: 14px;">We're excited to have you on board and can't wait for you to explore our wide range of cuisines!</p>
          <p style="font-size: 14px;">If you have any questions, feel free to contact our support team.</p>
        </div>
      </body>
    </html>
  `;
  await sendEmail(to, 'Your FoodDelivery OTP for Account Verification', htmlContent);
}

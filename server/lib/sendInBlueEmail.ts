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
    // console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function sendSignupConfirmationEmail(to: string, otp: string) {
  const htmlContent = `
    Your OTP for FoodKloud is ${otp}. This OTP is valid for 5 minutes.
    Please don't share this OTP with anyone.
  `;
  console.log(to)
  await sendEmail(to, 'Your FoodDelivery OTP for Account Verification', htmlContent);
}

import nodemailer from "nodemailer";

export const sendReceiptEmail = async (to: string, donorName: string, amount: number, currency: string, campaignId: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // use true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // The HTML email acts as an official e-receipt, which is highly responsive and standard practice
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0F4C81; padding: 20px; color: white; text-align: center;">
          <h1 style="margin: 0;">AidIran.io</h1>
          <p style="margin: 5px 0 0; opacity: 0.8;">Official Donation Receipt</p>
        </div>
        <div style="padding: 30px; background-color: #FAFAFA;">
          <p>Dear <strong>${donorName}</strong>,</p>
          <p>Thank you for your generous contribution of <strong>${currency} ${amount}</strong> towards the <em>${campaignId}</em> relief campaign.</p>
          <p>Your support brings immediate and direct relief to families affected by the conflict. By standing with us, you are making a profound difference on the ground.</p>
          <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 20px 0;" />
          <h3 style="color: #2E8B57; margin-bottom: 10px;">Transaction Details</h3>
          <p style="margin: 5px 0; color: #666;">Date: ${new Date().toLocaleDateString()}</p>
          <p style="margin: 5px 0; color: #666;">Amount: ${currency} ${amount}</p>
          <p style="margin: 5px 0; color: #666;">Status: Verified & Processed</p>
        </div>
        <div style="background-color: #F3F4F6; padding: 15px; text-align: center; font-size: 12px; color: #9CA3AF;">
          &copy; ${new Date().getFullYear()} AidIran.io. This email acts as your official e-receipt for tax purposes where applicable.
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: '"AidIran.io Relief" <info@aidiran.io>', 
      to, 
      subject: `Thank you for your donation of ${currency} ${amount} - Official Receipt`, 
      html: htmlContent, 
    });

    console.log("Receipt sent successfully: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Nodemailer Receipt System Error:", error);
    return false;
  }
};

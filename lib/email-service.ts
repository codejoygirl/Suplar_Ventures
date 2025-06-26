'use client';

export interface EmailData {
  to: string;
  subject: string;
  message: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  productName?: string;
  orderNumber?: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // In a real application, this would call your backend API
    // For now, we'll simulate the email sending
    
    const emailBody = `
      Subject: ${data.subject}
      
      From: ${data.name || 'Anonymous'} (${data.email || 'No email provided'})
      ${data.phone ? `Phone: ${data.phone}` : ''}
      ${data.company ? `Company: ${data.company}` : ''}
      ${data.productName ? `Product: ${data.productName}` : ''}
      ${data.orderNumber ? `Order: ${data.orderNumber}` : ''}
      
      Message:
      ${data.message}
    `;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Email would be sent to:', data.to);
    console.log('Email content:', emailBody);
    
    // In production, replace this with actual email service call
    // Example: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(data) })
    
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};
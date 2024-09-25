import { WebClient } from '@slack/web-api';
import { IOrder } from '@/types/Order';

// Initialize the Slack WebClient with your bot token
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

export async function notifyOrderPlaced(order: IOrder & { user: { email?: string | null | undefined }} ) {
  try {
    const channel = process.env.SLACK_CHANNEL_ID;
    
    if (!channel) {
      console.error('Slack channel ID is not set in environment variables');
      return;
    }

    const message = {
      text: `🍔 New Order Recieved! 🎉`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎉 New Order Recieved! 🍽️',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Order #${order.id.slice(-6)}*`
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*👤* ${order.user.name}`
            },
            {
              type: 'mrkdwn',
              text: `*📞* ${order.user.phone}`
            },
            {
              type: 'mrkdwn',
              text: `*💰Total Amount: ₹${order.totalAmount.toFixed(2)} * `
            },
            {
              type: 'mrkdwn',
              text: `*🏠 Restaurant:* ${order.restaurant.name}`
            },
            {
              type: 'mrkdwn',
              text: `*📍Address:* ${order.deliveryAddress}`
            },
            {
              type: 'mrkdwn',
              text: `*💳 Payment:* ${order.paymentMethod}`
            }
          ]
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*🍽️ Order Items:*'
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: order.items.map(item => `• ${item.quantity}x ${item.menuItem.name}`).join('\n')
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Order placed at ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    };

    await slackClient.chat.postMessage({
      channel: channel,
      ...message
    });

    console.log('Order notification sent to Slack successfully');
  } catch (error) {
    console.error('Error sending order notification to Slack:', error);
  }
}

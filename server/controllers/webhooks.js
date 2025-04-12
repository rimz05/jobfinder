import { Webhook } from "svix";
import User from "../modals/User.js";

// API controller function to manage Clerk user with distance
export const clerkWebhooks = async (req, res) => {
    try {
        // Create a svix instance with Clerk webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verifying Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Verify the webhook signature
        await webhook.verify(JSON.stringify(req.body), headers);

        // Getting data and event type from request body
        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address || '',
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url || '',
                    resume: ''
                };
                await User.create(userData);
                return res.status(200).json({ success: true });
            }

            case 'user.updated': {
                const updatedData = {
                    email: data.email_addresses[0]?.email_address || '',
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url || ''
                };
                await User.findByIdAndUpdate(data.id, updatedData);
                return res.status(200).json({ success: true });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ success: true });
            }

            default:
                return res.status(400).json({ success: false, message: 'Unhandled event type' });
        }

    } catch (error) {
        console.error('Webhook error:', error.message);
        return res.status(500).json({ success: false, message: 'Webhook processing failed' });
    }
};

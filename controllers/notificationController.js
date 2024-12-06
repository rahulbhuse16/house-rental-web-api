import Notification from "../models/Notification.js";

// Get all notifications (read and unread)
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteNotification = async (req, res) => {
    const { id } = req.params;
  
    try {
      const notification = await Notification.findByPk(id);
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      await notification.destroy();
      res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
import multer from 'multer';
var upload = multer({ dest: 'uploads/' });

import me_controller from './controllers/me';
import candidates_controller from './controllers/me/candidates';
import users_controller from './controllers/users';
import notification_controller from './controllers/me/notification';
import cooker_events_controller from './controllers/cooker/events';
import push_notification_controller from './controllers/me/push_notification';
import upload_controller from './controllers/me/upload';

export default {
  run: (app)=>{
    // users
    app.get("/api/users", users_controller.index);
    app.post("/api/users", users_controller.create);

    // login user
    app.get("/api/me", me_controller.show);
    app.put("/api/me", me_controller.update);
    app.delete("/api/me", me_controller.delete);

    app.get("/api/me/notifications", notification_controller.index);
    app.get("/api/me/candidates", candidates_controller.index);
    app.get("/api/users", users_controller.index);
    app.post("/api/users", users_controller.create);

    // Push Notification
    app.post("/api/me/push/sendto", push_notification_controller.sendto);

    // image upload
    app.post("/api/upload", upload.single('image'), upload_controller.create);

    app.post("/api/cooker/events", cooker_events_controller.create);
  }
};

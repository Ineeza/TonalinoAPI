import me_controller from './controllers/me';
import candidates_controller from './controllers/me/candidates';
import users_controller from './controllers/users';
import push_notification_controller from './controllers/me/push_notification';

export default {
  run: (app)=>{
    app.get("/api/me", me_controller.show);
    app.put("/api/me", me_controller.update);
    app.delete("/api/me", me_controller.delete);

    // Push Notification
    app.post("/api/me/push/sendto", push_notification_controller.sendto);

    app.get("/api/me/candidates", candidates_controller.index);
    app.get("/api/users", users_controller.index);
    app.post("/api/users", users_controller.create);
  }
};

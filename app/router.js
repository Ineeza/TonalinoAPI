import me_controller from './controllers/me';
import candidates_controller from './controllers/me/candidates';
import users_controller from './controllers/users';
import notification_controller from './controllers/me/notification';

export default {
  run: (app)=>{
    app.get("/api/me", me_controller.show);
    app.put("/api/me", me_controller.update);
    app.delete("/api/me", me_controller.delete);

    // TODO Push
    app.get("/api/me/notification/dummy", notification_controller.create2);
    app.put("/api/me/notification", notification_controller.create);

    app.get("/api/me/candidates", candidates_controller.index);
    app.get("/api/users", users_controller.index);
    app.post("/api/users", users_controller.create);
  }
};

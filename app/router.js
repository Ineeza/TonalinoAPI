import me_controller from './controllers/me';
import candidates_controller from './controllers/me/candidates';
import users_controller from './controllers/users';

export default {
  run: (app)=>{
    app.get("/api/me", me_controller.show);
    app.put("/api/me", me_controller.update);
    app.delete("/api/me", me_controller.delete);
    app.get("/api/me/candidates", candidates_controller.index);
    app.post("/api/users", users_controller.create);
  }
};

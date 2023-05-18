import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "launchacademy@gmail.com",
        password: "12345",
      },
      {
        email: "jmea@email.com",
        password: "12345",
      },
    ];

    for (const singleUser of userData) {
      const currentUser = await User.query().findOne({ email: singleUser.email });
      if (!currentUser) {
        await User.query().insert(singleUser);
      }
    }
  }
}

export default UserSeeder;

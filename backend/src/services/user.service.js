const prisma = require('../config/database');

class UserService {
  async getByFirebaseUid(firebaseUid) {
    return await prisma.user.findUnique({
      where: { firebaseUid },
    });
  }

  async getById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async createFromFirebaseToken(decodedToken) {
    const { uid, email, name, picture } = decodedToken;
    
    return await prisma.user.create({
      data: {
        firebaseUid: uid,
        email: email || null,
        displayName: name || null,
        photoUrl: picture || null,
      },
    });
  }

  // Create from Firebase Admin user record (register flow)
  async createFromAdminRecord(userRecord, extras = {}) {
    const { uid, email, displayName, photoURL, phoneNumber } = userRecord;
    const { username = null, phone = null } = extras;
    return await prisma.user.create({
      data: {
        firebaseUid: uid,
        email: email || null,
        displayName: displayName || null,
        username: username || userRecord.customClaims?.username || null,
        phone: phone || phoneNumber || null,
        photoUrl: photoURL || null,
      }
    });
  }

  async getOrCreateUser(decodedToken) {
    let user = await this.getByFirebaseUid(decodedToken.uid);
    
    if (!user) {
      user = await this.createFromFirebaseToken(decodedToken);
    }
    
    return user;
  }

  async updateUser(id, updateData) {
    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
}

module.exports = new UserService();

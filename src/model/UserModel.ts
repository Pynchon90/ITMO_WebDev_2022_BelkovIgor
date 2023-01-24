class UserModel {
  get isAuthenticated(): boolean {
    return !!localStorage.getItem('user-id');
  }
}

export default UserModel;

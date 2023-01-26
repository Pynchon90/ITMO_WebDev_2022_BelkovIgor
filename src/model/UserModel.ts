export interface IUserData {
  name: string;
  id: string;
}

type ObserverListener = () => void;

export interface IObserver {
  addListener(listener: ObserverListener): void;
  removeListener(listener: ObserverListener): void;
  notifyListeners(): void;
}

export interface IUserModel {
  cleanUserData(): Promise<void>;
  get userName(): string | null;
  get userData(): IUserData | null;
  get isAuthenticated(): boolean;
  get observerUserData(): IObserver;
  setupUserData(userData: any): void;
}

const LOCAL_KEY__USER_DATA = 'user-data';

class Observer implements IObserver {
  private readonly _listeners: Array<ObserverListener> = [];

  addListener(listener: ObserverListener): void {
    this._listeners.push(listener);
  }

  removeListener(listener: ObserverListener): void {
    const indexOfListener = this._listeners.indexOf(listener);
    if (indexOfListener > -1) {
      this._listeners.splice(indexOfListener, 1);
    }
  }

  notifyListeners() {
    this._listeners.forEach((l) => l());
  }
}

class UserModel implements IUserModel {

  static _instance: IUserModel = new UserModel();
  static getInstance(): IUserModel { return UserModel._instance; }

  private _userData?: IUserData | null;
  private _observerUserData: Observer = new Observer();

  constructor() {
    if (UserModel._instance) throw new Error('This is singleton');
    if (this.isAuthenticated) {
      this._userData = JSON.parse(localStorage.getItem(LOCAL_KEY__USER_DATA)!) as IUserData;
    }
  }
  get observerUserData(): IObserver {
    return this._observerUserData;
  }

  async cleanUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        localStorage.removeItem(LOCAL_KEY__USER_DATA);
        this._userData = null;
        this._observerUserData.notifyListeners();
        resolve();
      } else reject(new Error('Logout  strange error : |'));
    })
  }

  setupUserData(userData: IUserData): void {
    this._userData = userData as IUserData;
    localStorage.setItem(LOCAL_KEY__USER_DATA, JSON.stringify(userData));
    this._observerUserData.notifyListeners();
  }

  get userName(): string | null {
    return this._userData?.name || null;
  }

  get userData(): IUserData | null {
    return this._userData || null;
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem(LOCAL_KEY__USER_DATA);
  }
}

const userModel = UserModel.getInstance();

export default userModel;
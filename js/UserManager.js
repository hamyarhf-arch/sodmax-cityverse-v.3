export class UserManager {
    constructor() {
        this.currentUser = null;
        this.usersKey = 'sodmax_users';
        this.currentUserKey = 'sodmax_current_user';
        this.transactionsKey = 'sodmax_transactions';
        this.notificationsKey = 'sodmax_notifications';
        this.referralsKey = 'sodmax_referrals';
        
        this.initializeData();
    }
    
    // ... بقیه کدهای UserManager از فایل اصلی
    // (همین کلاس رو با کمی اصلاح export می‌کنیم)
}

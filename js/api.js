import { supabase } from './config.js';

export class SODmAXAPI {
    constructor() {
        this.supabase = supabase;
    }
    
    // کاربران
    async registerUser(userData) {
        const { data, error } = await this.supabase
            .from('users')
            .insert([userData])
            .select();
            
        return { data, error };
    }
    
    async loginUser(phone, password) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('phone', phone)
            .eq('password', password)
            .single();
            
        return { data, error };
    }
    
    async updateUser(userId, updates) {
        const { data, error } = await this.supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select();
            
        return { data, error };
    }
    
    // تراکنش‌ها
    async addTransaction(transaction) {
        const { data, error } = await this.supabase
            .from('transactions')
            .insert([transaction])
            .select();
            
        return { data, error };
    }
    
    async getUserTransactions(userId) {
        const { data, error } = await this.supabase
            .from('transactions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
            
        return { data, error };
    }
    
    // کمپین‌های تبلیغاتی
    async getActiveCampaigns() {
        const { data, error } = await this.supabase
            .from('campaigns')
            .select('*')
            .eq('status', 'active')
            .order('created_at', { ascending: false });
            
        return { data, error };
    }
    
    async joinCampaign(userId, campaignId) {
        const { data, error } = await this.supabase
            .from('user_campaigns')
            .insert([{
                user_id: userId,
                campaign_id: campaignId,
                status: 'joined'
            }])
            .select();
            
        return { data, error };
    }
    
    // سیستم اقتصادی
    async updateUserBalance(userId, currency, amount) {
        const { data, error } = await this.supabase
            .rpc('update_user_balance', {
                p_user_id: userId,
                p_currency: currency,
                p_amount: amount
            });
            
        return { data, error };
    }
    
    // نوتیفیکیشن‌ها
    async sendNotification(userId, title, message) {
        const { data, error } = await this.supabase
            .from('notifications')
            .insert([{
                user_id: userId,
                title,
                message,
                read: false
            }])
            .select();
            
        return { data, error };
    }
}
